/**
 * Created by qbl on 2015/10/9.
 */
'use strict';

angular.module("gaokaoAPP.login.childApp",['ui.router'])
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
                    data: $.param({"j_username":option.name,"j_password":option.password,"code":option.code}),
                    dataType: "json",
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
                    }
                })
            }
            var register = function(option,path){
                return $http({
                    url:path,
                    method:"POST",
                    data: $.param({"username":option.name,"password":option.pwd,"code":option.code,"mobile":option.mobile}),
                    dataType: "json",
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
                    }
                })
            }
            var forgets = function(option,path){
                return $http({
                    url:path,
                    method:"POST",
                    data: $.param({"username":option.name,"old_pwd":option.password,"code":option.code,"new_pwd":option.newpassword}),
                    dataType: "json",
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
                    }
                })
            }
            return {
                signIn:function(option,path){
                    return login(option,path);
                },
                enroll:function(option,path){
                    return register(option,path);
                },
                updatePwd:function(option,path){
                    return forgets(option,path);
                }
            }
        }
    ])
    .factory("isShowModel",function(){
        return {
            isSigin:"14321111111113",
        }
    })
    .controller("logonCtr",["$scope","$rootScope","$window","codeURL","regCode","loginURL","loginStatus","isShowModel","DATA",function($scope,$rootScope,$window,codeURL,regCode,loginURL,loginStatus,isShowModel,DATA){
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
        $rootScope.forgetCtr = false;

        getCodes();

        $scope.repeat = function(){
            getCodes();
        };

        function getCodes(){
            DATA.getRequest()
            regCode.getCode(codeURL)
                .success(function(data,status){
                    $scope.user.img = data;
                });
        }
        $scope.signin = function(){
            var param = {};
            param.name = $scope.user.username;
            param.password = $scope.user.password;
            param.code = $scope.user.code;
            loginStatus.signIn(param,loginURL)
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
    .controller("registerCtr",["$scope","$rootScope","$window","codeURL","regCode","registerURL","loginStatus","isShowModel",function($scope,$rootScope,$window,codeURL,regCode,registerURL,loginStatus,isShowModel){
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
            regCode.getCode(codeURL)
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

            loginStatus.enroll(param,registerURL)
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
    .controller("forgetCtr",["$scope","$rootScope","codeURL","regCode","referinURL","isShowModel",function($scope,$rootScope,codeURL,regCode,referinURL,isShowModel){

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
            regCode.getCode(codeURL)
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

            loginStatus.updatePwd(param,referinURL)
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

