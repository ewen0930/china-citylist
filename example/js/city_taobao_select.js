/**
 * @fileOverview jquery 二级选单插件
 * @author ewen
 * @example
 *  <form action="" id="dealerSelect">
 *  <select name="province"></select>
 *  <select name="city"></select>
 *  </form>
 *  script:
 *     ewen.CitySelect.init("#dealerSelect","province","city");
 *  or
 *     ewen.CitySelect.init("#dealerSelect");
 */
;
var ewenx = ewenx || {};

ewenx.CitySelect = function () {

    var my = {"version": '1.0.0'};

    /**
     * @description 初始化表单
     * @param {Num} domID 表单ID
     * @param {Num} provinceName 省级选单名称
     * @param {Num} cityName 市级选单名称
     * @param {Num} countName 地区级选单名称
     */
    var lang = (navigator.appName == "Netscape") ? navigator.language : navigator.userLanguage;

    my.lang = lang == 'zh-TW' ? 1 : 0;
    my.init = function (domID, provinceName, cityName, countyName) {

        var __province = provinceName || 'province';
        var __city = cityName || 'city';
        var __county = countyName || 'county';

        my.province = $(domID).find("select[name='" + __province + "']");
        my.city = $(domID).find("select[name='" + __city + "']");
        my.county = $(domID).find("select[name='" + __county + "']");

        my.province.empty();

        for (var i = 0, len = city_provinces_data.length; i < len; i++) {
            //my.province.append("<option value='" + cityArray[i][0] + "'>" + cityArray[i][0] + "</option>");
            my.province.append(new Option(city_provinces_data[i][1][my.lang], city_provinces_data[i][0]));
        }
        my.getCity(city_provinces_data[0][0]);

        my.province.change(function () {
            my.getCity(my.province.val());
        })
        my.city.change(function () {
            my.getCounty(my.city.val());
        })
    };

    my.getCity = function (curProvince) {
        //清空 城市 下拉选单
        my.city.empty();

        var i, j;
        for (i = 0; i < city_cn_data.length; i++) {
            //得到 当前省 在 城市数组中的位置
            if (city_cn_data[i][2] == curProvince) {
                my.city.append(new Option(city_cn_data[i][1][my.lang], city_cn_data[i][0]));
            }
        }
        my.getCounty(my.city.val());
    };

    my.getCounty = function (curCity) {
        //清空 城市 下拉选单
        my.county.empty();

        var i, j;
        for (i = 0; i < city_cn_data.length; i++) {
            if (city_cn_data[i][2] == curCity) {
                my.county.append(new Option(city_cn_data[i][1][my.lang], city_cn_data[i][0]));
            }
        }
    };
    return my;
}
;
