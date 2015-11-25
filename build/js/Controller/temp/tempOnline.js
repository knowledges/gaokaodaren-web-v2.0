/**
 * Created by qbl on 2015/10/23.
 */
angular.module("gaokaoAPP.temp.online",[])
.factory('homeService',function(){
    return {
        htmlPage:""
    }
})
.config(function($stateProvider,$urlRouterProvider){
        $stateProvider
        .state('online',{
            url:"/online",
            templateUrl:"html/temp/tempOnline.html",
            data: { isPublic: true},
            controller:"onlineCtr"
        })
        .state('online.nav',{
            url:"/",
            templateUrl:"html/nav/nav.html",
            data: { isPublic: true},
            controller:"onlineNav"
        })
        .state('online.list',{
            url:'/itemId=:itemId&param=:param',
            templateUrl:'html/showInfo/showInfo.html',
            data: { isPublic: true},
            controller:"onlineInfoCtr"
        })
})
.controller('onlineCtr',['$scope','$sce','homeService',function($scope,$sce,homeService){
        $scope.ishide = true;
        $scope.service = homeService;
        $scope.insertHTML = "";
        $scope.$watch('service',function(newValue,oldValue){
            if(newValue.htmlPage!=""){
                $scope.ishide = false;
                $scope.insertHTML = $sce.trustAsHtml(newValue.htmlPage);
            }
        },true);
}])