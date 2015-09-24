/**
 * Created by qbl on 2015/9/24.
 */
angular.module("gaokaoAPP.login",['ngRoute'])
.config(['$routeProvider',function($routeProvider){
    $routeProvider.when('/login',{
        templateUrl:"html/login/login.html",
        controller:'loginCtr'
    })
}])
.controller("loginCtr",[function(){}]);