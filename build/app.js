/**
 * Created by qbl on 2015/9/22.
 */
'use strict';

angular.module("gaokaoAPP",[
    'ngRoute',
    'gaokaoAPP.home',
    'gaokaoAPP.hope',
    'gaokaoAPP.about',
    'gaokaoAPP.login'
    //'gaokaoAPP.required',
    //'gaokaoAPP.analyse',
    //'gaokaoAPP.policy',
    //'gaokaoAPP.city',
    //'gaokaoAPP.school',
    //'gaokaoAPP.major',
    //'gaokaoAPP.graduated',
    //'gaokaoAPP.Personality',
    //'gaokaoAPP.consult',
    //'gaokaoAPP.about'
]).
config(['$routeProvider', function ($routeProvider) {
        $routeProvider.otherwise({redirectTo:"/home"})
}]).controller("appCtr",['$scope',function($scope){
        $scope.user = {
            name:"",
            password:"",
            mobile:""
        }
        var userInfo =localStorage.getItem("userInfo");
        if(userInfo =="" || userInfo == null){
            console.log("¿ÕÊý¾Ý");
        }else{
            var obj = JSON.parse(localStorage.getItem("userInfo"));
            $scope.user.name;
            $scope.user.password;
            $scope.user.mobile;
        }

}]);
