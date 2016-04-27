/**
 * Created by qbl on 2015/10/27.
 */
require(['app'],function(app){
    app.constant("orderInfoURL","/exam/order/info");
    app.directive('onFinishRender',["$rootScope",'$timeout',function($rootScope,$timeout){
        return {
            restrict: 'A',
            link:function(scope,element,attr){
                if(scope.$last == true){
                    $rootScope.loading = false;
                }
            }
        }
    }])
    app.controller('referCtr',['$scope','$location','$window','$http','$stateParams','loocha','getLoginUserInfo',function($scope,$location,$window,$http,$stateParams,loocha,getLoginUserInfo){

        $scope.order = {
                orderId:"",
                type:"",
                data:"",
                title:"普通高校招生考生志愿推荐表",
                subtitle:"",
                caption:"",
                name:"",
                number:"",
                city:"",
                area:"",
                requestId:"",
                orderShow:false,
                schlArr_0:[],
                schlArr_1:[],
                schlArr_2:[],
                schlArr_3:[],
                schlArr_4:[],
                departArr_0:[],
                departArr_1:[],
                departArr_2:[],
                departArr_3:[],
                departArr_4:[],
                flag:"",
                intentionId:"",

        };

        $scope.order.orderId = $location.$$search.orderId;
        $scope.order.type = $location.$$search.type;
        $scope.order.flag = $location.$$search.flag!=undefined?$location.$$search.flag:window.location.hash.split("type=")[1];
        $scope.order.title = $scope.order.flag == 2 ? "普通高校招生考生志愿推荐表":"普通高校招生考生志愿自选表";
        var yxb_title = [
            "",
            "【第一阶段填报文科类第一批本科院校志愿用表】",
            "【第一阶段填报理科类第一批本科院校志愿用表】",
            "【第一阶段填报文科类第二批本科院校志愿用表】",
            "【第一阶段填报理科类第二批本科院校志愿用表】",
            "【第二阶段填报文科类第三批本科院校志愿用表】",
            "【第二阶段填报理科类第三批本科院校志愿用表】",
            "【第二阶段填报文科类高职（专科）院校志愿用表】",
            "【第二阶段填报理科类高职（专科）院校志愿用表】"
        ];

        var caption = [
            "",
            "第一批本科平行院校志愿",
            "第一批本科平行院校志愿",
            "第二批本科平行院校志愿",
            "第二批本科平行院校志愿",
            "第三批本科平行院校志愿",
            "第三批本科平行院校志愿",
            "高职（专科）平行院校志愿",
            "高职（专科）平行院校志愿"
        ]

        init();

        $scope.print = function(){
            $("#footer").hide();
            var oper = 1;
            if (oper < 10) {
                var printHtml = $("#main").html();
                sprnstr = "<!--startprint" + oper + "-->";
                eprnstr = "<!--endprint" + oper + "-->";
                prnhtml = printHtml.substring(printHtml.indexOf(sprnstr) + 18);
                prnhtml = printHtml.substring(0, printHtml.indexOf(eprnstr));
                $("#main").html(prnhtml);
                window.print();
                window.location.reload();
            } else {
                window.print();
            }
        };

        /**
         * 获取下一份
         */
        $scope.getReference = function(){
            getNewOrderInfo();
        };
        /**
         * 获取下一份
         */
        $scope.getReference_1 = function(){
            var param = {};
            param.id =  $scope.order.intentionId;
            param.a = [];
            param.b = [];
            param.c = [];
            param.d = [];
            param.e = [];

            var tramsform = function (data) {
                return $.param(data);
            };

            $http.post(loocha + "/exam/intention/manual", param, {
                headers: {'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8'},
                transformRequest: tramsform
            }).success(function (responseDate) {
                $http.get(loocha + '/exam/' +responseDate.response.id ).success(function (data) {
                    if (data.status == 1) {
                        alert('没有找到订单');
                        return;
                    }
                    localStorage.setItem("type",$scope.order.type);
                    $scope.orderout_trade_no = data.response.order_id;
                    $scope.order.money = data.response.money;
                    $scope.order.orderShow = true;
                });
            });
        };

        $scope.payChance = function(){
            getLoginUserInfo.isLogoin();
            $scope.order.orderShow = false;
            window.location.href="#/pay?order_id="+$scope.orderout_trade_no+"&money="+$scope.order.money+"&type="+$scope.order.type;
        }

        $scope.close = function(){
            $scope.order.orderShow = false;
        };

        function init(){
            getLoginUserInfo.isLogoin();
            if($scope.order.flag == 4){
                $http.get(loocha + "/exam/order/info?out_trade_no=" +  $scope.order.orderId)
                    .success(function (data) {
                        if(flag == 4){
                            sessionStorage.setItem("admitFlag",data.response.admitFlag);
                            localStorage.setItem("type",data.response.type);
                            sessionStorage.setItem("order_id",data.response.orderId);
                            sessionStorage.setItem("admits",JSON.stringify(data.response.admits));
                            window.location.href = "#/chance";
                        }
                    });
                window.location.href="#/chance";
                window.location.reload(0);
            }else{
                $scope.order.subtitle = yxb_title[$scope.order.type];
                $scope.order.caption = caption [$scope.order.type];
                getOrderInfo();
            }
        }

        function getOrderInfo(){
            getLoginUserInfo.isLogoin();
            $http.get(loocha+"/exam/order/info?out_trade_no="+$scope.order.orderId)
                .success(function(data,status){
                    if(data.status== 2){
                        alert('订单不存在！');
                        $window.location.href="#/all/reference";
                        return;
                    }else if (data.status == "1016"){
                        localStorage.setItem("out_trade_no",$scope.order.orderId);
                        $window.location.href="#/refer1";
                        return;
                    }
                    $scope.order.intentionId = data.response.intentionId;
                    $scope.order.type = data.response.type;
                    $scope.order.name =data.response.name;
                    $scope.order.number =data.response.number;
                    $scope.order.city =data.response.city;
                    $scope.order.area =data.response.area;
                    $scope.order.data = data.response.list;
                    $scope.order.money = data.response.money;
                    $scope.order.schlArr_0 = data.response.list[0];
                    $scope.order.schlArr_1 = data.response.list[1];
                    $scope.order.schlArr_2 = data.response.list[2];
                    $scope.order.schlArr_3 = data.response.list[3];
                    $scope.order.schlArr_4 = data.response.list[4];
                    $scope.order.departArr_0 = data.response.list[0].departs;
                    $scope.order.departArr_1 = data.response.list[1].departs;
                    $scope.order.departArr_2 = data.response.list[2].departs;
                    $scope.order.departArr_3 = data.response.list[3].departs;
                    $scope.order.departArr_4 = data.response.list[4].departs;
                    $scope.order.requestId = data.response.intentionId;
                });
        }

        function getNewOrderInfo(){
            $.post(loocha+"/exam/intention/auto",{id:$scope.order.requestId},function(data){
                var list = JSON.parse(data),order_id = list.response.id;
                if(order_id == 0){
                    alert("订单提交失败，请重新操作");
                }else{
                    $http.get(loocha+'/exam/' + order_id).success(function (data) {
                        if(data.status == 1){
                            alert('没有找到订单');
                            return;
                        }
                        $scope.orderout_trade_no = data.response.order_id;
                        $scope.order.money = data.response.money;
                        $scope.order.orderShow = true;
                    });
                }
            });
        };

        $scope.showChance = function(){
            $("#chanced").modal('show');
        };

        $scope.showCase = function(){
            $http.get(loocha+"/exam/intention?out_trade_no="+$scope.order.orderId)
                .success(function(data){
                    var obj = data.response;
                    var preferOrders = obj.preferOrders,
                        preferSchoolNames = obj.preferSchoolNames,
                        preferDepartNames = obj.preferDepartNames,
                        preferCityNames = obj.preferCityNames,
                        preferPersonalityNames = obj.preferPersonalityNames;

                    caseModelScl (preferOrders,$scope.order.schlArr_0);
                    caseModelScl (preferOrders,$scope.order.schlArr_1);
                    caseModelScl (preferOrders,$scope.order.schlArr_2);
                    caseModelScl (preferOrders,$scope.order.schlArr_3);
                    caseModelScl (preferOrders,$scope.order.schlArr_4);

                    caseModel (preferOrders,$scope.order.departArr_0);
                    caseModel (preferOrders,$scope.order.departArr_1);
                    caseModel (preferOrders,$scope.order.departArr_2);
                    caseModel (preferOrders,$scope.order.departArr_3);
                    caseModel (preferOrders,$scope.order.departArr_4);

                    $scope.order.data[0] = $scope.order.schlArr_0;
                    $scope.order.data[1] = $scope.order.schlArr_1;
                    $scope.order.data[2] = $scope.order.schlArr_2;
                    $scope.order.data[3] = $scope.order.schlArr_3;
                    $scope.order.data[4] = $scope.order.schlArr_4;

                    $scope.order.data[0].departs = $scope.order.departArr_0;
                    $scope.order.data[1].departs = $scope.order.departArr_1;
                    $scope.order.data[2].departs = $scope.order.departArr_2;
                    $scope.order.data[3].departs = $scope.order.departArr_3;
                    $scope.order.data[4].departs = $scope.order.departArr_4;

                    $("#cased").modal('show');

                    function caseModelScl (array,newArray){

                        var preferArr = newArray.schoolPrefer.split(",");
                        newArray.cased =[];
                        newArray.str = "";
                        for(var i = 0;i<array.length;i++){

                            for(var k = 0 ; k < preferArr.length;k++){
                                if(array[i] == 1 && preferArr[i]>0 && k == 0){//高校
                                    var schl = preferSchoolNames[parseInt(preferArr[i])-1];
                                    newArray.cased.push(schl);
                                    newArray.str = newArray.str +"高校第"+preferArr[i]+"优先 "
                                /*}else if (array[i] == 2 && preferArr[i]>0 && k == 0){//专业
                                    var dept = preferDepartNames[parseInt(preferArr[i])-1];
                                    newArray[j].cased.push(dept);
                                    newArray[j].str = newArray[j].str +"专业第"+preferArr[i]+"优先 "*/
                                }else if (array[i] == 3 && preferArr[i]>0 && k == 0){//城市
                                    var city = preferCityNames[parseInt(preferArr[i])-1];
                                    newArray.cased.push(city);
                                    newArray.str = newArray.str +"城市第"+preferArr[i]+"优先 "
                                /*}else if (array[i] == 4 && preferArr[i]>0 && k == 0){//个性
                                    var per = preferPersonalityNames[parseInt(preferArr[i])-1];
                                    newArray[j].cased.push(per);
                                    newArray[j].str = newArray[j].str +"个性第"+preferArr[i]+"优先 "*/
                                }
                            }
                        }
                    }
                    function caseModel (array,newArray){
                        for(var j = 0 ;j < newArray.length;j++){

                            var preferArr = newArray[j].prefer.split(",");
                            newArray[j].cased =[];
                            newArray[j].str = "";
                            for(var i = 0;i<array.length;i++){

                                for(var k = 0 ; k < preferArr.length;k++){
                                    /*if(array[i] == 1 && preferArr[i]>0 && k == 0){//高校
                                        var schl = preferSchoolNames[parseInt(preferArr[i])-1];
                                        newArray[j].cased.push(schl);
                                        newArray[j].str = newArray[j].str +"高校第"+preferArr[i]+"优先 "
                                    }else */
                                    if (array[i] == 2 && preferArr[i]>0 && k == 0){//专业
                                        var dept = preferDepartNames[parseInt(preferArr[i])-1];
                                        newArray[j].cased.push(dept);
                                        newArray[j].str = newArray[j].str +"专业第"+preferArr[i]+"优先 "
                                   /* }else if (array[i] == 3 && preferArr[i]>0 && k == 0){//城市
                                        var city = preferCityNames[parseInt(preferArr[i])-1];
                                        newArray[j].cased.push(city);
                                        newArray[j].str = newArray[j].str +"城市第"+preferArr[i]+"优先 "*/
                                    }else if (array[i] == 4 && preferArr[i]>0 && k == 0){//个性
                                        var per = preferPersonalityNames[parseInt(preferArr[i])-1];
                                        newArray[j].cased.push(per);
                                        newArray[j].str = newArray[j].str +"个性第"+preferArr[i]+"优先 "
                                    }
                                }
                            }
                        }
                    }
                }) ;
        };

        $scope.showTipTitle = function(e){
            var x=0, y=0;
            if (document.all) {//IE
                x = (document.documentElement && document.documentElement.scrollLeft) ? document.documentElement.scrollLeft : document.body.scrollLeft;
                y = (document.documentElement && document.documentElement.scrollTop) ? document.documentElement.scrollTop : document.body.scrollTop;
                x += window.event.clientX;
                y += window.event.clientY;

            } else {//Good Browsers
                x = e.pageX;
                y = e.pageY;
            }
            var that = $(e.target),tip = that.attr("tiptitle");
            $("#qTip").empty().attr("style","left:"+ (x+e.offsetX)+"px!important;top:"+ (y+e.offsetY)+"px!important;").prepend(tip).show();
        };
        $scope.hideTipTitle = function(e){
            $("#qTip").hide();
        };
    }])
});
