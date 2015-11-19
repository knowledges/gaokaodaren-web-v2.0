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
.controller('schlCtl',['$scope','$sce','htmlService',function($scope,$sce,htmlService){
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