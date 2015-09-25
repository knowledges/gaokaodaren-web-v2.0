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
        $scope.user = {
            username:"",
            password:"",
            validate:"",
            remember:false
        }

        $scope.check = function(val){
            $scope.user.remember = val;
        }

        $scope.login = function(){

            var name = $scope.user.username,
                pwd = $scope.user.password,
                remember = $scope.user.remember;

            if(name.length<=0){
                console.log("用户名不能为空");
                return;
            }

            if(pwd.length<=0){
                console.log("密码不能为空");
                return;
            }
            getValidCode();
            //var URL = "/login?time="+new Date().getTime();


            //$http.post(URL,{j_username:name,j_password:pwd,code:code})


        }


        function getValidCode(){
            $http.get("/user/code?time="+new Date().getTime())
                .success(function(data,status,headers,config){
                    $scope.user.validate = data;
                })
                .error(function(data,status,headers,config){

                });
        }

}]);