/**
 * Created by qbl on 2015/10/19.
 */
angular.module("gaokaoAPP.temp.city",['ui.router'])
.config(function($stateProvider, $urlRouterProvider){
        $stateProvider
            ///////////////
            ///  city  ///
            /////////////
            .state('city', {
                url: '/city',
                templateUrl:'html/temp/tempCity.html',
                data: { isPublic: true},
                controller:"tempCtr"
            })
            ///////////////////
            ///  city > nav ///
            //////////////////
            .state('city.nav',{
                url:'/',
                templateUrl:'html/nav/nav.html',
                data: { isPublic: true},
                controller:"cityNav"
            })
            //////////////////
            //  city > item //
            //////////////////
            .state('city.list',{
                url:'/{cityId:[0-9]{0,4}}',
                templateUrl:'html/city/city.html',
                data: { isPublic: true},
            })
})
.controller("tempCtr",['$scope','$sce','homeService',function($scope,$sce,homeService){
        $scope.ishide = true;
        $scope.service = homeService;
        $scope.insertHTML = "";
        $scope.$watch('service',function(newValue){
            if(newValue.htmlPage!=""){
                $scope.ishide = false;
                $scope.insertHTML = $sce.trustAsHtml(newValue.htmlPage);
            }
        },true);
}]);