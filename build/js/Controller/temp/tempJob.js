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
                templateUrl:"html/temp/tempJob.html"
            })
            ///////////////////////
            ///  job > nav  ///
            ////////////////////
            .state('job.nav',{
                url:"/",
                templateUrl:"html/nav/nav.html",
                controller:"jobNav"
            })
            ///////////////////////
            ///  job > list  ///
            ///////////////////////
            .state('job.list',{
                url:'/itemId=:itemId&param=:param',
                templateUrl:'html/recipe/recipe.html',
                controller:"recipeInfoCtr"
            })
    });