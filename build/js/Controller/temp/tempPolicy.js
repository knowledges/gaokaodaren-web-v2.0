/**
 * Created by qbl on 2015/10/23.
 */
angular.module("gaokaoAPP.temp.policy",[])
    .factory('homeService',function(){
        return {
            htmlPage:""
        }
    })
    .config(function($stateProvider,$urlRouterProvider){
        $stateProvider
            /////////////////
            ///   policy  ////
            /////////////////
            .state('policy',{
                url:"/policy",
                templateUrl:"html/temp/tempPolicy.html",
                data: { isPublic: true },
                controller:"policyCtr"
            })
            ///////////////////////
            ///  policy > nav  ///
            ////////////////////
            .state('policy.nav',{
                url:"/",
                templateUrl:"html/nav/nav.html",
                data: { isPublic: true },
                controller:"policyNav"
            })
            ///////////////////////
            ///  policy > list  ///
            ///////////////////////
            .state('policy.list',{
                url:'/itemId=:itemId&param=:param',
                templateUrl:'html/recipe/recipe.html',
                data: { isPublic: true },
                controller:"recipeInfoCtr"
            })
    })
.controller('policyCtr',['$scope','$sce','homeService',function($scope,$sce,homeService){
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