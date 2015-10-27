/**
 * Created by qbl on 2015/10/27.
 */
angular.module("gaokaoAPP.temp.all",['ui.router'])
    .config(function($stateProvider, $urlRouterProvider){
        $stateProvider
            ///////////////
            ///  city  ///
            /////////////
            .state('all', {
                url: '/all',
                templateUrl:'html/temp/tempAll.html'
            })
            ///////////////////
            ///  city > nav ///
            //////////////////
            .state('all.will',{
                url:'/will',
                templateUrl:'html/All/all.html',
                controller:"willCtr"
            })
            //////////////////
            //  city > item //
            //////////////////
            .state('all.reference',{
                url:'/reference',
                templateUrl:'html/All/all.html',
                controller:"referenceCtr"
            })
    });