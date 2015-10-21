/**
 * Created by qbl on 2015/10/9.
 */
'use strict';

angular.module("gaokaoAPP.login.childApp",['ui.router'])
    .constant("codeURL","/user/code?time="+new Date().getTime())
    .constant("loginURL","/login?time="+new Date().getTime())
    .constant("registerURL","/user/register")
    .constant("referinURL","/user/reset")
    .factory("isShowModel",function(){
        return {
            isSigin:"",
        }
    })
    .controller("logonCtr",["$scope","$rootScope","$window","codeURL","loginURL","isShowModel","AJAX",function($scope,$rootScope,$window,codeURL,loginURL,isShowModel,AJAX){
        $scope.user = {
            username:"14321111111113",
            password:"123456",
            mobile:"15952592727",
            newpassword:"123456",
            code:"",
            img:""
        };

        $rootScope.isShowLogin = true;
        $rootScope.isShowRegistered = false;
        $rootScope.isShowForget = false;

        getCodes();

        $scope.repeat = function(){
            getCodes();
        };

        function getCodes(){
            //regCode.getCode(codeURL)
            AJAX.getRequest(codeURL,'GET',"")
                .success(function(data,status){
                    $scope.user.img = data;
                });
        }
        $scope.signin = function(){
            var param = {};
            param.name = $scope.user.username;
            param.password = $scope.user.password;
            param.code = $scope.user.code;
            //loginStatus.signIn(param,loginURL)
            AJAX.getRequest(loginURL,'POST', $.param(param))
                .success(function(data,status){
                    if(data.status == -1){
                        alert("登陆失败");
                        return;
                    }
                    isShowModel.isSigin = data.response.name;
                    locationHref();
                });
        };

        $scope.showRegistered = function(){
            $rootScope.isShowLogin = false;
            $rootScope.isShowRegistered = true;
            $rootScope.isShowForget = false;
        };

        $scope.forgetPwd = function(){
            $rootScope.isShowLogin =false;
            $rootScope.isShowRegistered = false;
            $rootScope.isShowForget = true;
        };

        function locationHref(){
            $window.location.href="#/home";
            $window.location.reload();
        }
    }])
    .controller("registerCtr",["$scope","$rootScope","$window","codeURL","registerURL","isShowModel","AJAX",function($scope,$rootScope,$window,codeURL,registerURL,isShowModel,AJAX){
        $scope.user = {
            username:"14321111111113",
            password:"123456",
            mobile:"15952592727",
            newpassword:"123456",
            code:"",
            img:""
        }

        getCodes();

        $scope.repeat = function(){
            getCodes();
        };

        function getCodes(){
            AJAX.getRequest(codeURL,'GET',"")
                .success(function(data,status){
                    $scope.user.img = data;
                });
        }

        $scope.showlogin = function(){
            $rootScope.isShowLogin =true;
            $rootScope.isShowRegistered = false;
            $rootScope.isShowForget = false;
        }

        $scope.registered = function(){
            var param = {};
                param.name = $scope.user.username;
                param.password = $scope.user.password;
                param.newpassword = $scope.user.newpassword;
                param.code = $scope.user.code;
                param.mobile = $scope.user.mobile;
            AJAX.getRequest(registerURL,'POST', $.param(param))
                .success(function(data,status){
                    if(data.status==-1){
                        alert("验证码有错误");
                        return;
                    }else if (data.status == 3){
                        alert("此账户已存在");
                        return;
                    }
                    isShowModel.isSigin = $scope.user.username;
                    locationHref();
                });
        }

        function locationHref(){
            $window.location.href="#/home";
            $window.location.reload();
        }

    }])
    .controller("forgetCtr",["$scope","$rootScope","codeURL","referinURL","isShowModel","AJAX",function($scope,$rootScope,codeURL,referinURL,isShowModel,AJAX){

        $scope.user = {
            username:"14321111111113",
            password:"123456",
            mobile:"15952592727",
            newpassword:"123456",
            code:"",
            img:""
        };

        getCodes();

        $scope.repeat = function(){
            getCodes();
        };

        function getCodes(){
            AJAX.getRequest(codeURL,'GET',"")
                .success(function(data,status){
                    $scope.user.img = data;
                });
        }

        $scope.showRegistered = function(){
            $rootScope.isShowLogin = false;
            $rootScope.isShowRegistered = true;
            $rootScope.isShowForget = false;
        };

        $scope.referin = function(){
            var param = {};
            param.name = $scope.user.username;
            param.password = $scope.user.password;
            param.newpassword = $scope.user.newpassword;
            param.code = $scope.user.code;
            AJAX.getRequest(referinURL,'POST', $.param(param))
                .success(function(data,status){
                    showlogin();
                });
        };

        $scope.showlogin = function(){
            $rootScope.isShowLogin =true;
            $rootScope.isShowRegistered = false;
            $rootScope.isShowForget = false;
        };
    }]);

