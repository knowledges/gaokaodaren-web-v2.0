/**
 * Created by qbl on 2015/10/23.
 */
angular.module("gaokaoAPP.temp.score",[])
    .factory('homeService', function () {
        return {
            htmlPage: ""
        }
    })
    .config(function($stateProvider,$urlRouterProvider){
        $stateProvider
            /////////////////
            ///   score  ////
            /////////////////
            .state('score',{
                url:"/score",
                templateUrl:"html/temp/tempScore.html",
                data: { isPublic: true },
                controller:"scoreCtl"
            })
            ///////////////////////
            ///  score > nav  ///
            ////////////////////
            .state('score.nav',{
                url:"/",
                templateUrl:"html/nav/nav.html",
                data: { isPublic: true },
                controller:"scoreNav"
            })
            ///////////////////////
            ///  score > list  ///
            ///////////////////////
            .state('score.list',{
                url:'/itemId=:itemId&param=:param',
                templateUrl:'html/recipe/recipe.html',
                data: { isPublic: true },
                controller:"recipeInfoCtr"
            })
    })
.controller("scoreCtl",['$scope','$sce','homeService',function($scope,$sce,homeService){
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