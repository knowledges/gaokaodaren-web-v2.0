/**
 * Created by qbl on 2015/10/21.
 */
angular.module('gaokaoAPP.temp.marjor',[])
.factory('homeService', function () {
    return {
        htmlPage: ""
    }
})
.config(function($stateProvider,$urlRouterProvider){
    $stateProvider
        /////////////////
        ///   school  ///
        /////////////////
        .state('marjor',{
            abstract: true,
            url:"/marjor",
            templateUrl:"html/temp/tempMarjor.html",
            data: { isPublic: true},
            controller:"marjorCtl"
        })
        ///////////////////////
        ///  school > nav  ///
        ////////////////////
        .state('marjor.nav',{
            url:"/",
            templateUrl:"html/nav/nav.html",
            data: { isPublic: true},
            controller:"marjorNav"
        })
        ///////////////////////
        ///  school > list  ///
        ///////////////////////
        .state('marjor.list',{
            url:"/{type:[0-9]{1,4}}",
            templateUrl:"html/marjor/marjor.html",
            data: { isPublic: true},
            controller:"marjorConCtl"
        })
})
.controller('marjorCtl',['$scope','$sce','homeService',function($scope,$sce,homeService){
        $scope.ishide = true;
        $scope.service = homeService;
        $scope.insertHTML = "";
        $scope.$watch('service',function(newValue){
            if(newValue.htmlPage!=""){
                $scope.ishide = false;
                $scope.insertHTML = $sce.trustAsHtml(newValue.htmlPage);
            }
        },true);
}])
