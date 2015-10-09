/**
 * Created by qbl on 2015/9/24.
 */
'use strict';

angular.module("gaokaoAPP.login",['ui.router','gaokaoAPP.login.childApp'])
.config(function($stateProvider,$urlRouterProvider){
        $urlRouterProvider.when("login","/login");
        $stateProvider
            .state("login",{
                url:"/login",
                templateUrl:"html/login/login.html",
                controller:"signInCtr"
            })
})
.controller("signInCtr",function(){})
