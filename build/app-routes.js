/**
 * Created by qbl on 2015/11/25.
 */
define(['app'],function(app){

    app.run(['$rootScope',function($rootScope){
        $rootScope.studentId = "";
        $rootScope.loading = true;
        $rootScope.isFromDepth=false;
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
    app.constant("provinceURL","/city/province");
    app.constant("loocha","");
    //app.constant("loocha","/loocha");
    app.factory('getLoginUserInfo',['$http','loocha',function($http,loocha){
        var userInfo ={
            isLogoin:function(){
                return $http.get(loocha+'/user').success(function(data){
                    if(data.status == "-1"){
                        sessionStorage.removeItem('type');
                        sessionStorage.removeItem('uScore');
                        sessionStorage.removeItem('user');
                        sessionStorage.removeItem('user_id');
                        sessionStorage.removeItem('usernumber');
                        alert('登陆失效或您还没有登陆，先去登陆吧！');
                        window.location.href = "#/login";
                        $(".modal-backdrop").hide();
                    }
                    if(data.response!=undefined && data.response.id!=undefined){
                        sessionStorage.setItem("user",JSON.stringify({"isAuthenticated":true}));
                        sessionStorage.setItem("user_id",data.response.id);
                        sessionStorage.setItem("usernumber",data.response.name);
                    }
                }).error(function(e){
                    sessionStorage.removeItem('type');
                    sessionStorage.removeItem('uScore');
                    sessionStorage.removeItem('user');
                    sessionStorage.removeItem('user_id');
                    sessionStorage.removeItem('usernumber');
                    alert('登陆失效或您还没有登陆，先去登陆吧！');
                    window.location.href = "#/login";
                    $(".modal-backdrop").hide();
                });
            },
            isScores:function(){
                return $http.get(loocha+"/uscore").success(function(data){
                    if(data.response!=null && data.response.length>0){
                        sessionStorage.setItem('uScore',JSON.stringify(data.response[0]));
                    }
                }).error(function(e){
                    alert('登陆失效或您还没有登陆，先去登陆吧！');
                    window.location.href = "#/login";
                });
            }
        }
        return userInfo;

    }]);
    app.factory("baidubaike",function(){
        var baike = {
            openwin:function(url){
                var a = document.createElement("a");
                a.setAttribute("href", url);
                a.setAttribute("target", "_blank");
                a.setAttribute("id", "openwin");
                document.body.appendChild(a);
                a.click();
            }
        }
        return baike;

    });
    app.factory("inLine",function(){
        var isline = {
            scores:function(type,score){
                var num = 0;
                switch (parseInt(type)){
                    case 1:
                        num  = score - 342;
                        break;
                    case 2:
                        num  = score - 344;
                        break;
                    case 3:
                        num  = score - 313;
                        break;
                    case 4:
                        num  = score - 310;
                        break;
                    case 7:
                        num  = score - 215;
                        break;
                    case 8:
                        num  = score - 215;
                        break;
                }

                if(type!=5&&type!=6){
                    if(num>=-10 && num<=2){
                        alert(" 您是压线考生，计算概率没有意义\n 请查阅网站“深度查询”栏目 \n “分数分析”专题（三）“压线考分考生的深度查询”条款");
                    }
                }
            }
        }
        return isline;
    });
    app.config(["$stateProvider","$urlRouterProvider","$httpProvider",function($stateProvider, $urlRouterProvider,$httpProvider){
        $urlRouterProvider.when("", "/home");
        $stateProvider
            .state("home", {//主页
                url: "/home",
                templateUrl: "html/home/home.html",
                controllerUrl:"js/home/home",
                controller:"homeCtrl",
                data: { isPublic: true},
                resolve:{
                    loadMyCtrl:['$ocLazyLoad',function($ocLazyLoad){
                        return $ocLazyLoad.load(['js/banner/bannerHope.js','js/banner/bannerChance.js','js/Controller/navbar/new.js']);
                    }],
                    data_province:function($q,$http,provinceURL,loocha){
                        var dtd = $q.defer();
                        $http.get(loocha+provinceURL).then(function (response) {
                            dtd.resolve(response);
                        }, function (response) {
                            dtd.resolve(response);
                        });
                        return dtd.promise;
                    }
                }
            })
            .state("hope", {/*意向*/
                //url: "/hope",
                url: "/hope/batch=:batch&out_trade_no=:out_trade_no",
                templateUrl: "html/hope/hope.html",
                //controllerUrl:"js/hope/hope",
                controller:"hopeCtr",
                data: { isPublic: true}
                //resolve:{
                //    deps:['$ocLazyLoad',function($ocLazyLoad){
                //        return $ocLazyLoad.load(['js/hope/hope.js']);
                //    }]
                //}
            })
            .state("chance", {//预测
                //url: "/chance",
                url: "/chance/batch=:batch",
                templateUrl: "html/chance/newChance.html",
                //controllerUrl:"js/chance/chance",
                controller:"chanceCtr",
                data: { isPublic: true},
                resolve:{
                    deps:['$ocLazyLoad',function($ocLazyLoad){
                        return $ocLazyLoad.load(['js/banner/bannerChance.js']);
                    }]
                }
            })
/////////////////////////////志愿范例///////////////////////////////////////////////////////
            .state('example',{
                url:'/example',
                templateUrl:"html/temp/tempExample.html",
                //controllerUrl:"js/example/example",
                controller:"exampleAllCtr",
                data: { isPublic: false},
                resolve:{
                    deps:['$ocLazyLoad',function($ocLazyLoad){
                        return $ocLazyLoad.load(['js/example/example.js','js/Controller/listGroup/groupRecipe.js','js/Controller/recipe/recipe.js']);
                    }]
                }
            })
            /*.state('example.nav',{
             url:"/batch=:batch",
             templateUrl:"html/nav/nav.html",
             controller:"exampleNav",
             data: { isPublic: true}
             //resolve:{
             //    deps:['$ocLazyLoad',function($ocLazyLoad){
             //        return $ocLazyLoad.load(['js/Controller/navbar/nav.js']);
             //    }]
             //}
             })*/
            .state("example.list",{
                url:'/itemId=:itemId&param=:param&batch=:batch',
                templateUrl:'html/recipe/recipe.html',
                //controllerUrl:"js/Controller/recipe/recipe",
                controller:"recipeInfoCtr",
                data: { isPublic: false},
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
                //controllerUrl:"js/online/online",
                controller:"onlineCtr",
                data: { isPublic: true},
                resolve:{
                    deps:['$ocLazyLoad',function($ocLazyLoad){
                        return $ocLazyLoad.load(['js/Controller/showInfo/showInfo.js']);
                    }]
                }
            })
            .state('online.nav',{
                url:"/navOnline",
                templateUrl:"html/nav/nav.html",
                controller:"onlineNav",
                data: { isPublic: true},
                resolve:{
                    deps:['$ocLazyLoad',function($ocLazyLoad){
                        return $ocLazyLoad.load(['js/Controller/showInfo/showInfo.js']);
                    }]
                }
            })
            .state('online.list',{
                url:'/itemId=:itemId&param=:param&active=:active',
                templateUrl:'html/showInfo/showInfo.html',
                controllerUrl:"js/Controller/showInfo/showInfo",
                controller:"onlineInfoCtr",
                data: { isPublic: true},
                resolve:{
                    deps:['$ocLazyLoad',function($ocLazyLoad){
                        return $ocLazyLoad.load(['js/Controller/showInfo/showInfo.js']);
                    }]
                }
            })
            .state('city', {//城市介绍
                url: '/city',
                templateUrl:'html/temp/tempCity.html',
                //controllerUrl:"js/city/city",
                controller:"tempCtr",
                data: { isPublic: true},
                resolve:{
                    deps:['$ocLazyLoad',function($ocLazyLoad){
                        return $ocLazyLoad.load(['js/Controller/navbar/city.js','js/Controller/navbar/content.js','js/Controller/navbar/new.js','js/Controller/menu/menu.js']);
                    }]
                }
            })
            .state('city.nav',{
                url:'/navCity',
                templateUrl:'html/nav/nav.html',
                controller:"cityNav",
                data: { isPublic: true},
                resolve:{
                    deps:['$ocLazyLoad',function($ocLazyLoad){
                        return $ocLazyLoad.load(['js/city/city.js','js/Controller/navbar/city.js','js/Controller/navbar/new.js','js/Controller/navbar/content.js','js/Controller/menu/menu.js']);
                    }]
                }
            })
            .state('city.list',{
                url:'/cityId=:cityId&code=:code',
                templateUrl:'html/city/city.html',
                controllerUrl:"js/Controller/navbar/city",
                controller:"cityConCtl",
                data: { isPublic: true},
            })
            .state('school',{//學校
                url:"/school",
                templateUrl:"html/temp/tempSchool.html",
                //controllerUrl:"js/school/school",
                controller:"schlCtl",
                data: { isPublic: true },
                resolve:{
                    deps:['$ocLazyLoad',function($ocLazyLoad){
                        return $ocLazyLoad.load(['js/Controller/navbar/school.js']);
                    }]
                }
            })
            .state('school.nav',{
                url:"/navSchool",
                templateUrl:"html/nav/nav.html",
                controller:"schoolNav",
                data: { isPublic: true }
                //resolve: {
                //    deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                //        return $ocLazyLoad.load(['js/Controller/navbar/nav.js']);
                //    }]
                //}
            })
            .state('school.list',{
                url:"/{type:[0-9]{1,4}}",
                templateUrl:"html/school/school.html",
                //controllerUrl:"js/Controller/navbar/school",
                controller:"schoolConCtl",
                data: { isPublic: true },
            })
            .state('marjor',{//专业
                abstract: true,
                url:"/marjor",
                templateUrl:"html/temp/tempMarjor.html",
                //controllerUrl:"js/marjor/marjor",
                controller:"marjorCtl",
                data: { isPublic: true},
                resolve:{
                    deps:['$ocLazyLoad',function($ocLazyLoad){
                        return $ocLazyLoad.load(['js/Controller/navbar/marjor.js']);
                    }]
                }
            })
            .state('marjor.nav',{
                url:"/navMarjor",
                templateUrl:"html/nav/nav.html",
                data: { isPublic: true},
                controller:"marjorNav",
                resolve:{
                    deps:['$ocLazyLoad',function($ocLazyLoad){
                        return $ocLazyLoad.load(['js/Controller/navbar/marjor.js']);
                    }]
                }
            })
            .state('marjor.list',{
                url:"/{type:[0-9]{1,4}}",
                templateUrl:"html/marjor/marjor.html",
                controllerUrl:"js/Controller/navbar/marjorInfo",
                controller:"marjorConCtr",
                data: { isPublic: true}
            })
            .state('recipe',{//填报要领
                url:'/recipe',
                templateUrl:'html/temp/tempRecipe.html',
                controller:"reciptCtr",
                data: { isPublic: true },
                resolve:{
                    deps:['$ocLazyLoad',function($ocLazyLoad){
                        return $ocLazyLoad.load(['js/recipe/recipe.js']);
                    }]
                }
            })
            .state('recipe.nav',{
                url:'/navRecipe',
                templateUrl:'html/nav/nav.html',
                controller:'recipeNav',
                data: { isPublic: true },
                resolve:{
                    deps:['$ocLazyLoad',function($ocLazyLoad){
                        return $ocLazyLoad.load(['js/Controller/navbar/new.js']);
                    }]
                }
            })
            .state('recipe.list',{
                url:'/itemId=:itemId&param=:param&active=:active',
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
                controller:"scoreCtr",
                data: { isPublic: true },
                resolve:{
                    deps:['$ocLazyLoad',function($ocLazyLoad){
                        return $ocLazyLoad.load(['js/score/score.js']);
                    }]
                }
            })
            .state('score.nav',{
                url:"/navScore",
                templateUrl:"html/nav/nav.html",
                controller:"scoreNav",
                data: { isPublic: true },
                resolve:{
                    deps:['$ocLazyLoad',function($ocLazyLoad){
                        return $ocLazyLoad.load(['js/Controller/navbar/new.js']);
                    }]
                }
            })
            .state('score.list',{
                url:'/itemId=:itemId&param=:param&active=:active',
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
                //controllerUrl:"js/policy/policy",
                controller:"policyCtr",
                data: { isPublic: true },
                resolve:{
                    deps:['$ocLazyLoad',function($ocLazyLoad){
                        return $ocLazyLoad.load(['js/Controller/listGroup/groupPolicy.js']);
                    }]
                }
            })
            .state('policy.nav',{
                url:"/navPolicy",
                templateUrl:"html/nav/nav.html",
                controller:"policyNav",
                data: { isPublic: true },
                resolve:{
                    deps:['$ocLazyLoad',function($ocLazyLoad){
                        return $ocLazyLoad.load(['js/Controller/navbar/new.js']);
                    }]
                }
            })
            .state('policy.list',{
                url:'/itemId=:itemId&param=:param&active=:active',
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
                //controllerUrl:"js/job/job",
                controller: "jobCtr",
                data: {isPublic: true},
                resolve:{
                    deps:['$ocLazyLoad',function($ocLazyLoad){
                        return $ocLazyLoad.load(['js/Controller/listGroup/groupJob.js','js/Controller/navbar/new.js']);
                    }]
                }
            })
            .state('job.nav', {
                url: "/jobNav",
                templateUrl: "html/nav/nav.html",
                controller: "jobNav",
                data: {isPublic: true},
                resolve:{
                    deps:['$ocLazyLoad',function($ocLazyLoad){
                        return $ocLazyLoad.load(['js/Controller/listGroup/groupJob.js','js/Controller/navbar/new.js']);
                    }]
                }
            })
            .state('job.list', {
                url: '/itemId=:itemId&param=:param&active=:active',
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
                //controllerUrl:"js/unique/unique",
                controller:"uniqueCtr",
                data: { isPublic: true },
                resolve:{
                    deps:['$ocLazyLoad',function($ocLazyLoad){
                        return $ocLazyLoad.load(['js/Controller/listGroup/groupUnique.js','js/Controller/recipe/recipe.js']);
                    }]
                }
            })
            .state('unique.nav',{
                url:"/navUnique",
                templateUrl:"html/nav/nav.html",
                controller:"uniqueNav",
                data: { isPublic: true },
                resolve:{
                    deps:['$ocLazyLoad',function($ocLazyLoad){
                        return $ocLazyLoad.load(['js/Controller/navbar/new.js']);
                    }]
                }
            })
            .state('unique.list',{
                url:'/itemId=:itemId&param=:param&active=:active',
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
                controller:"logCtr",
                data: { isPublic: true},
            })
            .state("register", {//注册
                url: "/register",
                templateUrl: "html/login/register.html",
                controllerUrl:"js/login/register",
                controller:"registerCtr",
                data: { isPublic: true},
                resolve:{
                    loadMyCtrl:['$ocLazyLoad',function($ocLazyLoad){
                        return $ocLazyLoad.load(['lib/AES.js','js/login/register.js']);
                    }]
                }
            })
            .state("forget", {//忘记密码
                url: "/forget",
                templateUrl: "html/login/forget.html",
                controllerUrl:"js/login/forget",
                controller:"forgetCtr",
                data: { isPublic: true},
                resolve:{
                    loadMyCtrl:['$ocLazyLoad',function($ocLazyLoad){
                        return $ocLazyLoad.load(['lib/AES.js','js/login/forget.js']);
                    }]
                }
            })
///////////////////////////////我的足迹///////////////////////////////////////////////////////////////////////////////////
            .state('all', {
                url: '/all',
                templateUrl:'html/temp/tempAll.html',
                data: { isPublic: false},
                resolve:{
                    loadMyCtrl:['$ocLazyLoad',function($ocLazyLoad){
                        return $ocLazyLoad.load(['js/myInfo/myScore.js']);
                    }]
                }
            })
            .state('all.score',{
                url:'/allScore',
                templateUrl:'html/myInfo/myScore.html',
                controllerUrl:"js/myInfo/myScore",
                controller:"myScore",
                data: { isPublic: false},
                resolve:{
                    loadMyCtrl:['$ocLazyLoad',function($ocLazyLoad){
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
                    loadMyCtrl:['$ocLazyLoad',function($ocLazyLoad){
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
                /*resolve:{
                 loadMyCtrl:['$ocLazyLoad',function($ocLazyLoad){
                 return $ocLazyLoad.load(['html/All/all.js']);
                 }]
                 }*/
            })
            .state('all.chance',{
                url:'/allChance',
                templateUrl:'html/All/all.html',
                controllerUrl:"html/All/all",
                controller:"allChanceCtr",
                data: { isPublic: false},
                /*resolve:{
                 loadMyCtrl:['$ocLazyLoad',function($ocLazyLoad){
                 return $ocLazyLoad.load(['html/All/all.js']);
                 }]
                 }*/
            })
            .state('all.depth',{
                url:'/allDepth',
                templateUrl:'html/All/all.html',
                controllerUrl:"html/All/all",
                controller:"alldepthCtr",
                data: { isPublic: false},
            })
            .state("all.orderdepth",{
                url:'/out_trade_no=:out_trade_no',
                templateUrl:"html/All/order.html",
                //controllerUrl:"html/All/order",
                controller:"orderDepthCtr",
                data:{isPublic:false}
            })
            ////////////////////////////////深度查询////////////////////////////////////////////////////////////////////////////////////////////////////////////////
            .state("depth",{
                url:"/depth",
                templateUrl:"html/temp/tempDepath.html",
                controllerUrl:"js/depth/articleMenu",
                controller:"artCtr",
                data: { isPublic: true},
                resolve:{
                    data_province:function($q,$http,provinceURL,loocha){
                        var dtd = $q.defer();
                        $http.get(loocha+provinceURL).then(function (response) {
                            dtd.resolve(response);
                        }, function (response) {
                            dtd.resolve(response);
                        });
                        return dtd.promise;
                    }
                }
            })
            .state("depth.info",{
                url:"/depthInfo/batch=:batch",
                templateUrl:"html/depth/articleInfo.html",
                data: { isPublic: true},
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
                /*controllerUrl:"js/refer/refer",*/
                controller:'referCtr',
                data: { isPublic: true},
                resolve:{
                    deps:['$ocLazyLoad',function($ocLazyLoad){
                        return $ocLazyLoad.load(['js/alt.js']);
                    }]
                }
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
            .state("about",{
                url:"/about",
                templateUrl:"html/about/about.html",
//                controllerUrl:"html/about/about",
                controller:"aboutCtr",
                data: { isPublic: true}
            })
    }]);
    app.controller("appCtr",['$scope','$rootScope','$http','logoutURL',"loocha","getLoginUserInfo",function($scope,$rootScope,$http,logoutURL,loocha,getLoginUserInfo){
        $scope.user = {
            islogin : false,
            name : "",
            search:""
        };
        $scope.isShow = false;
        $scope.user.name = sessionStorage.getItem("usernumber") ;

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
        });

        $scope.login = function(){
            var url =  window.location.hash.indexOf('hope');
            if(url>=0){
                $scope.isShow = true;
            }else{
                window.location.href = "#/login";
            }
        };

        $scope.close = function(){
            $scope.isShow = false;
        };

        $scope.logoff = function(){
            $http.get(loocha+logoutURL)
                .success(function(data,status){
                    $scope.user.islogin = false;
                    $rootScope.isFromDepth = false;
                    $scope.user.name ="";
                    sessionStorage.setItem('usernumber',"");
                    sessionStorage.setItem('uScore',"");
                    sessionStorage.setItem('user',JSON.stringify({"isAuthenticated": false}));
                    localStorage.removeItem("orderList");
                    localStorage.removeItem("depthbatch");
                    localStorage.removeItem("depthmoney");
                    window.location.href = "#/home";
                });
        };

        $scope.totalSearch = function(){
            window.location.href = "#/search/key="+$scope.user.search;
        };

    }]);
    app.controller("pageJumpCtr",["$scope","$window","getLoginUserInfo",function($scope,$window,getLoginUserInfo){

        $(".dropdown-menu li a").click(function(e){
            $(".dropdown").removeClass("open");
        });

        /**
         *
         * @param num 1 深度 2 推荐 3 预测
         */
        $scope.jumpPage = function(num){
            getLoginUserInfo.isLogoin();
            var uScore = sessionStorage.getItem("uScore");
            if(uScore != "" && uScore!=null ){
                var type =JSON.parse(uScore).type;
                if (num == 2){
                    $window.location.href = "#/hope/batch="+type+"&out_trade_no=";
                }else if (num == 3){
                    $window.location.href = "#/chance/batch="+type;
                }
            }else{
                if (num == 2){
                    $window.location.href = "#/hope/batch=0&out_trade_no=";
                }else if (num == 3){
                    $window.location.href = "#/chance/batch=0";
                }
            }
        };

        $scope.jumpDepth = function(num){
            $window.location.href = "#/depth/depthInfo/batch="+num;
            $window.location.reload(0);
        }
        setTimeout(function(){
            $("input").placeholder();
        },500);
    }]);
});