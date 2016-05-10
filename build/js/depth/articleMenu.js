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
    app.controller('artCtr',["$scope",'$http','$sce','$stateParams','$location','$timeout','loocha','data_province','getLoginUserInfo',function($scope,$http,$sce,$stateParams,$location,$timeout,loocha,data_province,getLoginUserInfo){
        $scope.menuArr = [];
        $scope.orderList=[];
        $scope.menuInfoArr = [];
        $scope.money = 0;
        $scope.insertHTML="";
        $scope.condition={
            type:$location.$$url.split("batch=")[1],
            inputTemplate : "",
            timer:"",
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
        }
//        console.log($location.$$url.split("batch=")[1]);
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

        /**
         *  leaf: 1：代表根节点 0：不是根节点，且有子节点，子节点同理
         *  money: 大于0 收费
         *  inputTemplate 显示模板，1：年限 2：年限+学校名称 3：年限+专业名称
         * @param e
         */
        $scope.subClk = function(e){
            var that = $(e.target),
                flag = parseInt(that.attr("flag")),
                money = parseInt(that.attr("money")),
                leaf = parseInt(that.attr("leaf")),
                idx= parseInt(that.attr("idx")),
                name=that.attr("titles"),
                inputTemplate=that.attr("inputTemplate");
            if(idx == 65){
                alert(" 1.免费\n 2.请到志愿咨询栏目，高校介绍专题汇总中查询");
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
                /*直接展示的*/
                if(money<=0 && flag == 1){
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

                $scope.condition.inputTemplate = inputTemplate;
                $("#depthModal").show();
                //    TODO 所有参数都清空
                $("input[type='checkbox']").attr("checked",false);

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

        }

        $scope.close = function(){
            $("#recommend,#depthModal,#baikeModal").hide();
        };

        var _count = 0;
        /**
         * 提交信息
         */
        $scope.orderInfo = function(condition){
            var type = $location.$$url.split("batch=")[1];
            if($scope.condition.inputTemplate == "98" || $scope.condition.inputTemplate == "96"||$scope.condition.inputTemplate == "97"){
                addOrders(++_count,condition.titleId,condition.title,type,new Date().getFullYear()-1,condition.schlName,condition.departName,condition.money,condition.city,condition.subject,condition.count,condition.fee,condition.sel);
            }else if($scope.condition.inputTemplate == "8"||$scope.condition.inputTemplate == "9"|| $scope.condition.inputTemplate == "10" || $scope.condition.inputTemplate == "21"){
                addOrders(++_count,condition.titleId,condition.title,type,new Date().getFullYear()-1,condition.schlName,condition.departName,condition.money,condition.city,condition.subject,condition.count,condition.fee,condition.sel);
            }

            angular.forEach(condition.timer,function(i,v){
                if(i != undefined && i == true){
                    var year = 0;
                    switch (parseInt(v)){
                        case 0:
                            year = 2012;
                            break;
                        case 1:
                            year = 2013;
                            break;
                        case 2:
                            year = 2014;
                            break;
                    }
                    addOrders(++_count,condition.titleId,condition.title,type,year,condition.schlName,condition.departName,condition.money,condition.city,condition.subject,condition.count,condition.fee,condition.sel);
                }
            });

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

                    addOrders(++_count,condition.titleId,condition.title,type,new Date().getFullYear()-1,condition.schlName,condition.departName,condition.money,condition.city,condition.subject,condition.count,condition.fee,sel);
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
                    addOrders(++_count,condition.titleId,condition.title,type,new Date().getFullYear()-1,condition.schlName,condition.departName,condition.money,condition.city,condition.subject,condition.count,fee,condition.sel);
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

                    addOrders(++_count,condition.titleId,condition.title,type,new Date().getFullYear()-1,condition.schlName,condition.departName,condition.money,condition.city,condition.subject,count,condition.fee,condition.sel);
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
                            subject  = "美术";
                            break;
                        case 2:
                            subject  = "艺术";
                            break;
                        case 3:
                            subject  = "高水平运动员";
                            break;
                    }

                    addOrders(++_count,condition.titleId,condition.title,type,new Date().getFullYear()-1,condition.schlName,condition.departName,condition.money,condition.city,subject,condition.count,condition.fee,condition.sel);
                }
            });

            localStorage.setItem("orderList",JSON.stringify($scope.orderList));
            localStorage.setItem("depthmoney",$scope.money);

            $(".modal").hide();
            $scope.condition.timer=[];
            $scope.condition.titleId = $scope.condition.title=$scope.condition.schlName=$scope.condition.departName = $scope.condition.money = $scope.condition.sel = $scope.condition.subject= $scope.condition.city= $scope.condition.fee= $scope.condition.count="";

            function addOrders(id,titleId,title,type,year,schoolname,departname,money,city,subject,count,fee,sel){
                debugger;
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
                                $scope.hope.order_id = data.response.order_id;
                                $scope.hope.money = data.response.money;
                                $('#modal-pay').modal('show');
                                localStorage.removeItem("orderList");
                                localStorage.removeItem("depthbatch");
                                localStorage.removeItem("depthmoney");
                            }
                        });
                });
        };

        $scope.pay = function () {
            openwin('#/pay?order_id=' + $scope.hope.order_id + '&money=' + $scope.hope.money + '&type=' + $location.$$url.split("batch=")[1]);
            $('#modal-pay').modal('hide');
            $("#tip").modal('show');
        };

        $scope.isPay = function () {
            $http.get(loocha + '/exam/order/info?out_trade_no=' + $scope.hope.order_id)
                .success(function (data) {
                    if (data.status == "1004") {
                        alert('交易失败');
                    }else if(data.status == "0"){
                        localStorage.removeItem("orderList");
                        localStorage.removeItem("depthmoney");
                        window.location.reload(0);
                    }
                    $("#tip").modal('hide');
                });
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

    }]);
});