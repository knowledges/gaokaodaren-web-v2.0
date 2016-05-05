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
            inputTemplate : "",
            timer:"",
            schlName:"",
            departName:"",
            level:"",
            attr:"",
            flag:"",
            departprop:"",
            city:"",
            fee:"",
            charge:"",
            titleId:"",
            parentTitle:"",
            title:"",
            childTitle:"",
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
                $scope.money = localStorage.getItem("depthmoney");
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
                name=that.text().trim(),
                inputTemplate=that.attr("inputTemplate");

            $scope.condition.titleId = idx;
            $scope.condition.childTitle = name;
            $scope.condition.flag = flag;
            $scope.condition.money = money;
            var school = $scope.condition.schlName !="" ? $scope.condition.schlName :"";
            var depart = $scope.condition.departName !="" ? $scope.condition.departName :"";
            var sel = $scope.condition.level !="" ? $scope.condition.level:"";
            var city = $scope.condition.city !="" ? $scope.condition.city:"";
            var fee =  $scope.condition.fee !="" ? $scope.condition.fee:0;
            var year = $scope.condition.timer !="" ? $scope.condition.timer:2016;
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
                        if(data.length>0){
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

        $scope.showInfo = function(num){

            var school = $scope.condition.schlName !="" ? $scope.condition.schlName :"";
            var depart = $scope.condition.departName !="" ? $scope.condition.departName :"";
            var sel = $scope.condition.level !="" ? $scope.condition.level:"";
            var city = $scope.condition.city !="" ? $scope.condition.city:"";
            var fee =  $scope.condition.fee !="" ? $scope.condition.fee:0;
            var param = {};
            param.type = $location.$$url.split("batch=")[1];
            param.year = num;
            param.school = school;
            param.depart = depart;
            param.sel = sel;
            param.city = city;
            param.fee = fee;

            $http({
                method:'GET',
                url :loocha+"/depth/query/"+$scope.condition.titleId+".html",
                params:param
            }).success(function (data) {
                if(data.length>0){
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

        /**
         * 提交信息
         */
        $scope.subOrder = function(e){

            var list = $("input[type='checkbox']");

            angular.forEach(list,function(data,index,array){
                if($(data).is(":checked")){
                    var obj = new Object();
                    obj.id = $scope.condition.titleId;
                    obj.parentTitle = $scope.condition.parentTitle;
                    obj.title = $scope.condition.title;
                    obj.name = $scope.condition.childTitle;
                    obj.type = $location.$$url.split("batch=")[1];
                    obj.year = $(data).val();
                    obj.school = $scope.condition.schlName;
                    obj.depart = $scope.condition.departName;
                    obj.money = $scope.condition.money;
                    $scope.money+=($scope.condition.money/100);
                    $scope.orderList.push(obj);
                }
            });


            localStorage.setItem("orderList",JSON.stringify($scope.orderList));
            localStorage.setItem("depthbatch",$location.$$url.split("batch=")[1]);
            localStorage.setItem("depthmoney",$scope.money);
            $(".modal").hide();
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

            var type = $location.$$url.split("batch=")[1];
            var conditons = [];
            angular.forEach($scope.orderList,function(data){
                var obj = new Object();
                obj.id = data.id;
                obj.name = data.name;
                obj.type = data.type;
                obj.year = data.year;
                if(data.school !="" ){
                    obj.school = data.school;
                }
                if(data.depart != ""){
                    obj.depart = data.depart;
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
                            }else if (data.status == 4){
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
            openwin('#/pay?order_id=' + $scope.hope.order_id + '&money=' + $scope.hope.money + '&type=' + $scope.hope.batch);
            $('#modal-pay').modal('hide');
            $("#tip").modal('show');
        };

        $scope.isPay = function () {
            $http.get(loocha + '/exam/order/info?out_trade_no=' + $scope.hope.order_id)
                .success(function (data) {
                    if (data.status == "1004") {
                        alert('交易失败');
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
                $scope.condition.parentTitle = $(this).find("h4").text().trim();
                $(".panel-heading").next().removeClass("in");
                $(".panel-footer").next().hide();
                $(this).next().addClass("in").find(".panel-footer").bind("click",function(e){
                    $scope.condition.title = $(this).text().trim();
                    $(".panel-footer").next().hide();
                    $(this).next().show();
                    $(this).next().find("li").bind("click",function(e){
                    }).eq(0).trigger("click");
                });
            });
        });

    }]);
});