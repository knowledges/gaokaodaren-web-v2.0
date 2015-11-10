/**
 * Created by qbl on 2015/10/23.
 */
angular.module("gaokaoAPP.temp.policy",[])
    .config(function($stateProvider,$urlRouterProvider){
        $stateProvider
            /////////////////
            ///   policy  ////
            /////////////////
            .state('policy',{
                url:"/policy",
                templateUrl:"html/temp/tempPolicy.html",
                data: { isPublic: true }
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
    });