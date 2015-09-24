/**
 * Created by qbl on 2015/9/23.
 */
'use strict';

angular.module("gaokaoAPP.about",['ngRoute'])
.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/about', {
        templateUrl: "html/about/about.html",
        controller: "aboutCtr"
    });
}])
.controller("aboutCtr", [function () {

}]);