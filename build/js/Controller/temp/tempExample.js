/**
 * Created by qbl on 2015/11/2.
 */
angular.module('gaokaoAPP.temp.example',[])
.config(function($stateProvider,$urlRouterProvider){
        $stateProvider
            .state('example',{
                url:'/example',
                templateUrl:"html/temp/tempExample.html",
                data: { isPublic: true },
            })
            .state('example.nav',{
                url:"/",
                templateUrl:"html/nav/nav.html",
                data: { isPublic: true },
                controller:"exampleNav",
            })
            .state("example.list",{
                url:'/itemId=:itemId&param=:param',
                templateUrl:'html/recipe/recipe.html',
                data: { isPublic: true },
                controller:"recipeInfoCtr"
            })


    });