/**
 * Created by qbl on 2015/10/27.
 */
'use strict';
require(['app'],function(app){
    app.config(function($stateProvider, $urlRouterProvider){
        $urlRouterProvider.when("/all", "/score");
        $stateProvider
            .state('all.score',{
                url:'/score',
                templateUrl:'html/myInfo/myScore.html',
                controllerUrl:"html/myInfo/myScore",
                controller:"myScore",
                data: { isPublic: false},
            })
            .state('all', {
                url: '/all',
                templateUrl:'html/temp/tempAll.html',
                data: { isPublic: false},
                controller:"allCtr"
            })
            .state('all.will',{
                url:'/will',
                templateUrl:'html/All/all.html',
                controllerUrl:"html/All/all",
                controller:"willCtr",
                data: { isPublic: false}
            })
            .state('all.reference',{
                url:'/reference',
                templateUrl:'html/All/all.html',
                controllerUrl:"html/All/all",
                controller:"referenceCtr",
                data: { isPublic: false}
            })
    })
    app.controller('allCtr',['$window',function($window){

            if(sessionStorage.getItem('usernumber') == null || sessionStorage.getItem('usernumber') == "" || sessionStorage.getItem('usernumber').length<= 0){
                $window.location.href="#/login";
                return;
            }

        }]);
});