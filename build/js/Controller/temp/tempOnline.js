/**
 * Created by qbl on 2015/10/23.
 */
angular.module("gaokaoAPP.temp.online",[])
.factory('onlineService',['$scope','navURL_9',function($scope,navURL_9){
        var response = function(url){
            var dtd = $q.defer();
            $http.get(url).then(function (response) {
                dtd.resolve(response);
            }, function (response) {
                dtd.resolve(response);
            });
            return dtd.promise;
        }
        return {
            getNav:function(){
                debugger;
                return response(navURL_9);
            }
        }
}])
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
.controller('onlineCtr',['$scope','$sce','htmlService',function($scope,$sce,htmlService){
        $scope.ishide = true;
        $scope.service = htmlService;
        $scope.insertHTML = "";
        $scope.$watch('service',function(newValue,oldValue){
            if(newValue.htmlPage!=""){
                $scope.ishide = false;
                $scope.insertHTML = $sce.trustAsHtml(newValue.htmlPage);
            }
        },true);
}])