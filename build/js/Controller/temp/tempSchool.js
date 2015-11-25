/**
 * Created by qbl on 2015/10/21.
 */
angular.module("gaokaoAPP.temp.school",[])
    .factory('homeService', function () {
        return {
            htmlPage: ""
        }
    })
.config(function($stateProvider,$urlRouterProvider){
    $stateProvider
        /////////////////
        ///   school  ///
        /////////////////
        .state('school',{
            url:"/school",
            templateUrl:"html/temp/tempSchool.html",
            data: { isPublic: true },
            controller:"schlCtl"
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
})
.controller('schlCtl',['$scope','$sce','homeService',function($scope,$sce,homeService){
        $scope.ishide = true;
        $scope.service = homeService;
        $scope.insertHTML = "";
        $scope.$watch('service',function(newValue){
            console.log('jinlaile');
            if(newValue.htmlPage!="" && newValue.htmlPage!=undefined){
                $scope.ishide = false;
                $scope.insertHTML = $sce.trustAsHtml(newValue.htmlPage);
            }
        },true);
}])