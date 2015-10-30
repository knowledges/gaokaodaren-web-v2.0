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
    });