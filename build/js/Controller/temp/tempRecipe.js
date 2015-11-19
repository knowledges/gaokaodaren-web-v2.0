/**
 * Created by qbl on 2015/10/22.
 */
angular.module("gaokaoAPP.temp.recipe",[])
.config(function($stateProvider,$urlRouterProvider){
        $stateProvider
            .state('recipe',{
                url:'/recipe',
                templateUrl:'html/temp/tempRecipe.html',
                data: { isPublic: true },
                controller:"reciptCtl"
            })
            .state('recipe.nav',{
                url:'/',
                templateUrl:'html/nav/nav.html',
                data: { isPublic: true },
                controller:'recipeCtr'
            })
            .state('recipe.list',{
                url:'/itemId=:itemId&param=:param',
                templateUrl:'html/recipe/recipe.html',
                data: { isPublic: true },
                controller:"recipeInfoCtr"
            })
    })
.controller('reciptCtl',['$scope','$sce','htmlService',function($scope,$sce,htmlService){
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