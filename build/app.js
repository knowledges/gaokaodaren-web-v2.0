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
])
.constant("logoutURL","/logout")
.config(['$routeProvider' ,function ($routeProvider) {
        $routeProvider.otherwise({redirectTo:"/home"})
}])
.controller("appCtr",['$scope','$http','logoutURL',function($scope,$http,logoutURL){
        $scope.user = {
            islogin : false,
            name : "",
            pwd:"",
            mobile:""
        }
        var userInfo =JSON.parse(localStorage.getItem("userInfo"));
        if(userInfo =="" || userInfo == null){
            $scope.user.islogin = false;
            $scope.user.name = "";
        }else{
            $scope.user.name = userInfo.name;
            $scope.user.islogin = true;
        }

        $scope.logoff  = function(){

            $http({
                url:logoutURL,
                method:"GET",
                dataType: "json",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
                }
            }).success(function(data,status,headers,config){
                $scope.user.islogin = false;

            })
        }
}]);
