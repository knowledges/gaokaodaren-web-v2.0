/**
 * Created by qbl on 2015/11/25.
 */
define(['app'],function(app){

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
    }]);
    app.factory('homeService',function(){
        return {
            htmlPage:""
        }
    });
    //注销
    app.constant("logoutURL","/logout");
    //主页8大菜单
    app.constant("men2","/menu?index=0&limit=8&parent_id=15");
    app.constant("men3","/menu?index=0&limit=8&parent_id=16");
    app.constant("men4","/menu?index=0&limit=4&parent_id=17");
    app.constant("men5","/menu?index=0&limit=4&parent_id=21");
    app.constant("men6","/menu?index=0&limit=8&parent_id=22");
    app.constant("men7","/article?index=0&limit=8&menu_id=93&key=");
    app.factory('AJAX',['$http',"$q",function($http,$q){
        var request = function(path,method,data){
            if(method == undefined || method == 'GET'){
                return $http({
                    url:path,
                    method: 'GET',
                    params:data,
                })
            }else{
                var dfd = $q.defer();
                var transform = function (data) {
                    return $.param(data);
                }
                var postCfg = {
                    transformRequest:transform,
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
                    }
                }
                var promise = $http.post(path,data,postCfg).then(function (response) {
                    return dfd.resolve(response) ;
                });
                return dfd.promise;
            }
        }
        return {
            getRequest : function(path,method,data){
                return request(path,method,data);
            }
        }
    }]);
    app.config(function($stateProvider, $urlRouterProvider){

        $urlRouterProvider.when("", "/home");
        $urlRouterProvider.when("/all", "all/score");
        $urlRouterProvider.when("/example", "example/nav");
        $stateProvider
            .state("home", {//主页
                url: "/home",
                templateUrl: "html/home/home.html",
                controllerUrl:"html/home/homeCtrl",
                controller:"homeCtrl",
                data: { isPublic: true},
                resolve:{
                    deps:['$ocLazyLoad',function($ocLazyLoad){
                        return $ocLazyLoad.load(['js/banner/bannerHope.js','js/banner/bannerChance.js']);
                    }],
                    //data_province:function(){
                    //    return response(provinceURL);
                    //},
                    data_HomeModel2:function($q,$http,men2){
                        var dtd = $q.defer();
                        $http.get(men2).then(function (response) {
                            dtd.resolve(response);
                        }, function (response) {
                            dtd.resolve(response);
                        });
                        return dtd.promise;
                    },
                    data_HomeModel3:function($q,$http,men3){
                        var dtd = $q.defer();
                        $http.get(men3).then(function (response) {
                            dtd.resolve(response);
                        }, function (response) {
                            dtd.resolve(response);
                        });
                        return dtd.promise;
                    },
                    data_HomeModel4:function($q,$http,men4){
                        var dtd = $q.defer();
                        $http.get(men4).then(function (response) {
                            dtd.resolve(response);
                        }, function (response) {
                            dtd.resolve(response);
                        });
                        return dtd.promise;
                    },
                    data_HomeModel5:function($q,$http,men5){
                        var dtd = $q.defer();
                        $http.get(men5).then(function (response) {
                            dtd.resolve(response);
                        }, function (response) {
                            dtd.resolve(response);
                        });
                        return dtd.promise;
                    },
                    data_HomeModel6:function($q,$http,men6){
                        var dtd = $q.defer();
                        $http.get(men6).then(function (response) {
                            dtd.resolve(response);
                        }, function (response) {
                            dtd.resolve(response);
                        });
                        return dtd.promise;
                    },
                    data_HomeModel7:function($q,$http,men7){
                        var dtd = $q.defer();
                        $http.get(men7).then(function (response) {
                            dtd.resolve(response);
                        }, function (response) {
                            dtd.resolve(response);
                        });
                        return dtd.promise;
                    }
                }
            })
            .state("hope", {//意向
                url: "/hope",
                templateUrl: "html/hope/hope.html",
                data: { isPublic: false},
                resolve:{
                    deps:['$ocLazyLoad',function($ocLazyLoad){
                        return $ocLazyLoad.load(['js/hope/hope.js','js/Controller/selectCtl/select.js','js/Controller/colleges/collegesCtl.js','js/Controller/personality/personality.js']);
                    }]
                }
            })
            .state("chance", {//预测
                url: "/chance",
                templateUrl: "html/chance/chance.html",
                controllerUrl:"html/chance/chance",
                controller:"chanceCtr",
                data: { isPublic: false}
            })
/////////////////////////////志愿范例///////////////////////////////////////////////////////
            .state('example',{
                url:'/example',
                templateUrl:"html/temp/tempExample.html",
                controllerUrl:"js/example/example",
                controller:"exampleAllCtl",
                data: { isPublic: true}
            })
            .state('example.nav',{
                url:"/nav",
                templateUrl:"html/nav/nav.html",
                controllerUrl:"js/Controller/navbar/nav",
                controller:"exampleNav",
                data: { isPublic: true},
            })
            .state("example.list",{
                url:'/itemId=:itemId&param=:param',
                templateUrl:'html/recipe/recipe.html',
                controllerUrl:"html/recipe/recipe",
                controller:"recipeInfoCtr",
                data: { isPublic: true}
            })
            .state("login", {//登陆
                url: "/login",
                templateUrl: "html/login/login.html",
                controllerUrl:"html/login/login",
                controller:"logonCtr",
                data: { isPublic: true},
                resolve:{
                    deps:['$ocLazyLoad',function($ocLazyLoad){
                        return $ocLazyLoad.load(['lib/AES.js']);
                    }]
                }
            })
            .state("register", {//注册
                url: "/register",
                templateUrl: "html/login/register.html",
                controllerUrl:"html/login/login",
                controller:"registerCtr",
                data: { isPublic: true},
                resolve:{
                    deps:['$ocLazyLoad',function($ocLazyLoad){
                        return $ocLazyLoad.load(['lib/AES.js']);
                    }]
                }
            })
            .state("forget", {//忘记密码
                url: "/forget",
                templateUrl: "html/login/forget.html",
                controllerUrl:"html/login/login",
                controller:"forgetCtr",
                data: { isPublic: true}
            })
///////////////////////////////我的足迹///////////////////////////////////////////////////////////////////////////////////
            .state('all.score',{
                url:'/score',
                templateUrl:'html/myInfo/myScore.html',
                controllerUrl:"html/myInfo/myScore",
                controller:"myScore",
                data: { isPublic: false},
            })
            .state('all', {
                url: '/all',
                templateUrl:'html/temp/tempAll.html',
                data: { isPublic: false},
                //controller:"allCtr"
            })
            .state('all.will',{
                url:'/will',
                templateUrl:'html/All/all.html',
                controllerUrl:"html/All/all",
                controller:"willCtr",
                data: { isPublic: false}
            })
            .state('all.reference',{
                url:'/reference',
                templateUrl:'html/All/all.html',
                controllerUrl:"html/All/all",
                controller:"referenceCtr",
                data: { isPublic: false}
            })
    });
    app.controller("appCtr",['$scope','$rootScope','$http','logoutURL',"AJAX",function($scope,$rootScope,$http,logoutURL,AJAX){
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
    }]);
    app.controller("pageJumpCtr",['$scope','$window',function($scope,$window){
        $scope.pageJump = function(type,user_level){
            $window.location.href="#/hope?type="+type+"&user_level="+user_level;
            $window.location.reload();
        }
    }]);
});