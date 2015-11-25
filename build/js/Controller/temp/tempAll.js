/**
 * Created by qbl on 2015/10/27.
 */
angular.module("gaokaoAPP.temp.all",['ui.router'])
    .config(function($stateProvider, $urlRouterProvider){
        $urlRouterProvider
            .when("/all", "/all/all.score");
        $stateProvider
            .state('all.score',{
                url:'/all.score',
                templateUrl:'html/myInfo/myScore.html',
                data: { isPublic: false},
                controller:"scroeCtr"
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
                data: { isPublic: false},
                controller:"willCtr"
            })
            .state('all.reference',{
                url:'/reference',
                templateUrl:'html/All/all.html',
                data: { isPublic: false},
                controller:"referenceCtr"
            })
    })
    .controller('allCtr',['$window',function($window){

        if(sessionStorage.getItem('usernumber') == null || sessionStorage.getItem('usernumber') == "" || sessionStorage.getItem('usernumber').length<= 0){
            $window.location.href="#/login";
            return;
        }

    }]);