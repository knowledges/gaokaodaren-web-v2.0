/**
 * Created by qbl on 2015/10/23.
 */
angular.module("gaokaoAPP.temp.online",[])
.config(function($stateProvider,$urlRouterProvider){
    $stateProvider
        /////////////////
        ///   online  ///
        /////////////////
        .state('online',{
            url:"/online",
            templateUrl:"html/temp/tempOnline.html",
            data: { isPublic: true },
        })
        /////////////////////
        ///  online > nav ///
        /////////////////////
        .state('online.nav',{
            url:"/",
            templateUrl:"html/nav/nav.html",
            data: { isPublic: true },
            controller:"onlineNav"
        })
        ///////////////////////
        ///  online > list  ///
        ///////////////////////
        .state('online.list',{
            url:'/itemId=:itemId&param=:param',
            templateUrl:'html/showInfo/showInfo.html',
            data: { isPublic: true },
            controller:"onlineInfoCtr"
        })
});