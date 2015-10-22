/**
 * Created by qbl on 2015/10/21.
 */
angular.module('gaokaoAPP.temp.marjor',[])
.config(function($stateProvider,$urlRouterProvider){
    $stateProvider
        /////////////////
        ///   school  ///
        /////////////////
        .state('marjor',{
            abstract: true,
            url:"/marjor",
            templateUrl:"html/temp/tempMarjor.html",
        })
        ///////////////////////
        ///  school > nav  ///
        ////////////////////
        .state('marjor.nav',{
            url:"/",
            templateUrl:"html/nav/nav.html",
            controller:"marjorNav"
        })
        ///////////////////////
        ///  school > list  ///
        ///////////////////////
        .state('marjor.list',{
            url:"/{type:[0-9]{1,4}}",
            templateUrl:"html/marjor/marjor.html"
        })
        /////////////////////////
        /////  school > list > info ///
        /////////////////////////
        //.state('item',{
        //    url:"/marjor/item",
        //    templateUrl:"html/marjor/marjorInfo.html",
        //    controller:"marjorInfoCtr"
        //})
});
