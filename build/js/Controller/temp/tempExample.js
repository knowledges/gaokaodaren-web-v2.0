/**
 * Created by qbl on 2015/11/2.
 */
angular.module('gaokaoAPP.temp.example',[])
.config(function($stateProvider,$urlRouterProvider){
        $stateProvider
            .state('example',{
                url:'/example',
                templateUrl:"html/temp/tempExample.html",
                data: { isPublic: true},
                controller:"exampleAllCtl"
            })
            .state('example.nav',{
                url:"/",
                templateUrl:"html/nav/nav.html",
                data: { isPublic: true},
                controller:"exampleNav",
            })
            .state("example.list",{
                url:'/itemId=:itemId&param=:param',
                templateUrl:'html/recipe/recipe.html',
                data: { isPublic: true},
                controller:"recipeInfoCtr"
            })
})
.controller('exampleAllCtl',['$scope','$sce','homeService',function($scope,$sce,homeService){
        $scope.ishide = true;
        $scope.service = homeService;
        $scope.insertHTML = "";
        $scope.$watch('service',function(newValue){
            if(newValue.htmlPage!=""){
                $rootScope.ishide = false;
                $scope.insertHTML = $sce.trustAsHtml(newValue.htmlPage);
            }
        },true);
}])