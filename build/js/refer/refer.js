/**
 * Created by qbl on 2015/10/27.
 */
require(['app'],function(app){
    app.constant("orderInfoURL","/exam/order/info")
    app.controller('referCtr',['$scope','$location','$window','$http','loocha',function($scope,$location,$window,$http,loocha){

        $scope.order = {
                orderId:"",
                type:"",
                data:"",
                title:"普通高校招生考生志愿参考表",
                subtitle:"",
                caption:"",
                name:"",
                number:"",
                city:"",
                area:"",
                requestId:"",
                orderShow:false,
                departArr_0:[],
                departArr_1:[],
                departArr_2:[],

        };

        $scope.order.orderId = $location.$$search.orderId;
        $scope.order.type = $location.$$search.type;

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

        $scope.getReference = function(){
            getNewOrderInfo();
        };

        $scope.payChance = function(){
            $scope.order.orderShow = false;
            window.location.href="#/pay?out_trade_no="+$scope.orderout_trade_no+"&type="+$scope.order.type;
        }

        $scope.close = function(){
            $scope.order.orderShow = false;
        };

        function init(){
            if(sessionStorage.getItem('usernumber') == null || sessionStorage.getItem('usernumber') == "" || sessionStorage.getItem('usernumber').length<= 0){
                $window.location.href="#/login";
                return;
            }
            $scope.order.subtitle = yxb_title[$scope.order.type];
            $scope.order.caption = caption [$scope.order.type];
            getOrderInfo();
        }

        function getOrderInfo(){
            $http.get(loocha+"/exam/order/info?out_trade_no="+$scope.order.orderId)
                .success(function(data,status){
                    if(status== 2){
                        alert('操作失败！');
                        $window.location.href="#/all/reference";
                        return;
                    }
                    $scope.order.name =data.response.name;
                    $scope.order.number =data.response.number;
                    $scope.order.city =data.response.city;
                    $scope.order.area =data.response.area;
                    $scope.order.data = data.response.list;
                    $scope.order.departArr_0 = data.response.list[0].departs;
                    $scope.order.departArr_1 = data.response.list[1].departs;
                    $scope.order.departArr_2 = data.response.list[2].departs;
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

        $scope.showCase = function(){
            $http.get(loocha+"/exam/intention?id="+$scope.order.requestId)
                .success(function(data){
                    var obj = data.response;
                    var preferOrders = obj.preferOrders,preferSchoolNames = obj.preferSchoolNames,preferDepartNames = obj.preferDepartNames,
                        preferCityNames = obj.preferCityNames, preferPersonalityNames = obj.preferPersonalityNames;

                    caseModel (preferOrders,$scope.order.departArr_0);
                    caseModel (preferOrders,$scope.order.departArr_1);
                    caseModel (preferOrders,$scope.order.departArr_2);

                    $scope.order.data[0].departs = $scope.order.departArr_0;
                    $scope.order.data[1].departs = $scope.order.departArr_1;
                    $scope.order.data[2].departs = $scope.order.departArr_2;

                    $("#cased").modal('show');

                    function caseModel (array,newArray){
                        for(var j = 0 ;j < newArray.length;j++){

                            var preferArr = newArray[j].prefer.split(",");
                            newArray[j].cased =[];
                            newArray[j].str = "";
                            for(var i = 0;i<array.length;i++){

                                for(var k = 0 ; k < preferArr.length;k++){
                                    if(array[i] == 1 && preferArr[i]>0 && k == 0){//高校
                                        var schl = preferSchoolNames[parseInt(preferArr[i])-1];
                                        newArray[j].cased.push(schl);
                                        newArray[j].str = newArray[j].str +"高校第"+preferArr[i]+"优先 "
                                    }else if (array[i] == 2 && preferArr[i]>0 && k == 0){//专业
                                        var dept = preferDepartNames[parseInt(preferArr[i])-1];
                                        newArray[j].cased.push(dept);
                                        newArray[j].str = newArray[j].str +"专业第"+preferArr[i]+"优先 "
                                    }else if (array[i] == 3 && preferArr[i]>0 && k == 0){//城市
                                        var city = preferCityNames[parseInt(preferArr[i])-1];
                                        newArray[j].cased.push(city);
                                        newArray[j].str = newArray[j].str +"城市第"+preferArr[i]+"优先 "
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
        }

    }])
});
