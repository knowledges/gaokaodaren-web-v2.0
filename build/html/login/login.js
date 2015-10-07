/**
 * Created by qbl on 2015/9/24.
 */
'use strict';

angular.module("gaokaoAPP.login",['ngRoute'])
.constant("loginURL","/login?time="+new Date().getTime())
.constant("registerURL","/user/register")
.constant("referinURL","/user/reset")
.config(['$routeProvider',function($routeProvider){
    $routeProvider.when('/login',{
        templateUrl:"html/login/login.html",
        controller: "loginCtr"
    })
}])
.service('userInfo',function(){
    this.username = "";
    this.setUserName = function(name){
        this.username = name;
    }
    this.getUsername = function(){
        return this.username;
    }
})
.controller("loginCtr",['$scope','$http','$window',"loginURL","registerURL",'userInfo',function($scope,$http,$window,loginURL,registerURL,userInfo){

        getValidCode();

        $scope.user = {
            isShowLogin:true,
            username:"14321111111113",
            password:"123456",
            mobile:"15952592727",
            pwd:"123456",
            validate:"",
            img:"",
            remember:false,
            isShowRegistered:false,
            isShowForget:false,
            islogin:true,
            isName:false,
            regName:"",
            isPwd:false,
            regPwd:"",
            isnewPwd:false,
            regNewPwd:"",
            isCode:false,
            regCode:"",
            isMobile:false,
            regMobile:""
        }

        $scope.check = function(val){
            $scope.user.remember = val;
        }

        $scope.repeat = function(){
            getValidCode();
        }

        $scope.showlogin = function(){
            getValidCode();
            $scope.user.isShowLogin = true;
            $scope.user.isShowRegistered = false;
            $scope.user.isShowForget = false;
        }

        $scope.showRegistered = function(){
            getValidCode();
            $scope.user.isShowRegistered = true;
            $scope.user.isShowLogin = false;
            $scope.user.isShowForget = false;
        }

        $scope.forgetpwd = function(){
            getValidCode();
            $scope.user.isShowForget = true;
            $scope.user.isShowLogin = false;
            $scope.user.isShowRegistered = false;
        }

        $scope.login = function(){
            var name = $scope.user.username,
                pwd = $scope.user.password,
                code = $scope.user.validate,
                remember = $scope.user.remember;

            if(regName(name) && regPwd(pwd) && regCode(code)){
                $http({
                    url:loginURL,
                    method:"POST",
                    data: $.param({"j_username":name,"j_password":pwd,"code":code}),
                    dataType: "json",
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
                    }
                }).success(function(data, status, headers, config){
                    if(data.status == -1){
                        alert('登录失败');
                        return;
                    }
                    $scope.user.name = data.response.name;
                    userInfo.setNumber(data.response.name);
                    localStorage.setItem("userInfo",JSON.stringify(data.response));
                    locationHref();
                })

            }
        }

        $scope.registered = function(){
            var name = $scope.user.username,
                pwd = $scope.user.password,
                newpwd = $scope.user.pwd,
                code = $scope.user.validate,
                mobile = $scope.user.mobile;

            if(regName(name) && regPwd(pwd) && regnewPassword(newpwd) && regCode(code) && regMobile(mobile)){
                $http({
                    url:registerURL,
                    method:"POST",
                    data: $.param({"username":name,"password":pwd,"code":code,"mobile":mobile}),
                    dataType: "json",
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
                    }
                }).success(function(data,status,headers,config){
                    if(data.status==-1){
                        alert("验证码有错误");
                        return;
                    }else if (data.status == 3){
                        alert("此账户已存在");
                        return;
                    }
                    var parame = {};
                    parame.name = $scope.user.username;
                    parame.user.password = $scope.user.password;
                    parame.user.mobile =  $scope.user.mobile;
                    localStorage.setItem("userInfo",JSON.stringify(parame));
                    locationHref();
                }).error(function(data,status,headers,config){});
            }
        }

        $scope.referin = function(){
            var name = $scope.user.username,
                pwd = $scope.user.password,
                newpwd = $scope.user.pwd,
                code = $scope.user.validate;

            if(regName(name) && regPwd(pwd) && regnewPassword(newpwd) && regCode(code)){
                var URL ="/user/reset";

                $http({
                    url:URL,
                    method:"POST",
                    data:$.param({"username":name,"old_pwd":pwd,"code":code,"new_pwd":newpwd}),
                    dataType: "json",
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
                    }
                }).success(function(data,status,headers,config){
                    $scope.user.password=pwd;
                    $scope.showlogin();
                })
            }
        }

        function locationHref(){
            $window.location.href="#/home";
            $window.location.reload();
        }
///////////////////////== validate ==///////////////////////////////////////////////////////////////////
        function getValidCode(){
            $http.get("/user/code?time="+new Date().getTime())
            .success(function(data,status,headers,config){
                $scope.user.img = data;
            }).error(function(data,status,headers,config){});
        }

        function regName(name){
            if(name == undefined || name.length <=0 ){
                $scope.user.regName="用户名不能为空";
                $scope.user.isName = true;
                return false;
            }else{
                $scope.user.regName="";
                $scope.user.isName = false;
                return true;
            }
        }

        function regPwd(password){
            if(password.length<=0){
                $scope.user.regPwd = "密码不能为空";
                $scope.user.isPwd=true;
                return false;
            }else{
                $scope.user.regPwd = "";
                $scope.user.isPwd=false;
                return true;
            }
        }

        function regnewPassword(newPassword){
            if(newPassword.length<=0){
                $scope.user.regNewPwd = "新密码不能为空";
                $scope.user.isnewPwd = true;
                return false;
            }else if(newPassword!=$scope.user.password){
                $scope.user.regNewPwd = "新密码与旧密码不一致";
                $scope.user.isnewPwd = true;
                return false;
            }else{
                $scope.user.regNewPwd = "";
                $scope.user.isnewPwd = false;
                return true;
            }
        }

        function regMobile(mobile){
            if(mobile.length<=0){
                $scope.user.regMobile ="手机号码不能为空";
                $scope.user.isMobile = true;
                return false;
            }else {
                $scope.user.regMobile ="";
                $scope.user.isMobile = false;
                return true;
            }
        }

        function regCode (code){
            if(code.length<=0){
                $scope.user.regCode = "验证码不能为空";
                $scope.user.isCode = true;
                return false;
            }else {
                $scope.user.regCode = "";
                $scope.user.isCode = false;
                return true;
            }
        }
}]);