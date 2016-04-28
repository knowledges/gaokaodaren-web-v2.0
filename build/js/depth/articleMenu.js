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
    app.directive("onFinishRender",function(){
        return {
            restrict: 'A',
            link: function (scope, element, attr) {
                if (scope.$last === true) {
                    $(".panel-heading").unbind("click").click(function(e){
                        $(".panel-heading").next().removeClass("in");
                        $(this).next().addClass("in").find(".panel-footer").eq(0).next().show();
                    });

                    $(".panel-footer").unbind("click").click(function(e){
                        $(".panel-footer").next().hide();
                        $(this).next().show();
                    });
                    /*$("#menu-infolist > li > a").click(function(e){
                        var list = $("#menu-infolist > li > a");
                        $.each(list,function(i,v){
                            var id = $(this).data("target");
                            $(id).attr("aria-expaneded","false").hide();
                        });

                        var id = $(this).data("target");
                        $(id).attr("aria-expaneded","true").show();
                    })*/
                }
            }
        }
    });
    app.directive("onFinishChildrender",function(){
        return {
            restrict:'A',
            link:function(scope,element,attr){

            }
        }
    })
    app.factory("subLevel")
    app.controller('artCtr',["$scope",'$http','$sce','$stateParams','$location','loocha','data_province',function($scope,$http,$sce,$stateParams,$location,loocha,data_province){
        $scope.menuArr = [];
        $scope.orderList=[];
        $scope.menuInfoArr = [];
        $scope.money = 0;
        $scope.insertHTML="";
        $scope.condition={
            inputTemplate : 0,
            timer:"",
            schlName:"",
            deparName:"",
            level:"",
            attr:"",
            departprop:"",
            city:"",
            charge:"",
            parentTitle:"",
            title:"111111",
            innserTHML:"",
            provincelist:"",
            departproplist:[],
//            type:""
        };
//        console.log($location.$$url.split("batch=")[1]);

        init();

        function init(){
//            $scope.condition.type=$location.$$url.split("batch=")[1];
//
            $scope.condition.provincelist=data_province.data.response.list;
//
            $("#recommend").show();
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
            $(".list-group-ul").hide();
            var that = $(e.target),money = parseInt(that.attr("money")),leaf = parseInt(that.attr("leaf")),idx= parseInt(that.attr("idx")),name=that.html(),inputTemplate=that.attr("inputTemplate");
            if (money == 0 && leaf == 0){
                $(e.target).next().fadeIn(500);
                $scope.condition.parentTitle = name;
            }else if (money == 0 && leaf == 0 && inputTemplate == 99){
                $(e.target).next().fadeIn(500);
                $scope.condition.parentTitle = name;
            }else{
                $scope.condition.inputTemplate = inputTemplate;
                /*$(".modal").show();*/
                $("#subInfo").attr({idx:idx,money:money,leaf:leaf,name:name,inputTemplate:inputTemplate,status:1});
            }

        };

        $scope.close = function(){
            $("#recommend").hide();
        };

        /**
         * 提交信息
         */
        $scope.subOrder = function(e){
            var that = $(e.target),money = parseInt(that.attr("money")),leaf = parseInt(that.attr("leaf")),idx= parseInt(that.attr("idx")),name=that.attr("name"),inputTemplate=that.attr("inputTemplate"),status = that.attr("status");
            var year = $scope.condition.timer!=""?$scope.condition.timer:"";
            var school = $scope.condition.schlName !="" ? $scope.condition.schlName :"";
            var depart = $scope.condition.deparName !="" ? $scope.condition.deparName :"";
            var sel = $scope.condition.level !="" ? $scope.condition.level:"";
            if(money==0 && leaf>0){
                $http.get(loocha+'/depth/query/'+idx+'.html?year='+$scope.condition.timer+'&type='+$location.$$url.split("batch=")[1]+"&school="+school+"&depart="+depart+"&sel="+sel)
                    .success(function (data) {
                        if(data.length>0){
                            $("#depathTHML").empty().prepend(data);
                        }else{
                            $("#depathTHML").empty().prepend('<h2 class="text-content">数据还在筹备中....</h2>');
                        }

                        $("#condition").hide();
                        $scope.condition.level="";
                    });
            }else if (money > 0 && leaf > 0){
                var obj = new Object();
                obj.id = idx;
                obj.name =  $scope.condition.parentTitle+name;
                obj.school = $scope.condition.schlName;
                obj.depart = $scope.condition.deparName;
                obj.money = money;
                obj.year = $scope.condition.timer;
                $scope.orderList.push(obj);
                $scope.money  += money;
                $scope.condition.schlName = $scope.condition.deparName = $scope.condition.timer = $scope.condition.parentTitle = "";
            }
            $(".modal").hide();
        };

        /**
         *  移除 orderList 内容
         * @param idx
         */
        $scope.remClk = function(idx){
            $scope.money  -= $scope.orderList[idx].money;
            $scope.orderList.splice(idx,1);
        };

    }]);
});