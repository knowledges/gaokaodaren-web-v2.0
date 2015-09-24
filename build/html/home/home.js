/**
 * Created by qbl on 2015/9/22.
 */
'use strict';

angular.module("gaokaoAPP.home",['ngRoute'])
.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/home',{
        templateUrl:"html/home/home.html",
        controller:"homeCtr"
    });
}])
.controller("homeCtr",[function() {

}]);