/**
 * Created by qbl on 2015/10/23.
 */
angular.module("gaokaoAPP.temp.unique",[])
    .config(function($stateProvider,$urlRouterProvider){
        $stateProvider
            /////////////////
            ///   unique  ////
            /////////////////
            .state('unique',{
                url:"/unique",
                templateUrl:"html/temp/tempUnique.html",
                data: { isPublic: true },
                controller:"uniqueCtr"
            })
            ///////////////////////
            ///  unique > nav  ///
            ////////////////////
            .state('unique.nav',{
                url:"/",
                templateUrl:"html/nav/nav.html",
                data: { isPublic: true },
                controller:"uniqueNav"
            })
            ///////////////////////
            ///  unique > list  ///
            ///////////////////////
            .state('unique.list',{
                url:'/itemId=:itemId&param=:param',
                templateUrl:'html/recipe/recipe.html',
                data: { isPublic: true },
                controller:"recipeInfoCtr"
            })
    })
    .controller('uniqueCtr',['$scope','$sce','htmlService',function($scope,$sce,htmlService){
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