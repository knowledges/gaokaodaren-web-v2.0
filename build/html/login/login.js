/**
 * Created by qbl on 2015/9/24.
 */
angular.module("gaokaoAPP.login",['ngRoute'])
.config(['$routeProvider',function($routeProvider){
    $routeProvider.when('/login',{
        templateUrl:"html/login/login.html",
        controller:'loginCtr'
    })
}])
.controller("loginCtr",['$scope','$http',function($scope,$http){

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
            islogin:true
        }

        $scope.check = function(val){
            $scope.user.remember = val;
        }

        $scope.repeat = function(){
            getValidCode();
        }

        $scope.showlogin = function(){
            $scope.user.isShowLogin = true;
            $scope.user.isShowRegistered = false;
            $scope.user.isShowForget = false;
        }

        $scope.showRegistered = function(){
            $scope.user.isShowRegistered = true;
            $scope.user.isShowLogin = false;
            $scope.user.isShowForget = false;
        }

        $scope.forgetpwd = function(){
            $scope.user.isShowForget = true;
            $scope.user.isShowLogin = false;
            $scope.user.isShowRegistered = false;
        }

        $scope.login = function(){

            var name = $scope.user.username,
                pwd = $scope.user.password,
                code = $scope.user.validate,
                remember = $scope.user.remember;

            if(name.length<=0){
                console.log("用户名不能为空");
                return;
            }

            if(pwd.length<=0){
                console.log("密码不能为空");
                return;
            }

            if(code.length<=0){
                console.log("code不能为空");
                return;
            }
            var URL = "/login?time="+new Date().getTime();

            $http({
                url:URL,
                method:"POST",
                data: $.param({"j_username":name,"j_password":pwd,"code":code}),
                dataType: "json",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
                }
            }).success(function(data, status, headers, config){
                alert("登陆成功");
                $scope.user.name = data.response.name;
                localStorage.setItem("userInfo",JSON.stringify(data.response));
            })

        }

        $scope.registered = function(){
            var name = $scope.user.username,
                pwd = $scope.user.password,
                newpwd = $scope.user.pwd,
                code = $scope.user.validate,
                mobile = $scope.user.mobile;

            if(name.length<=0){
                console.log("用户名不能为空");
                return;
            }

            if(code.length<=0){
                console.log("code不能为空");
                return;
            }

            if(pwd.length<=0){
                console.log("密码不能为空");
                return;
            }

            if(newpwd.length<=0){
                console.log("密码不能为空");
                return;
            }else if(newpwd!=pwd){
                console.log("密码不相等");
                return;
            }

            if(mobile.length<=0){
                console.log("密码不能为空");
            }
            var URL = "/user/register";


            $http.post(URL,{username:name,password:pwd,code:code,mobile:mobile},{
                headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
            })
                .success(function(data,status,headers,config){
                    debugger;
                }).error(function(data,status,headers,config){});
        }

        function getValidCode(){
            $http.get("/user/code?time="+new Date().getTime())
            .success(function(data,status,headers,config){
                $scope.user.img = data;
            }).error(function(data,status,headers,config){});
        }
}]);