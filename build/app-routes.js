/**
 * Created by qbl on 2015/11/25.
 */
define(function(require){
    var app = require('./app');

    app.run(['$rootScope',function($rootScope){
        $rootScope.studentId = "";
        deassign();
        window.onresize = function(){
            deassign();
        }
        function deassign(){
            var clientHeight = window.innerHeight;
            document.getElementById('content').style.minHeight = (clientHeight-50-54)+"px";
        }
    }])
    app.config(function($stateProvider, $urlRouterProvider){

        $urlRouterProvider.when("", "/home");

        $stateProvider
            .state("home", {
                url: "/home",
                templateUrl: "html/home/home.html",
                controllerUrl:"html/home/homeCtrl",
                controller:"homeCtrl",
                data: { isPublic: true},
                resolve:{
                    data_province: function(newService) {
                        return newService.getProvinceURL();
                    },
                    data_HomeModel2:function(newService){
                        return newService.getHomeModel2();
                    },
                    data_HomeModel3:function(newService){
                        return newService.getHomeModel3();
                    },
                    data_HomeModel4:function(newService){
                        return newService.getHomeModel4();
                    },
                    data_HomeModel5:function(newService){
                        return newService.getHomeModel5();
                    },
                    data_HomeModel6:function(newService){
                        return newService.getHomeModel6();
                    },
                    data_HomeModel7:function(newService){
                        return newService.getHomeModel7();
                    }
                }
            })

    })
    app.controller("appCtr",['$scope','$rootScope','$http','logoutURL','isShowModel',"AJAX",function($scope,$rootScope,$http,logoutURL,isShowModel,AJAX){
        $scope.user = {
            islogin : false,
            name : "",
        }

        $scope.isShow = false;
        $scope.user.name = sessionStorage.getItem('usernumber');

        if($scope.user.name != null && $scope.user.name.length>= 1){
            $scope.user.islogin = true;
        }else{
            $scope.user.islogin = false;
        }

        $scope.$watch('studentId',function(newValue,oldValue){
            if(newValue !=""){
                $scope.user.name = $rootScope.studentId;
                $scope.user.islogin = true;
            }
        })

        $scope.login = function(){
            var url =  window.location.hash.indexOf('hope');
            if(url>=0){
                $scope.isShow = true;
            }else{
                window.location.href = "#/login";
            }
        }

        $scope.close = function(){
            $scope.isShow = false;
        }

        $scope.logoff = function(){
            AJAX.getRequest(logoutURL,'GET',"")
                .success(function(data,status){
                    $scope.user.islogin = false;
                    sessionStorage.setItem('usernumber',"");
                    sessionStorage.setItem('user',JSON.stringify({"isAuthenticated": false}));
                    $scope.user.name ="";
                    window.location.reload();
                });
        }

    }])
    app.controller("pageJumpCtr",['$scope','$window',function($scope,$window){
        $scope.pageJump = function(type,user_level){
            $window.location.href="#/hope?type="+type+"&user_level="+user_level;
            $window.location.reload();
        }
    }])
});