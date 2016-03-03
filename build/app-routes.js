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

    //注销
    app.constant("logoutURL","/logout");
    //主页8大菜单
    app.constant("men2","/menu?index=0&limit=8&parent_id=15");
    app.constant("men3","/menu?index=0&limit=8&parent_id=16");
    app.constant("men4","/menu?index=0&limit=4&parent_id=17");
    app.constant("men5","/menu?index=0&limit=4&parent_id=21");
    app.constant("men6","/menu?index=0&limit=8&parent_id=22");
    app.constant("men7","/article?index=0&limit=8&menu_id=93&key=");
    app.constant("provinceURL","/city/province");
    app.factory('AJAX',['$http',"$q",function($http,$q){
        var request = function(path,method,data){
            if(method == undefined || method == 'GET'){
                return $http({
                    url:"/loocha"+path,
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
        window.url = "/loocha";
        $urlRouterProvider.when("", "/home");
        $stateProvider
            .state("home", {//主页
                url: "/home",
                templateUrl: "html/home/home.html",
                controllerUrl:"js/home/home",
                controller:"homeCtrl",
                data: { isPublic: true},
                resolve:{
                    deps:['$ocLazyLoad',function($ocLazyLoad){
                        return $ocLazyLoad.load(['js/banner/bannerHope.js','js/banner/bannerChance.js','js/Controller/navbar/new.js']);
                    }],
                    data_province:function($q,$http,provinceURL){
                        var dtd = $q.defer();
                        $http.get(url+provinceURL).then(function (response) {
                            dtd.resolve(response);
                        }, function (response) {
                            dtd.resolve(response);
                        });
                        return dtd.promise;
                    },
                    data_HomeModel2:function($q,$http,men2){
                        var dtd = $q.defer();
                        $http.get(url+men2).then(function (response) {
                            dtd.resolve(response);
                        }, function (response) {
                            dtd.resolve(response);
                        });
                        return dtd.promise;
                    },
                    data_HomeModel3:function($q,$http,men3){
                        var dtd = $q.defer();
                        $http.get(url+men3).then(function (response) {
                            dtd.resolve(response);
                        }, function (response) {
                            dtd.resolve(response);
                        });
                        return dtd.promise;
                    },
                    data_HomeModel4:function($q,$http,men4){
                        var dtd = $q.defer();
                        $http.get(url+men4).then(function (response) {
                            dtd.resolve(response);
                        }, function (response) {
                            dtd.resolve(response);
                        });
                        return dtd.promise;
                    },
                    data_HomeModel5:function($q,$http,men5){
                        var dtd = $q.defer();
                        $http.get(url+men5).then(function (response) {
                            dtd.resolve(response);
                        }, function (response) {
                            dtd.resolve(response);
                        });
                        return dtd.promise;
                    },
                    data_HomeModel6:function($q,$http,men6){
                        var dtd = $q.defer();
                        $http.get(url+men6).then(function (response) {
                            dtd.resolve(response);
                        }, function (response) {
                            dtd.resolve(response);
                        });
                        return dtd.promise;
                    },
                    data_HomeModel7:function($q,$http,men7){
                        var dtd = $q.defer();
                        $http.get(url+men7).then(function (response) {
                            dtd.resolve(response);
                        }, function (response) {
                            dtd.resolve(response);
                        });
                        return dtd.promise;
                    }
                }
            })
            .state("hope", {/*意向*/
//                url: "/type=:type&devision=:devision&user_level=:user_level",
                url: "/hope",
                templateUrl: "html/hope/newhope.html",
                controllerUrl:"js/hope/newhope",
                controller:"hopeCtr",
                data: { isPublic: true},
                resolve:{
                    deps:['$ocLazyLoad',function($ocLazyLoad){
                        return $ocLazyLoad.load(['js/Controller/selectCtl/select.js','js/Controller/colleges/collegesCtl.js','js/Controller/personality/personality.js']);
                    }]
                }
            })
            //.state("hope", {//意向
            //    url: "/hope",
            //    templateUrl: "html/hope/hope.html",
            //    data: { isPublic: false},
            //    resolve:{
            //        deps:['$ocLazyLoad',function($ocLazyLoad){
            //            return $ocLazyLoad.load(['js/hope/hope.js','js/Controller/selectCtl/select.js','js/Controller/colleges/collegesCtl.js','js/Controller/personality/personality.js']);
            //        }]
            //    }
            //})
            .state("chance", {//预测
                url: "/chance",
                templateUrl: "html/chance/newChance.html",
                controllerUrl:"js/chance/chance",
                controller:"chanceCtr",
                data: { isPublic: true},
                resolve:{
                    deps:['$ocLazyLoad',function($ocLazyLoad){
                        return $ocLazyLoad.load(['js/banner/bannerChance.js']);
                    }]
                }
            })
            //.state("chance", {//预测
            //    url: "/chance",
            //    templateUrl: "html/chance/chance.html",
            //    controllerUrl:"js/chance/chance",
            //    controller:"chanceCtr",
            //    data: { isPublic: true},
            //    resolve:{
            //        deps:['$ocLazyLoad',function($ocLazyLoad){
            //            return $ocLazyLoad.load(['js/banner/bannerChance.js']);
            //        }]
            //    }
            //})
/////////////////////////////志愿范例///////////////////////////////////////////////////////
            .state('example',{
                url:'/example',
                templateUrl:"html/temp/tempExample.html",
                //controllerUrl:"js/example/example",
                controller:"exampleAllCtl",
                data: { isPublic: true},
                resolve:{
                    deps:['$ocLazyLoad',function($ocLazyLoad){
                        return $ocLazyLoad.load(['js/example/example.js','js/Controller/listGroup/groupRecipe.js','js/Controller/navbar/nav.js','js/Controller/recipe/recipe.js']);
                    }]
                }
            })
            .state('example.nav',{
                url:"/exampleNav",
                templateUrl:"html/nav/nav.html",
                //controllerUrl:"js/Controller/navbar/nav",
                controller:"exampleNav",
                data: { isPublic: true},
                resolve:{
                    deps:['$ocLazyLoad',function($ocLazyLoad){
                        return $ocLazyLoad.load(['js/Controller/navbar/nav.js']);
                    }]
                }
            })
            .state("example.list",{
                url:'/itemId=:itemId&param=:param',
                templateUrl:'html/recipe/recipe.html',
                //controllerUrl:"js/Controller/recipe/recipe",
                controller:"recipeInfoCtr",
                data: { isPublic: true},
                resolve:{
                    deps:['$ocLazyLoad',function($ocLazyLoad){
                        return $ocLazyLoad.load(['js/Controller/recipe/recipe.js']);
                    }]
                }
            })
////////////////////////////////////志愿咨询Start////////////////////////////////////////////////////////////////////////////////////
            .state('online',{//咨询线路
                url:"/online",
                templateUrl:"html/temp/tempOnline.html",
                controllerUrl:"js/online/online",
                controller:"onlineCtr",
                data: { isPublic: true},
                resolve:{
                    deps:['$ocLazyLoad',function($ocLazyLoad){
                        return $ocLazyLoad.load(['js/online/online.js','js/Controller/navbar/nav.js','js/Controller/listGroup/groupOnline.js','js/Controller/showInfo/showInfo.js']);
                    }]
                }
            })
            .state('online.nav',{
                url:"/onlineNav",
                templateUrl:"html/nav/nav.html",
                controllerUrl:"js/Controller/navbar/nav",
                controller:"onlineNav",
                data: { isPublic: true},
                resolve:{
                    deps:['$ocLazyLoad',function($ocLazyLoad){
                        return $ocLazyLoad.load(['js/online/online.js','js/Controller/navbar/nav.js','js/Controller/listGroup/groupOnline.js','js/Controller/showInfo/showInfo.js']);
                    }]
                }
            })
            .state('online.list',{
                url:'/itemId=:itemId&param=:param',
                templateUrl:'html/showInfo/showInfo.html',
                controller:"js/Controller/showInfo/showInfo",
                controller:"onlineInfoCtr",
                data: { isPublic: true},
                resolve:{
                    deps:['$ocLazyLoad',function($ocLazyLoad){
                        return $ocLazyLoad.load(['js/online/online.js','js/Controller/navbar/nav.js','js/Controller/listGroup/groupOnline.js','js/Controller/showInfo/showInfo.js']);
                    }]
                }
            })
            .state('city', {//城市介绍
                url: '/city',
                templateUrl:'html/temp/tempCity.html',
                controllerUrl:"js/city/city",
                controller:"tempCtr",
                data: { isPublic: true},
                resolve:{
                    deps:['$ocLazyLoad',function($ocLazyLoad){
                        return $ocLazyLoad.load(['js/city/city.js','js/Controller/navbar/city.js','js/Controller/navbar/content.js','js/Controller/navbar/new.js','js/Controller/menu/menu.js']);
                    }]
                }
            })
            .state('city.nav',{
                url:'/cityNav',
                templateUrl:'html/nav/nav.html',
                controllerUrl:"js/Controller/navbar/nav",
                controller:"cityNav",
                data: { isPublic: true},
                resolve:{
                    deps:['$ocLazyLoad',function($ocLazyLoad){
                        return $ocLazyLoad.load(['js/Controller/navbar/nav.js','js/city/city.js','js/Controller/navbar/city.js','js/Controller/navbar/new.js','js/Controller/navbar/content.js','js/Controller/menu/menu.js']);
                    }]
                }
            })
            .state('city.list',{
                url:'/{cityId:[0-9]{0,4}}',
                templateUrl:'html/city/city.html',
                controllerUrl:"js/Controller/navbar/city",
                controller:"cityConCtl",
                data: { isPublic: true},
            })
            .state('school',{//學校
                url:"/school",
                templateUrl:"html/temp/tempSchool.html",
                controllerUrl:"js/school/school",
                controller:"schlCtl",
                data: { isPublic: true },
                resolve:{
                    deps:['$ocLazyLoad',function($ocLazyLoad){
                        return $ocLazyLoad.load(['js/school/school.js','js/Controller/navbar/school.js']);
                    }]
                }
            })
            .state('school.nav',{
                url:"/schoolNav",
                templateUrl:"html/nav/nav.html",
                controllerUrl:"js/Controller/navbar/nav",
                controller:"schoolNav",
                data: { isPublic: true },
                resolve: {
                    deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load(['js/Controller/navbar/nav.js']);
                    }]
                }
            })
            .state('school.list',{
                url:"/{type:[0-9]{1,4}}",
                templateUrl:"html/school/school.html",
                controllerUrl:"js/Controller/navbar/school",
                controller:"schoolConCtl",
                data: { isPublic: true },
            })
            .state('marjor',{//专业
                abstract: true,
                url:"/marjor",
                templateUrl:"html/temp/tempMarjor.html",
                controllerUrl:"js/marjor/marjor",
                controller:"marjorCtl",
                data: { isPublic: true},
                resolve:{
                    deps:['$ocLazyLoad',function($ocLazyLoad){
                        return $ocLazyLoad.load(['js/Controller/navbar/marjor.js','js/marjor/marjor.js']);
                    }]
                }
            })
            .state('marjor.nav',{
                url:"/marjorNav",
                templateUrl:"html/nav/nav.html",
                controllerUrl:"js/Controller/navbar/nav",
                data: { isPublic: true},
                controller:"marjorNav",
                resolve:{
                    deps:['$ocLazyLoad',function($ocLazyLoad){
                        return $ocLazyLoad.load(['js/Controller/navbar/marjor.js','js/Controller/navbar/new.js','js/marjor/marjor.js']);
                    }]
                }
            })
            .state('marjor.list',{
                url:"/{type:[0-9]{1,4}}",
                templateUrl:"html/marjor/marjor.html",
                controllerUrl:"js/Controller/navbar/marjorInfo",
                controller:"marjorConCtl",
                data: { isPublic: true}
            })
            .state('recipe',{//填报要领
                url:'/recipe',
                templateUrl:'html/temp/tempRecipe.html',
                controllerUrl:"js/recipe/recipe",
                controller:"reciptCtl",
                data: { isPublic: true },
                resolve:{
                    deps:['$ocLazyLoad',function($ocLazyLoad){
                        return $ocLazyLoad.load(['js/Controller/listGroup/groupRecipe.js','js/Controller/navbar/nav.js','js/recipe/recipe.js']);
                    }]
                }
            })
            .state('recipe.nav',{
                url:'/recipeNav',
                templateUrl:'html/nav/nav.html',
                controllerUrl:"js/Controller/navbar/nav",
                controller:'recipeCtr',
                data: { isPublic: true },
                resolve:{
                    deps:['$ocLazyLoad',function($ocLazyLoad){
                        return $ocLazyLoad.load(['js/Controller/navbar/nav.js','js/Controller/navbar/new.js']);
                    }]
                }
            })
            .state('recipe.list',{
                url:'/itemId=:itemId&param=:param',
                templateUrl:'html/recipe/recipe.html',
                //controllerUrl:"js/Controller/recipe/recipe",
                controller:"recipeInfoCtr",
                data: { isPublic: true },
                resolve:{
                    deps:['$ocLazyLoad',function($ocLazyLoad){
                        return $ocLazyLoad.load(['js/Controller/recipe/recipe.js']);
                    }]
                }
            })
            .state('score',{//分数分析
                url:"/score",
                templateUrl:"html/temp/tempScore.html",
                controllerUrl:"js/score/score",
                controller:"scoreCtl",
                data: { isPublic: true },
                resolve:{
                    deps:['$ocLazyLoad',function($ocLazyLoad){
                        return $ocLazyLoad.load(['js/Controller/listGroup/groupScore.js','js/Controller/navbar/nav.js','js/Controller/recipe/recipe.js','js/score/score.js']);
                    }]
                }
            })
            .state('score.nav',{
                url:"/scoreNav",
                templateUrl:"html/nav/nav.html",
                controllerUrl:"js/Controller/navbar/nav",
                controller:"scoreNav",
                data: { isPublic: true },
                resolve:{
                    deps:['$ocLazyLoad',function($ocLazyLoad){
                        return $ocLazyLoad.load(['js/Controller/navbar/nav.js','js/Controller/navbar/new.js']);
                    }]
                }
            })
            .state('score.list',{
                url:'/itemId=:itemId&param=:param',
                templateUrl:'html/recipe/recipe.html',
                controllerUrl:"js/Controller/recipe/recipe",
                controller:"recipeInfoCtr",
                data: { isPublic: true },
                resolve:{
                    deps:['$ocLazyLoad',function($ocLazyLoad){
                        return $ocLazyLoad.load(['js/Controller/recipe/recipe.js']);
                    }]
                }
            })
            .state('policy',{//招生政策
                url:"/policy",
                templateUrl:"html/temp/tempPolicy.html",
                controllerUrl:"js/policy/policy",
                controller:"policyCtr",
                data: { isPublic: true },
                resolve:{
                    deps:['$ocLazyLoad',function($ocLazyLoad){
                        return $ocLazyLoad.load(['js/Controller/listGroup/groupPolicy.js']);
                    }]
                }
            })
            .state('policy.nav',{
                url:"/policyNav",
                templateUrl:"html/nav/nav.html",
                controllerUrl:"js/Controller/navbar/nav",
                controller:"policyNav",
                data: { isPublic: true },
                resolve:{
                    deps:['$ocLazyLoad',function($ocLazyLoad){
                        return $ocLazyLoad.load(['js/Controller/navbar/nav','js/Controller/navbar/new.js']);
                    }]
                }
            })
            .state('policy.list',{
                url:'/itemId=:itemId&param=:param',
                templateUrl:'html/recipe/recipe.html',
                controllerUrl:"js/Controller/recipe/recipe",
                controller:"recipeInfoCtr",
                data: { isPublic: true },
                resolve:{
                    deps:['$ocLazyLoad',function($ocLazyLoad){
                        return $ocLazyLoad.load(['js/Controller/recipe/recipe.js']);
                    }]
                }
            })
            .state('job', {//毕业去向
                url: "/job",
                templateUrl: "html/temp/tempJob.html",
                controllerUrl:"js/job/job",
                controller: "jobCtr",
                data: {isPublic: true},
                resolve:{
                    deps:['$ocLazyLoad',function($ocLazyLoad){
                        return $ocLazyLoad.load(['js/Controller/listGroup/groupJob.js','js/Controller/navbar/nav','js/Controller/navbar/new.js']);
                    }]
                }
            })
            .state('job.nav', {
                url: "/jobNav",
                templateUrl: "html/nav/nav.html",
                controllerUrl:"js/Controller/navbar/nav",
                controller: "jobNav",
                data: {isPublic: true},
                resolve:{
                    deps:['$ocLazyLoad',function($ocLazyLoad){
                        return $ocLazyLoad.load(['js/Controller/listGroup/groupJob.js','js/Controller/navbar/nav','js/Controller/navbar/new.js']);
                    }]
                }
            })
            .state('job.list', {
                url: '/itemId=:itemId&param=:param',
                templateUrl: 'html/recipe/recipe.html',
                controllerUrl:"js/Controller/recipe/recipe",
                controller: "recipeInfoCtr",
                data: {isPublic: true},
                resolve:{
                    deps:['$ocLazyLoad',function($ocLazyLoad){
                        return $ocLazyLoad.load(['js/Controller/recipe/recipe.js']);
                    }]
                }
            })
            .state('unique',{//个性特征
                url:"/unique",
                templateUrl:"html/temp/tempUnique.html",
                controllerUrl:"js/unique/unique",
                controller:"uniqueCtr",
                data: { isPublic: true },
                resolve:{
                    deps:['$ocLazyLoad',function($ocLazyLoad){
                        return $ocLazyLoad.load(['js/unique/unique.js','js/Controller/listGroup/groupUnique.js','js/Controller/recipe/recipe.js']);
                    }]
                }
            })
            .state('unique.nav',{
                url:"/uniqueNav",
                templateUrl:"html/nav/nav.html",
                controllerUrl:"js/Controller/navbar/nav",
                controller:"uniqueNav",
                data: { isPublic: true },
                resolve:{
                    deps:['$ocLazyLoad',function($ocLazyLoad){
                        return $ocLazyLoad.load(['js/Controller/navbar/nav.js','js/Controller/navbar/new.js']);
                    }]
                }
            })
            .state('unique.list',{
                url:'/itemId=:itemId&param=:param',
                templateUrl:'html/recipe/recipe.html',
                controllerUrl:"js/Controller/recipe/recipe",
                controller:"recipeInfoCtr",
                data: { isPublic: true },
                resolve:{
                    deps:['$ocLazyLoad',function($ocLazyLoad){
                        return $ocLazyLoad.load(['js/Controller/recipe/recipe.js']);
                    }]
                }
            })
////////////////////////////////////志愿咨询end///////////////////////////////////////////////////////////////////////////////////////////
            .state("login", {//登陆
                url: "/login",
                templateUrl: "html/login/login.html",
                controllerUrl:"js/login/login",
                controller:"logCtr",
                data: { isPublic: true},
                resolve:{
                    deps:['$ocLazyLoad',function($ocLazyLoad){
                        return $ocLazyLoad.load(['js/login/login.js','lib/AES.js']);
                    }]
                }
            })
            .state("register", {//注册
                url: "/register",
                templateUrl: "html/login/register.html",
                controllerUrl:"js/login/login",
                controller:"registerCtr",
                data: { isPublic: true},
                resolve:{
                    deps:['$ocLazyLoad',function($ocLazyLoad){
                        return $ocLazyLoad.load(['lib/AES.js','js/login/login.js']);
                    }]
                }
            })
            .state("forget", {//忘记密码
                url: "/forget",
                templateUrl: "html/login/forget.html",
                controllerUrl:"js/login/login",
                controller:"forgetCtr",
                data: { isPublic: true},
                resolve:{
                    deps:['$ocLazyLoad',function($ocLazyLoad){
                        return $ocLazyLoad.load(['lib/AES.js','js/login/login.js']);
                    }]
                }
            })
///////////////////////////////我的足迹///////////////////////////////////////////////////////////////////////////////////
            .state('all', {
                url: '/all',
                templateUrl:'html/temp/tempAll.html',
                data: { isPublic: false},
                resolve:{
                    deps:['$ocLazyLoad',function($ocLazyLoad){
                        return $ocLazyLoad.load(['js/myInfo/myScore.js']);
                    }]
                }
                //controller:"allCtr"
            })
            .state('all.score',{
                url:'/allScore',
                templateUrl:'html/myInfo/myScore.html',
                controllerUrl:"js/myInfo/myScore",
                controller:"myScore",
                data: { isPublic: false},
                resolve:{
                    deps:['$ocLazyLoad',function($ocLazyLoad){
                        return $ocLazyLoad.load(['js/myInfo/myScore.js']);
                    }]
                }
            })
            .state('all.will',{
                url:'/allWill',
                templateUrl:'html/All/all.html',
                controllerUrl:"html/All/all",
                controller:"willCtr",
                data: { isPublic: false},
                resolve:{
                    deps:['$ocLazyLoad',function($ocLazyLoad){
                        return $ocLazyLoad.load(['html/All/all.js']);
                    }]
                }
            })
            .state('all.reference',{
                url:'/allReference',
                templateUrl:'html/All/all.html',
                controllerUrl:"html/All/all",
                controller:"referenceCtr",
                data: { isPublic: false},
                resolve:{
                    deps:['$ocLazyLoad',function($ocLazyLoad){
                        return $ocLazyLoad.load(['html/All/all.js']);
                    }]
                }
            })
//////////////////////////////支付///////////////////////////////////////////////////////////////////////////////////////
            .state("pay",{
                url:"/pay",
                templateUrl:"html/pay/pay.html",
                controllerUrl:"js/pay/pay",
                controller:'payCtr',
                data: { isPublic: false}
            })
////////////////////////////////志愿表////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
            .state("refer",{
                url:"/refer",
                templateUrl:"html/refer/refer.html",
                controllerUrl:"js/refer/refer",
                controller:'referCtr',
                data: { isPublic: false}
            })
////////////////////////////////随机志愿表/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
            .state('refer1',{
                url:"/refer1",
                templateUrl:"html/refer/refer1.html",
                controllerUrl:"js/refer/refer1",
                controller:'referCtr',
                data: { isPublic: true}
            })
////////////////////////////////全站搜索///////////////////////////////////////////////////////////////////////////////////////
            .state("search",{
                url:"/search/key=:key",
                templateUrl:"html/search/search.html",
                controllerUrl:"js/search/search",
                controller:"searchCtr",
                data: { isPublic: true},
                resolve:{
                    deps:['$ocLazyLoad',function($ocLazyLoad){
                        return $ocLazyLoad.load(['js/search/search.js']);
                    }]
                }
            })
    });
    app.controller("appCtr",['$scope','$rootScope','$http','logoutURL',"AJAX",function($scope,$rootScope,$http,logoutURL,AJAX){
        $scope.user = {
            islogin : false,
            name : "",
            search:""
        }
        $scope.isShow = false;
        $scope.user.name = sessionStorage.getItem('usernumber') ;
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
                    window.location.href = "#/home";
                });
        }

        /*TODO 查询*/
        $scope.totalSearch = function(){
            window.location.href = "#/search/key="+$scope.user.search;
        }
    }]);
    app.controller("pageJumpCtr",['$scope','$window',function($scope,$window){
        $scope.pageJump = function(type,user_level){
            $window.location.href="#/hope?type="+type+"&user_level="+user_level;
            $window.location.reload();
        }
    }]);
});