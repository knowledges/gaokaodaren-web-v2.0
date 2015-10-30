/**
 * Created by qbl on 2015/10/21.
 */
angular.module("gaokaoAPP.temp.school",[])
.config(function($stateProvider,$urlRouterProvider){
    $stateProvider
        /////////////////
        ///   school  ///
        /////////////////
        .state('school',{
            url:"/school",
            templateUrl:"html/temp/tempSchool.html",
            data: { isPublic: true },
        })
        ///////////////////////
        ///  school > nav  ///
        ////////////////////
        .state('school.nav',{
            url:"/",
            templateUrl:"html/nav/nav.html",
            data: { isPublic: true },
            controller:"schoolNav"
        })
        ///////////////////////
        ///  school > list  ///
        ///////////////////////
        .state('school.list',{
            url:"/{type:[0-9]{1,4}}",
            templateUrl:"html/school/school.html",
            data: { isPublic: true },
        })
});