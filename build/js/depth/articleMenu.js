/**
 * Created by Administrator on 2016/3/29.
 */
'use strict';
require(['app'],function(app){
    app.directive('doclk',[function(){
        return function(scope,element,attrs){
            element.find('li').bind('click',function(e){
                var idx = $(this).attr('idx');
                if(idx == 1){
                    element.find('li').removeClass('active');
                    $(this).addClass('active');
                    $("#menu").show(500, function () {
                        $("#menu-infolist").hide();
                    });
                }
            });
        }
    }]);
    app.directive("onFinishRender",['$timeout',function($timeout){
        return {
            restrict: 'A',
            link: function (scope, element, attr) {
                if (scope.$last === true) {
                    $timeout(function () {
                        scope.$emit(attr.onFinishRender);
                    });
                }
            }
        }
    }]);
    app.controller('artCtr',["$scope",'$http','$sce','$stateParams','$window','$location','$timeout','loocha','data_province','getLoginUserInfo',function($scope,$http,$sce,$stateParams,$window,$location,$timeout,loocha,data_province,getLoginUserInfo){
        $scope.menuArr = [];
        $scope.orderList=[];
        $scope.menuInfoArr = [];
        $scope.money = 0;
        $scope.insertHTML="";
        $scope.condition={
            type:$location.$$url.split("batch=")[1],
            inputTemplate : "",
            timer:"",
            code:"",
            schlName:"",
            departName:"",
            level:"",
            attr:"",
            flag:"",
            count:"",
            subject:"",
            departprop:"",
            city:"",
            fee:"",
            sel:"",
            charge:"",
            titleId:"",
            title:"",
            innserTHML:"",
            provincelist:"",
            departproplist:[],
            money:""
        };
        $scope.hope = {
            order_id : "",
            money :""
        };

        $scope.search = "";
        $scope.searchSchool = "";

        init();

        function init(){
            localStorage.setItem("depthbatch",$location.$$url.split("batch=")[1]);
            $("#depthModal").show();
            $scope.condition.provincelist=data_province.data.response.list;
            //$("#recommend").show();
            var url ="";
            if($scope.condition.type<7){
                url="/depart/prop?type=0&depart_type=0";
            }else{
                url="/depart/prop?type=0&depart_type=1";
            }
            $http.get(loocha+url)
                .success(function(data){
                    $.each(data.response, function (i, v) {
                        if ($scope.condition.type<7 && i<13) {
                            $scope.condition.departproplist.push(v);
                        }else if(i<19){
                            $scope.condition.departproplist.push(v);
                        }
                    });
                });

            $(document).unbind('click').click(function (e) {
                e = window.event || e;
                var obj = $(e.srcElement || e.target);
                if (!$(obj).is('.spanClk')) {
                    $(".newNav ul li ul").hide();
                }
            });

            if(localStorage.getItem("orderList") != null && localStorage.getItem("orderList")!=""){
                $scope.orderList = JSON.parse(localStorage.getItem("orderList"));
                $scope.money = parseInt(localStorage.getItem("depthmoney"));
            }

        }

        $http.get(loocha+"/depth/query")
            .success(function(data){
                $scope.menuArr = data.response;
            });

//////////////click////////////////////////////////////////////////////////////////////////////////////////////////////
        $scope.findMenuInfo = function(idx){
            $scope.menuInfoArr=  $scope.menuArr[idx-1].sublist;
            $("#doc li").removeClass('active').eq(1).addClass('active');
            $("#menu").hide();
            $("#menu-infolist").show(500);
        };

        $scope.filterClk = function(){
            $("#depthModal input[type='text']").removeAttr('disabled');
        }
        /**
         *  leaf: 1：代表根节点 0：不是根节点，且有子节点，子节点同理
         *  money: 大于0 收费
         *  inputTemplate 显示模板，1：年限 2：年限+学校名称 3：年限+专业名称
         * @param e
         */
        $scope.subClk = function(e){
            $("#depathTHML").empty().prepend('<h2 class="text-content">请选择查询内容</h2>');
            $("#condition").hide();
            var that = $(e.target),
                flag = parseInt(that.attr("flag")),
                money = parseInt(that.attr("money")),
                leaf = parseInt(that.attr("leaf")),
                idx= parseInt(that.attr("idx")),
                name=that.attr("titles"),
                inputTemplate=that.attr("inputTemplate");

            if (idx == 198){
                $(".list-group-item").removeClass("active");
                that.addClass("active");
                alert("该批次中没有此内容");
                return;
            }

            if($scope.condition.type == 1){
                if(idx >= 95 && idx<=96){
                    $(".list-group-item").removeClass("active");
                    that.addClass("active");
                    alert("该批次中没有此内容");
                    return;
                }
            }

            if($scope.condition.type >= 3 && $scope.condition.type <= 4 ){
                if(idx >= 95 && idx<=97){
                    $(".list-group-item").removeClass("active");
                    that.addClass("active");
                    alert("该批次中没有此内容");
                    return;
                }
            }

            if($scope.condition.type >= 5 &&$scope.condition.type <= 6 ){
                if(idx >= 29 && idx<=36){
                    $(".list-group-item").removeClass("active");
                    that.addClass("active");
                    alert("该批次中没有此内容");
                    return;
                }else if (idx ==193||idx ==194){
                    $(".list-group-item").removeClass("active");
                    that.addClass("active");
                    alert("该批次中没有此内容");
                    return;
                }
            }

            if($scope.condition.type >= 5){
                if(idx >= 94 && idx<=97){
                    $(".list-group-item").removeClass("active");
                    that.addClass("active");
                    alert("该批次中没有此内容");
                    return;
                }

                if(idx == 74 || idx == 145 || idx == 168){
                    $(".list-group-item").removeClass("active");
                    that.addClass("active");
                    alert("该批次中没有此内容");
                    return;
                }
            }
            if($scope.condition.type >= 7){
                if(idx == 76 || idx == 170){
                    $(".list-group-item").removeClass("active");
                    that.addClass("active");
                    alert("该批次中没有此内容");
                    return;
                }
            }
            if(idx == 65 || idx == 136){
                $(".list-group-item").removeClass("active");
                that.addClass("active");
                alert(" 1.免费\n 2.请到志愿咨询栏目，高校介绍专题汇总中查询");
                return;
            }

            if(idx == 236){
                $(".list-group-item").removeClass("active");
                that.addClass("active");
                alert('数据还在筹备中');
                return;
            }
            $scope.condition.titleId = idx;
            $scope.condition.title = name;
            $scope.condition.flag = flag;
            $scope.condition.money = money;
            var school = $scope.condition.schlName !="" ? $scope.condition.schlName :"";
            var depart = $scope.condition.departName !="" ? $scope.condition.departName :"";
            var sel = $scope.condition.level !="" ? $scope.condition.level:"";
            var city = $scope.condition.city !="" ? $scope.condition.city:"";
            var fee =  $scope.condition.fee !="" ? $scope.condition.fee:0;
            var year = $scope.condition.timer !="" ? $scope.condition.timer: new Date().getFullYear()-1;
            $(".list-group-item").removeClass("active");

            if(leaf == 0){
                $(".list-group-childul").attr("style","display:none");
                $timeout(function(){//通过$timeout 解决trigger("click") 全局污染的问题
                    $(that).find('ul').attr("style","display:black").find("li").bind("click",function(e){
                    }).eq(0).trigger("click");
                },0,false);
            }else{
                that.addClass("active");
                if (idx == 108 || idx == 150 ){
                    alert(" 该内容同： \n 分数分析深度查询目录下 \n （二）从考生考分在全省排名角度的深度查询中\n  1、近三年高校录取最低分排序表");
                }else if (idx == 109 || idx == 151 ){
                    alert(" 该内容同： \n 分数分析深度查询目录下 \n （二）从考生考分在全省排名角度的深度查询中\n  2、近三年高校录取中点分排序表");
                }else if (idx == 110 || idx == 152){
                    alert(" 该内容同： \n 分数分析深度查询目录下 \n （二）从考生考分在全省排名角度的深度查询中\n  3、近三年高校录取最高分排序表");
                }else if(idx == 49){
                    alert(" 该内容同： \n 分数分析深度查询目录下 \n （三）压线考分考生的深度查询中\n  1、近三年高校录取分数线比省控线高3分的高校");
                }else if(idx == 48){
                    alert(" 该内容同： \n 分数分析深度查询目录下 \n（三）压线考分考生的深度查询中\n  2、近三年高校录取分数线比省控线高2分的高校");
                }else if (idx == 47){
                    alert(" 该内容同： \n 分数分析深度查询目录下 \n（三）压线考分考生的深度查询中\n  3、近三年高校录取分数线比省控线高1分的高校");
                }else if (idx == 46){
                    alert(" 该内容同： \n 分数分析深度查询目录下 \n（三）压线考分考生的深度查询中\n  4、近三年高校录取分数线等于省控线的高校");
                }else if (idx == 45){
                    alert(" 该内容同： \n 分数分析深度查询目录下 \n（三）压线考分考生的深度查询中\n  5、近三年降分录取高校");
                }else if (idx == 43 || idx == 147){
                    alert(" 该内容同： \n 分数分析深度查询目录下 \n（三）压线考分考生的深度查询中\n  6、近三年一次录取人数不足（通过征求志愿录取）的高校、专业");
                }else if (idx == 44 || idx == 104  || idx == 105 || idx == 148){
                    alert(" 该内容同： \n 分数分析深度查询目录下 \n（三）压线考分考生的深度查询中\n  7、近三年征求志愿录取人数不足（通过服从录取）的高校、专业");
                }else if (idx == 106 || idx == 149 || idx == 33) {
                    alert(" 该内容同： \n 分数分析深度查询目录下 \n（三）压线考分考生的深度查询中\n  8、近三年服从志愿录取人数不足（降分录取）的高校、专业");
                }else if (idx == 63 || idx == 102|| idx == 141){
                    alert(" 该内容同： \n 招生政策深度查询目录下 \n（一）平行志愿投档规则深度查询中\n 1、选科等级要求分类统计");
                }else if (idx == 78){
                    alert(" 该内容同： \n 招生政策深度查询目录下 \n（二）进档考生录取规则深度查询中\n 8、按专业录取附加条件分类统计");
                }else if (idx == 86){
                    alert(" 该内容同： \n 招生计划深度查询目录下 \n （一）按高校深度查询中\n  2、各高校近三年招生计划对比表");
                }else if (idx == 111){
                    alert(" 该内容同： \n 招生计划深度查询目录下 \n （一）按高校深度查询中\n  7、在江苏招生仅三年的高校");
                }else if (idx == 112){
                    alert(" 该内容同： \n 招生计划深度查询目录下 \n （一）按高校深度查询中\n  6、在江苏招生仅两年的高校");
                }else if (idx == 113){
                    alert(" 该内容同： \n 招生计划深度查询目录下 \n （一）按高校深度查询中\n  5、在江苏新招生的高校");
                }else if (idx == 137){
                    alert(" 该内容同： \n 招生计划深度查询目录下 \n （一）按高校深度查询中\n 4、高校行业归类统计");
                }else if (idx == 142){
                    alert(" 该内容同： \n 招生计划深度查询目录下 \n （一）按高校深度查询中\n 2、高校近三年招生计划对比表");
                }else if (idx == 123){
                    alert(" 该内容同： \n 招生计划深度查询目录下 \n （二）按专业深度查询中\n  10、高校在江苏招生仅三年的专业");
                }else if (idx == 124){
                    alert(" 该内容同： \n 招生计划深度查询目录下 \n （二）按专业深度查询中\n  9、高校在江苏招生仅两年的专业");
                }else if (idx == 125){
                    alert(" 该内容同： \n 招生计划深度查询目录下 \n （二）按专业深度查询中\n  8、高校在江苏第一次招生的专业");
                }else if (idx == 171) {
                    alert(" 该内容同： \n 招生计划深度查询目录下 \n （二）按专业深度查询中\n 6、专业录取要求满足本校自测条件或本校招生章程的高校、专业");
                }else if(idx == 167||idx == 144){
                    alert(" 该内容同： \n 招生计划深度查询目录下 \n （二）按专业深度查询中\n 2、按大类招生的高校、专业");
                }else if(idx == 168||idx == 145){
                    alert(" 该内容同： \n 招生计划深度查询目录下 \n （二）按专业深度查询中\n 3、招收试验班（预科班、基地班）的高校、专业");
                }else if(idx == 169||idx == 146 ){
                    alert(" 该内容同： \n 招生计划深度查询目录下 \n （二）按专业深度查询中\n 4、招收中外合作办学班的高校、专业");
                }else if(idx == 170 || idx == 197 || idx == 199 || idx == 200){
                    alert(" 该内容同： \n 招生计划深度查询目录下 \n （二）按专业深度查询中\n 5、专业录取加试的高校、专业");
                }else if(idx == 172){
                    alert(" 该内容同： \n 招生计划深度查询目录下 \n （二）按专业深度查询中\n 7、专业录取的附加条件归类");
                }else if(idx == 185){
                    alert(" 该内容同： \n 招生计划深度查询目录下 \n （三）按城市深度查询中\n 1、各城市在江苏省招生的高校");
                }else if(idx == 186){
                    alert(" 该内容同： \n 招生计划深度查询目录下 \n （三）按城市深度查询中\n 2、各城市在江苏省招生的专业");
                }else if (idx == 143){
                    alert(" 该内容同： \n 资料汇编深度查询目录下 \n （一）按高校深度查询中\n 6、近三年高校招生录取情况录取数对比");
                }else if (idx == 153 || idx == 178){
                    alert(" 该内容同： \n 资料汇编深度查询目录下 \n （二）按专业深度查询中\n 5、近三年各高校录取专业排序");
                }else if (idx == 174){
                    alert(" 该内容同： \n 资料汇编深度查询目录下 \n （二）按专业深度查询中\n 1、近三年相同专业录取的高校录取数对比（排序）");
                }else if (idx == 175){
                    alert(" 该内容同： \n 资料汇编深度查询目录下 \n （二）按专业深度查询中\n 2、近三年相同专业录取的高校最低分排序");
                }else if (idx == 176){
                    alert(" 该内容同： \n 资料汇编深度查询目录下 \n （二）按专业深度查询中\n 3、近三年相同专业录取的高校中点分排序");
                }else if (idx == 177) {
                    alert(" 该内容同： \n 资料汇编深度查询目录下 \n （二）按专业深度查询中\n 4、近三年相同专业录取的高校最高分排序");
                }else if (idx == 188){
                    alert(" 该内容同： \n 资料汇编深度查询目录下 \n （三）按城市深度查询中\n 3、近三年各城市在江苏录取考生的人数排序");
                }else if (idx == 189){
                    alert(" 该内容同： \n 资料汇编深度查询目录下 \n （三）按城市深度查询中\n 1、近三年各城市在江苏录取考生的高校（按录取数排序）");
                }else if (idx == 190){
                    alert(" 该内容同： \n 资料汇编深度查询目录下 \n （三）按城市深度查询中\n 2、近三年各城市在江苏录取考生的专业（按录取数排序）");
                }
                $scope.condition.inputTemplate = inputTemplate;
                /*直接展示的*/
                if(money<=0){

                    if(idx >= 132 && idx <=135){
                        $("#baikeModal").show();
                        return;
                    }else if (idx >=160&&idx<=163){
                        $("#baikeModal").show();
                        return;
                    }

                    var param = {};
                    param.type = $location.$$url.split("batch=")[1];
                    param.year = year;
                    param.school = school;
                    param.depart = depart;
                    param.sel = sel;
                    param.city = city;
                    param.fee = fee;

                    $http({
                        method:'GET',
                        url :loocha+"/depth/query/"+idx+".html",
                        params:param
                    }).success(function (data) {
                        if(data.status == "-1" || data.status == "4"){
                            alert("需要登录请登录");
                            window.location.href="#/login";
                        }else if(data.length>0){
                            $("#depathTHML").empty().prepend(data);
                        }else{
                            $("#depathTHML").empty().prepend('<h2 class="text-content">数据还在筹备中....</h2>');
                        }

                        $("#condition").hide();
                        $scope.condition.level="";
                    });
                    return ;
                }

                //$scope.condition.inputTemplate = inputTemplate;

                if(idx >= 132 && idx <=135){
                    $("#baikeModal").show();
                }else if (idx >=160&&idx<=163){
                    $("#baikeModal").show();
                }else{
                    $("#depthModal").show();
                }
                //    TODO 所有参数都清空
                $("input[type='radio']").attr("checked",false);

            }
            e.stopPropagation();
        };

        $scope.showInfo = function(num,type){

            var school = $scope.condition.schlName !="" ? $scope.condition.schlName :"";
            var depart = $scope.condition.departName !="" ? $scope.condition.departName :"";
            var sel = $scope.condition.level !="" ? $scope.condition.level:"";
            var city = $scope.condition.city !="" ? $scope.condition.city:"";
            var fee =  $scope.condition.fee !="" ? $scope.condition.fee:0;
            var param = {};
            param.type = $location.$$url.split("batch=")[1];
            if(type==0){
                param.year = num;
            }
            param.school = school;
            param.depart = depart;
            if(type == 3){
                param.sel = num;
                param.year = 2015;
            }
            param.city = city;
            param.fee = fee;

            $http({
                method:'GET',
                url :loocha+"/depth/query/"+$scope.condition.titleId+".html",
                params:param
            }).success(function (data) {
                if(data.status == "-1" || data.status == "4"){
                    alert("需要登录请登录");
                    window.location.href="#/login";
                }else if(data.length>0){
                    $("#depathTHML").empty().prepend(data);
                }else{
                    $("#depathTHML").empty().prepend('<h2 class="text-content">数据还在筹备中....</h2>');
                }
                $("#condition").hide();
                $scope.close();
                $scope.condition.level="";
            });

        };

        $scope.baikeClk = function(){
            var url ="http://baike.baidu.com/item/";
            if($scope.condition.departName !=""){
                var str = $scope.condition.departName.split("(")[0];
                url ="http://baike.baidu.com/item/"+str;
            }
            if($scope.condition.schlName !=""){
                var str = $scope.condition.schlName.split("(")[0];
                url ="http://baike.baidu.com/item/"+str;
            }
            openwin(url);

            //$timeout(function(){
            //    $scope.condition.departName=$scope.condition.schlName="";
            //},500);
        };

        $scope.close = function(){
            $("#recommend,#depthModal,#baikeModal").hide();
            $scope.condition.timer=$scope.condition.titleId = $scope.condition.title=$scope.condition.schlName=$scope.condition.departName = $scope.condition.money = $scope.condition.sel = $scope.condition.subject= $scope.condition.city= $scope.condition.fee= $scope.condition.count= $scope.condition.code=$scope.search=$scope.searchSchool="";
        };

        var _count = 0;
        /**
         * 提交信息
         */
        $scope.orderInfo = function(condition){
            var type = $location.$$url.split("batch=")[1];
            var year = 2016;
            if(condition.titleId>=60&&condition.titleId<=100){
                year = "";
            }
            if($scope.condition.inputTemplate == "98" || $scope.condition.inputTemplate == "96"||$scope.condition.inputTemplate == "97"){
                addOrders(++_count,condition.titleId,condition.title,type,"",condition.code,condition.schlName,condition.departName,condition.money,condition.city,condition.subject,condition.count,condition.fee,condition.sel);
            }else if($scope.condition.inputTemplate == "8"||$scope.condition.inputTemplate == "9"|| $scope.condition.inputTemplate == "10" || $scope.condition.inputTemplate == "21"){
                addOrders(++_count,condition.titleId,condition.title,type,year,condition.code,condition.schlName,condition.departName,condition.money,condition.city,condition.subject,condition.count,condition.fee,condition.sel);
                //addOrders(++_count,condition.titleId,condition.title,type,"",condition.schlName,condition.departName,condition.money,condition.city,condition.subject,condition.count,condition.fee,condition.sel);
            }else if($scope.condition.inputTemplate == "0"||$scope.condition.inputTemplate == "1"||$scope.condition.inputTemplate == "2"||$scope.condition.inputTemplate == "24"){
                addOrders(++_count,condition.titleId,condition.title,type,condition.timer,condition.code,condition.schlName,condition.departName,condition.money,condition.city,condition.subject,condition.count,condition.fee,condition.sel);
            }

            angular.forEach(condition.sel,function(i,v){
                if(i != undefined && i == true){
                    var sel ="";
                    switch (parseInt(v)){
                        case 0:
                            sel  = "A+A+";
                            break;
                        case 1:
                            sel  = "A+A";
                            break;
                        case 2:
                            sel  = "AA";
                            break;
                        case 3:
                            sel  = "AB+";
                            break;
                        case 4:
                            sel  = "AB";
                            break;
                        case 5:
                            sel  = "B+B+";
                            break;
                        case 6:
                            sel  = "B+B";
                            break;
                        case 7:
                            sel  = "BB";
                            break;
                        case 8:
                            sel  = "BC";
                            break;
                        case 9:
                            sel  = "CC";
                            break;
                        case 10:
                            sel  = "CD";
                            break;
                        case 11:
                            sel  = "不要求";
                            break;
                        case 12:
                            sel  = "AC";
                            break;
                    }

                    addOrders(++_count,condition.titleId,condition.title,type,"",condition.code,condition.schlName,condition.departName,condition.money,condition.city,condition.subject,condition.count,condition.fee,sel);
                }
            });

            angular.forEach(condition.fee,function(i,v){
                if(i != undefined && i == true){
                    var fee ="";
                    switch (parseInt(v)){
                        case 0:
                            fee  = "2";
                            break;
                        case 1:
                            fee  = "3";
                            break;
                        case 2:
                            fee  = "4";
                            break;
                        case 3:
                            fee  = "5";
                            break;
                    }
                    addOrders(++_count,condition.titleId,condition.title,type,"",condition.code,condition.schlName,condition.departName,condition.money,condition.city,condition.subject,condition.count,fee,condition.sel);
                }
            });

            angular.forEach(condition.count,function(i,v){
                if(i != undefined && i == true){
                    var count ="";
                    switch (parseInt(v)){
                        case 0:
                            count  = "1";
                            break;
                        case 1:
                            count  = "2";
                            break;
                        case 2:
                            count  = "3";
                            break;
                        case 3:
                            count  = "4";
                            break;
                        case 4:
                            count  = "5";
                            break;
                        case 5:
                            count  = "6";
                            break;
                    }

                    addOrders(++_count,condition.titleId,condition.title,type,"",condition.code,condition.schlName,condition.departName,condition.money,condition.city,condition.subject,count,condition.fee,condition.sel);
                }
            });

            angular.forEach(condition.subject,function(i,v){
                if(i != undefined && i == true){
                    var subject ="";
                    switch (parseInt(v)){
                        case 0:
                            subject  = "(口)";
                            break;
                        case 1:
                            subject  = "艺术";
                            break;
                        case 2:
                            subject  = "美术";
                            break;
                        case 3:
                            subject  = "高水平运动员";
                            break;
                    }

                    addOrders(++_count,condition.titleId,condition.title,type,"",condition.code,condition.schlName,condition.departName,condition.money,condition.city,subject,condition.count,condition.fee,condition.sel);
                }
            });
            localStorage.setItem("orderList",JSON.stringify($scope.orderList));
            localStorage.setItem("depthmoney",$scope.money);

            $(".modal").hide();
            $scope.condition.timer=$scope.condition.titleId = $scope.condition.title=$scope.condition.schlName=$scope.condition.departName = $scope.condition.money = $scope.condition.sel = $scope.condition.subject= $scope.condition.city= $scope.condition.fee= $scope.condition.count= $scope.condition.code=$scope.search=$scope.searchSchool="";

            function addOrders(id,titleId,title,type,year,code,schoolname,departname,money,city,subject,count,fee,sel){
                var isTrue = true;
                angular.forEach($scope.orderList,function(v,i){
                    /*TODO 如果好批次有关 就要把type 加上*/
                    if(v.titleId == titleId && v.year == year && v.school == schoolname && v.depart == departname && v.city == city && v.subject == subject && v.count == count && v.fee == fee && v.sel == sel){
                        alert("该选项已存在订单中");
                        isTrue = false;
                    }
                });
                if(isTrue){
                    var obj = new Object();
                    obj.id = id;
                    obj.titleId = titleId;
                    obj.name = title;
                    obj.type = type;
                    obj.year = year;
                    obj.code = code;
                    obj.school = schoolname;
                    obj.depart = departname;
                    obj.money = money;
                    obj.city = city;
                    obj.subject = subject;
                    obj.count = count;
                    obj.fee =  fee;
                    obj.sel = sel;
                    $scope.money+=(money/100);
                    $scope.orderList.push(obj);
                }
            };
        };

        /**
         *  移除 orderList 内容
         * @param idx
         */
        $scope.remClk = function(idx){
            $scope.money  -= ($scope.orderList[idx].money/100);
            $scope.orderList.splice(idx,1);
            localStorage.setItem("orderList",JSON.stringify($scope.orderList));
        };

        /**
         * 去缴费
         */
        $scope.payOrder = function(){
            getLoginUserInfo.isLogoin();
            var conditons = [];
            var type = $location.$$url.split("batch=")[1];
            angular.forEach($scope.orderList,function(data){
                var obj = new Object();
                obj.id = data.titleId;
                obj.name = data.name;
                obj.type = data.type;
                obj.year = data.year;
                if(data.school != undefined && data.school !="" ){
                    obj.code = data.code;
                    obj.school = data.school;
                }
                if(data.depart != undefined && data.depart != ""){
                    obj.depart = data.depart;
                }
                if(data.city != undefined && data.city !=""){
                    obj.city = data.city;
                }
                if(data.subject != undefined && data.subject != ""){
                    obj.subject = data.subject;
                }
                if(data.fee != undefined && data.fee!=""){
                    obj.fee = data.fee;
                }
                if(data.count != undefined && data.count!=""){
                    obj.count = data.count;
                }
                if(data.sel != undefined && data.sel!=""){
                    obj.sel = data.sel;
                }
                conditons.push(obj);
            });

            /*var tramsform = function (data) {
             return $.param(data);
             };*/
            $http.post(loocha+"/depth/query/"+type+"/condition", JSON.stringify(conditons))
                .success(function (data) {
                    $http.get(loocha + '/exam/' +data.response.id )
                        .success(function (data) {
                            if (data.status == 1) {
                                alert('没有找到订单');
                                return;
                            }else if (data.status == 4||data.status == "-1"){
                                alert('您还没有登陆，先去登陆吧！');
                                window.location.href = "#/login";
                                return;
                            }else if (data.status == 0){
                                var lists = data.response;

                                $http.get(loocha+"/user?t="+new Date().getTime().toString())
                                    .success(function(data){
                                        var users = data.response;
                                        if(users.free == 2){
                                            if(users.remain<lists.money){
                                                alert("该注册号余额已不足支付，请联系：13914726090");
                                            }else{
                                                $scope.hope.order_id = lists.order_id;
                                                $scope.hope.money = $scope.money = lists.money;
                                                $('#modal-pay').show();
                                                localStorage.removeItem("orderList");
                                                localStorage.removeItem("depthbatch");
                                                localStorage.removeItem("depthmoney");
                                            }
                                        }else{
                                            $scope.hope.order_id = lists.order_id;
                                            $scope.hope.money = lists.money;
                                            $('#modal-pay').show();
                                            localStorage.removeItem("orderList");
                                            localStorage.removeItem("depthbatch");
                                            localStorage.removeItem("depthmoney");
                                        }
                                    });
                            }
                        });
                });
        };

        $scope.pay = function () {
            openwin('#/pay?order_id=' + $scope.hope.order_id + '&money=' + $scope.hope.money + '&type=' + $location.$$url.split("batch=")[1]);
            $('#modal-pay').hide();
            $("#tip").show();
        };

        $scope.isPay = function () {
            $http.get(loocha + '/exam/order/info?out_trade_no=' + $scope.hope.order_id)
                .success(function (data) {
                    if (data.status == "1004") {
                        alert('交易失败');

                    }else if(data.status == "0"){
                        localStorage.removeItem("orderList");
                        localStorage.removeItem("depthmoney");

                    }
                    window.location.reload(0);
                    $("#tip").hide();
                });
        };
        $scope.closed = function(){
            $("#tip,#modal-pay").hide();
            $scope.condition.timer=$scope.condition.titleId = $scope.condition.title=$scope.condition.schlName=$scope.condition.departName = $scope.condition.money = $scope.condition.sel = $scope.condition.subject= $scope.condition.city= $scope.condition.fee= $scope.condition.count= $scope.condition.code=$scope.search=$scope.searchSchool="";
        };

        function openwin(url) {
            var a = document.createElement("a");
            a.setAttribute("href", url);
            a.setAttribute("target", "_blank");
            a.setAttribute("id", "openwin");
            document.body.appendChild(a);
            a.click();
        }

        $scope.$on("depthmenu", function (ngRepeatFinishedEvent) {
            $(".panel-heading").unbind("click").click(function(e){
                //$scope.condition.parentTitle = $(this).find("h4").attr("titles");
                $(".panel-heading").next().removeClass("in");
                $(".panel-footer").next().hide();
                $(this).next().addClass("in").find(".panel-footer").bind("click",function(e){
                    //$scope.condition.title = $(this).attr("titles");
                    $(".panel-footer").next().hide();
                    $(this).next().show();
                    $(this).next().find("li").bind("click",function(e){
                    }).eq(0).trigger("click");
                });
            });
        });


        $scope.$watch('condition.schlName',function(newvalue,oldvalue){
            if(newvalue!="" && newvalue!=oldvalue){

                $http.get(loocha+"/school/search?index=0&key="+encodeURI($scope.condition.schlName)+"&limit=10&type="+$scope.condition.type+"&t="+( new Date() ).getTime().toString())
                    .success(function(data){
                        $scope.searchSchool = data.response.list;
                    });

            }else{
                $scope.condition.schlName = "";
            }
        });

        $scope.$watch('condition.departName',function(newvalue,oldvalue){
            if(newvalue!="" && newvalue!=oldvalue){

                $http.get(loocha+"/departlist/marjor?type="+$scope.condition.type+"&marjorname="+encodeURI($scope.condition.departName)+"&year="+$scope.condition.timer+"&t="+( new Date() ).getTime().toString())
                    .success(function(data){
                        $scope.search = data.response;
                    });

            }else{
                $scope.condition.departName = "";
            }
        });

        $scope.schoolDisplace = function(obj){
            $scope.condition.code = obj.unique_id;
            $scope.condition.schlName = obj.name;
        };

        $scope.departDisplace = function(obj){
            $scope.condition.departName = obj.name;
        }

    }]);
});