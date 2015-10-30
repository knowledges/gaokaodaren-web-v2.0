/**
 * Created by qbl on 2015/10/23.
 */
angular.module("gaokaoAPP.temp.score",[])
    .config(function($stateProvider,$urlRouterProvider){
        $stateProvider
            /////////////////
            ///   score  ////
            /////////////////
            .state('score',{
                url:"/score",
                templateUrl:"html/temp/tempScore.html",
                data: { isPublic: true },
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
    });