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
    app.controller('referCtr',['$scope','$location','$window','$http','$stateParams','$timeout','$sce','loocha','getLoginUserInfo',function($scope,$location,$window,$http,$stateParams,$timeout,$sce,loocha,getLoginUserInfo){

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
        $scope.schoolInfo = "";
        $scope.order.orderId = $location.$$search.orderId;
        $scope.order.type = $location.$$search.type;
        $scope.order.flag = $location.$$search.flag!=undefined?$location.$$search.flag:window.location.hash.split("type=")[1];
        $scope.order.title = $scope.order.flag == 2 ? "普通高校招生考生志愿推荐表":"普通高校招生考生志愿自选表";
        var yxb_title = [
            "",
            "【第一阶段填报文科类本一批次本科院校志愿用表】",
            "【第一阶段填报理科类本一批次本科院校志愿用表】",
            "【第一阶段填报文科类本二批次本科院校志愿用表】",
            "【第一阶段填报理科类本二批次本科院校志愿用表】",
            "【第二阶段填报文科类本三批次本科院校志愿用表】",
            "【第二阶段填报理科类本三批次本科院校志愿用表】",
            "【第二阶段填报文科类高职（专科）批次院校志愿用表】",
            "【第二阶段填报理科类高职（专科）批次院校志愿用表】"
        ];

        var caption = [
            "",
            "本一批次本科院校志愿用表",
            "本一批次本科院校志愿用表",
            "本二批次本科院校志愿用表",
            "本二批次本科院校志愿用",
            "本三批次本科院校志愿用表",
            "本三批次本科院校志愿用表",
            "高职（专科）批次院校志愿用表",
            "高职（专科）批次院校志愿用表"
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
            getNewOrderInfo($scope.order.requestId);
        };

        $scope.update = function(){
            localStorage.setItem("out_trade_no",$scope.order.orderId);
            $window.location.href="#/refer1";
            $window.location.reload(0);
        }

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
                $http.get(loocha + '/exam/' +responseDate.response.id,{ cache:false}).success(function (data) {
                    if (data.status == 1) {
                        alert('没有找到订单');
                        return;
                    }else if (data.status == 4){
                        alert('您还没有登陆，先去登陆吧！');
                        $window.location.href = "#/login";
                        return;
                    }else if(data.status == "1017"){
                        alert("订单获取了所有数量的推荐高校!点击修改重新编辑推荐表");
                        $("#total").hide();
                        return;
                    }
                    localStorage.setItem("type",$scope.order.type);
                    $scope.orderout_trade_no = data.response.order_id;
                    $scope.order.money = data.response.money;
                    $scope.order.orderShow = true;
                    $("#mask-points").show();
                });
            });
        };

        $scope.payChance = function(){
            getLoginUserInfo.isLogoin();
            $scope.order.orderShow = false;
            $window.location.href="#/pay?order_id="+$scope.orderout_trade_no+"&money="+$scope.order.money+"&type="+$scope.order.type;
        }

        $scope.close = function(){
            $scope.order.orderShow = false;
        };

        function init(){
            /*getLoginUserInfo.isLogoin();*/
            if($scope.order.flag == 4){
                $http.get(loocha + "/exam/order/info?out_trade_no=" +  $scope.order.orderId,{ cache:false})
                    .success(function (data) {
                        if(data.response.flag == 4){
                            $window.location.href = "#/chance/batch="+data.response.type+"&out_trade_no="+$scope.order.orderId;
                            $window.location.reload(0);
                        }
                    });

            }else if($scope.order.flag == 5){
                $window.location.href = "#/all/out_trade_no="+$scope.order.orderId;
            }else{
                getOrderInfo();
            }

            /**
             * 自选判断是否显示下一份自选
             */
            if($scope.order.flag == 3){
                $http.get(loocha+"/exam/intention?out_trade_no="+$scope.order.orderId,{ cache:false})
                    .success(function(data){
                        var total = data.response.total;
                        var num = data.response.schools.length;
                        if(num>=total){
                            $("#total").hide();
                        }
                    });
            }
        }

        function getOrderInfo(){
            var _times = null;

            _times = $timeout(function(){
                $timeout.cancel(_times);
                var times = new Date().getTime().toString();
                $http.get(loocha+"/exam/order/info?out_trade_no="+$scope.order.orderId+"&t="+times,{ cache:false})
                    .success(function(data,status){
                        if(data.status== 2){
                            alert('订单不存在！');
                            $window.location.href="#/all/reference";
                            return;
                        }else if (data.status == "1016"){
                            console.log("out_trade_no:"+$scope.order.orderId);
                            localStorage.setItem("out_trade_no",$scope.order.orderId);
                            $window.location.href="#/refer1";
                            //$window.location.reload(0);
                            return;
                        }else if(data.status == "1004"){
                            var result = confirm("未支付,请重新缴费");
                            $scope.loading = false;
                            if(result){
                                $scope.orderout_trade_no = data.response.orderId;
                                $scope.order.money = data.response.money;
                                $scope.order.orderShow = true;
                            }
                            return;
                        }else if (data.status == 4){
                            alert("您还没有登陆或登陆失效，请重新登陆！");
                            $window.location.href="#/login";
                        }else if(data.status == 0){
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
                            $scope.order.subtitle = yxb_title[$scope.order.type];
                            $scope.order.caption = caption [$scope.order.type];
                            if(data.response.list[0]!=undefined){
                                $scope.order.departArr_0 = data.response.list[0].departs;
                            }
                            if(data.response.list[1]!=undefined){
                                $scope.order.departArr_1 = data.response.list[1].departs;
                            }
                            if(data.response.list[2]!=undefined){
                                $scope.order.departArr_2 = data.response.list[2].departs;
                            }
                            if(data.response.list[3]!=undefined){
                                $scope.order.departArr_3 = data.response.list[3].departs;
                            }
                            if(data.response.list[4]!=undefined){
                                $scope.order.departArr_4 = data.response.list[4].departs;
                            }
                            $scope.order.requestId = data.response.intentionId;
                        }

                    });
            });

        }

        function getNewOrderInfo(id){
            $.post(loocha+"/exam/intention/auto",{id:id},function(data){
                if(data.status == "4"){
                    alert('您还没有登陆，先去登陆吧！');
                    $window.location.href = "#/login";
                    return;
                }
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
            $("#chanced").show();
        };

        $scope.showSchlInfo = function(obj){
            $http.get(loocha+"/school/byname?type="+obj.type+"&code="+obj.schoolCode+"&key="+encodeURI(obj.schoolName)+"&t="+( new Date() ).getTime().toString()).success(function(data){
                if(data.response.list.length<=0){
                    alert("该批次未找到该校信息");
                }else{
                    $scope.schoolInfo = data.response.list[0];
                    if($scope.schoolInfo.article_id>0){
                        $http.get(loocha+"/article/"+$scope.schoolInfo.article_id).success(function(data){
                            $scope.schoolInfo.article_content = $sce.trustAsHtml(data.response.content);
                            $("#mask-school").fadeIn(500);
                        });
                    }else{
                        alert("没有找到相关文章");
                    }
                }

            });
        };
        //TODO 目前专业中没有article_id
        $scope.showDepartInfo = function(obj){
            if(obj.article_id>0){
                $http.get(loocha+"/article/show/"+obj.article_id).success(function(data){
                    $scope.forecast.departInfo = $sce.trustAsHtml(data);
                    $("#mask-depart").fadeIn(800);
                    $("#mask-depart .modal-body").scrollTop(100);
                });
            }else {
                alert("暂无关联文章");
            }
        };

        $scope.gobike = function(name){
            var item = name.split("(")[0].split("★")[0];
            openwin("http://baike.baidu.com/item/"+item);
        };

        function openwin(url) {
            var a = document.createElement("a");
            a.setAttribute("href", url);
            a.setAttribute("target", "_blank");
            a.setAttribute("id", "openwin");
            document.body.appendChild(a);
            a.click();
        }

        $scope.closed = function(){
            $("#chanced,#cased,#mask-points,#mask-school,#mask-depart").hide();
        };

        $scope.showCase = function(){
            $http.get(loocha+"/exam/intention?out_trade_no="+$scope.order.orderId,{ cache:false})
                .success(function(data){
                    if (data.status == 4){
                        alert('您还没有登陆，先去登陆吧！');
                        $window.location.href = "#/login";
                        return;
                    }
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

                    if($scope.order.data[0]!=undefined){
                        $scope.order.data[0] = $scope.order.schlArr_0;
                        $scope.order.data[0].departs = $scope.order.departArr_0;
                    }
                    if($scope.order.data[1]!=undefined){
                        $scope.order.data[1] = $scope.order.schlArr_1;
                        $scope.order.data[1].departs = $scope.order.departArr_1;
                    }
                    if($scope.order.data[2]!=undefined){
                        $scope.order.data[2] = $scope.order.schlArr_2;
                        $scope.order.data[2].departs = $scope.order.departArr_2;
                    }
                    if($scope.order.data[3]!=undefined){
                        $scope.order.data[3] = $scope.order.schlArr_3;
                        $scope.order.data[3].departs = $scope.order.departArr_3;
                    }
                    if($scope.order.data[4]!=undefined){
                        $scope.order.data[4] = $scope.order.schlArr_4;
                        $scope.order.data[4].departs = $scope.order.departArr_4;
                    }

                    $("#cased").show();

                    function caseModelScl (array,newArray){
                        if(newArray!=undefined && newArray.schoolPrefer!=null){
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
