/**
 * Created by qbl on 2015/10/23.
 */
angular.module("gaokaoAPP.temp.job",[])
    .config(function($stateProvider,$urlRouterProvider){
        $stateProvider
            /////////////////
            ///   job  ////
            /////////////////
            .state('job',{
                url:"/job",
                templateUrl:"html/temp/tempJob.html",
                data: { isPublic: true},
                controller:"jobCtr"
            })
            ///////////////////////
            ///  job > nav  ///
            ////////////////////
            .state('job.nav',{
                url:"/",
                templateUrl:"html/nav/nav.html",
                data: { isPublic: true},
                controller:"jobNav",
            })
            ///////////////////////
            ///  job > list  ///
            ///////////////////////
            .state('job.list',{
                url:'/itemId=:itemId&param=:param',
                templateUrl:'html/recipe/recipe.html',
                data: { isPublic: true},
                controller:"recipeInfoCtr"
            })
    })
.controller('jobCtr',['$scope','$sce','htmlService',function($scope,$sce,htmlService){
        $scope.ishide = true;
        $scope.service = htmlService;
        $scope.insertHTML = "";
        $scope.$watch('service',function(newValue,oldValue){
            if(newValue.htmlPage!=""){
                $scope.ishide = false;
                $scope.insertHTML = $sce.trustAsHtml(newValue.htmlPage);
            }
        },true);
}]);