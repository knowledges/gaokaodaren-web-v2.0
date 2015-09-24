/**
 * Created by qbl on 2015/9/22.
 */
'use strict';

angular.module("gaokaoAPP.hope",['ngRoute'])
.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/hope', {
        templateUrl: "html/hope/hope.html",
        controller: "hopeCtr"
    });
}])
.controller("hopeCtr", [function () {

}]);
