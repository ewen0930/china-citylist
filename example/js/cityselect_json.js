/**
 * @fileOverview jquery 二级选单插件
 * @author ewen
 * @example
 *  <form action="" id="dealerSelect">
 *  <select name="province"></select>
 *  <select name="city"></select>
 *  <select name="county"></select>
 *  </form>
 *  script:
 *     ewen.CitySelect.init("#dealerSelect","province","city","county");
 *  or
 *     ewen.CitySelect.init("#dealerSelect");
 */
;
var ewenx = ewenx || {};
var __FILE__ = $("script").last().attr("src");
ewenx.CitySelect = function () {

	var my = {"version": '1.0.0'};
	my.cityData;

	/**
	 * @description 初始化表单
	 * @param {Num} domID 表单ID
	 * @param {Num} provinceName 省级选单名称
	 * @param {Num} cityName     市级选单名称
	 * @param {Num} countyName   地区选单名称
	 */
	my.init = function (domID, provinceName, cityName, countyName) {
		var __province = provinceName || 'province';
		var __city = cityName || 'city';
		var __county = countyName || 'county';

		my.province = $(domID).find("select[name='" + __province + "']");
		my.city = $(domID).find("select[name='" + __city + "']");
		my.county = $(domID).find("select[name='" + __county + "']");

		//console.log(__FILE__);
		var _jsPath = __FILE__.substr(0, __FILE__.lastIndexOf('/') + 1);
		$.getJSON(_jsPath + 'city_data.json', function (data) {
			my.cityData = data;
			my.getProvince();
		});
		my.province.change(function () {
			my.getCity();
		})
		my.city.change(function () {
			my.getCounty();
		})
	};

	my.getProvince = function () {
		//清空 城市 下拉选单
		my.province.empty();
		for (var i = 0, len = my.cityData.province.length; i < len; i++) {
			my.province.append(new Option(my.cityData.province[i].name, my.cityData.province[i].name));
		}
		my.getCity();
		return;
	};
	my.getCity = function () {
		//清空 城市 下拉选单
		my.city.empty();
		for (var i = 0, len = my.cityData.province.length; i < len; i++) {
			if (my.cityData.province[i].name == my.province.val()) {
				my.curCity = my.cityData.province[i].city;
				for (var j = 0, tlen = my.curCity.length; j < tlen; j++) {
					//填充 城市 下拉选单
					my.city.append(new Option(my.curCity[j].name, my.curCity[j].name));
				}
				my.getCounty();
				return;
			}
		}
	};
	my.getCounty = function () {
		my.county.empty();
		for (var j = 0, len = my.curCity.length; j < len; j++) {
			if (my.curCity[j].name == my.city.val()) {
				var tmpList = my.curCity[j].county;
				for (var l = 0, llen = tmpList.length; l < llen; l++) {
					my.county.append(new Option(tmpList[l].name, tmpList[l].name));
				}
				return;
			}
		}
	};

	return my;
};
