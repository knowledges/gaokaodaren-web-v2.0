/**
 * Created by qbl on 2015/9/24.
 */
'use strict';

angular.module("gaokaoAPP.login",['ui.router'])
.constant("isSigin","")
.constant("isShowLogin",true)
.constant("isShowRegistered",false)
.constant("isShowForget",false)
.constant("codeURL","/user/code?time="+new Date().getTime())
.constant("loginURL","/login?time="+new Date().getTime())
.constant("registerURL","/user/register")
.constant("referinURL","/user/reset")
.factory("regCode",['$http',
    function($http){
        var reqCode = function(path){
            return $http({
                url:path,
                method:"GET",
            })
        }
        return{
            getCode:function(path){
                return reqCode(path);
            }
        }
    }
])
.factory("loginStatus",['$http',
    function($http){
        var login = function(option,path){
            return $http({
                url:path,
                method:"POST",
                data: $.param({"j_username":option.name,"j_password":option.pwd,"code":option.code}),
                dataType: "JSON",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
                }
            })
        }
        return {
            signIn:function(option,path){
                return login(option,path);
            }
        }
    }
])
.config(function($stateProvider,$urlRouterProvider){
        $urlRouterProvider.when("login","/login");
        $stateProvider
            .state("login",{
                url:"/login",
                templateUrl:"html/login/login.html",
                controller:"logonCtr"
            })
})
.controller("logonCtr",["$scope","codeURL","regCode","loginURL","loginStatus","isSigin","isShowLogin","isShowRegistered","isShowForget",function($scope,codeURL,regCode,loginURL,loginStatus,isSigin,isShowLogin,isShowRegistered,isShowForget){
    $scope.user = {
        isShowLogin:isShowLogin,
        username:"14321111111113",
        password:"123456",
        mobile:"15952592727",
        pwd:"123456",
        code:"",
        img:"",
        isShowRegistered:isShowRegistered,
        isShowForget:isShowForget
    }

    getCodes();

    $scope.repeat = function(){
        getCodes();
    }

    $scope.signin = function(){
        debugger;
        var param = {};
            param.name = $scope.user.username;
            param.pwd = $scope.user.pwd;
            param.code = $scope.user.code;
        loginStatus.signIn(param,loginURL)
            .success(function(data,status){
                isSigin = name;
            });
    }

    $scope.showRegistered = function(){
        isShowLogin = false;
        isShowRegistered = true;
        isShowForget = false;

        $scope.user.isShowLogin = false;
        $scope.user.isShowRegistered = true;
        $scope.user.isShowForget = false;

        console.log(isShowRegistered);
    }

    $scope.forgetpwd = function(){
        //$scope.user.isShowForget = true;
        $scope.user.isShowLogin = false;
        //$scope.user.isShowRegistered = false;
    }

    function getCodes(){
        regCode.getCode(codeURL)
            .success(function(data,status){
                $scope.user.img = data;
            });
    }


}])
.controller("registerCtr",["$scope","isShowForget","isShowLogin","isShowRegistered",function($scope,isShowForget,isShowLogin,isShowRegistered){
        $scope.user = {
            isShowRegistered:isShowRegistered,
            username:"14321111111113",
            password:"123456",
            newPassword:"123456",
            mobile:"15952592727",
            code:"",
            img:""
        }
        console.log(isShowRegistered);

}])
.controller("forgetCtr",["$scope",function($scope){}])
