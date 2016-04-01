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
    app.controller('artCtr',["$scope","$sce",'$http','loocha',function($scope,$sce,$http,loocha){
        $scope.menuArr = [];
        $scope.orderList=[];
        $scope.menuInfoArr = [];
        $scope.money = 0;
        $scope.condition={
            resultTemplate : 0,
            timer:"",
            schlName:"",
            departName:"",
            parentTitle:"",
            article:""
        };

///////////////////$http///////////////////////////////////////////////////////////////////////////////////////////////////

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
        }

        /**
         *  leaf: 1：代表根节点 0：不是根节点，且有子节点，子节点同理
         *  money: 大于0 收费
         *  resultTemplate 显示模板，1：年限 2：年限+学校名称 3：年限+专业名称
         * @param e
         */
        $scope.subClk = function(e){
            $(".list-group-ul").hide();
            var that = $(e.target),money = parseInt(that.attr("money")),leaf = parseInt(that.attr("leaf")),idx= parseInt(that.attr("idx")),name=that.html(),resultTemplate=that.attr("resultTemplate");
            if (money == 0 && leaf == 0){
                $(e.target).next().fadeIn(500);
                $scope.condition.parentTitle = name;
            }else{
                $scope.condition.resultTemplate = resultTemplate;
                $(".modal").show();
                $("#subInfo").attr({idx:idx,money:money,leaf:leaf,name:name,resultTemplate:resultTemplate,status:1});
            }

        };

        $scope.close = function(){
            $(".modal").hide();
        };

        /**
         * 提交信息
         */
        $scope.subOrder = function(e){
            var that = $(e.target),money = parseInt(that.attr("money")),leaf = parseInt(that.attr("leaf")),idx= parseInt(that.attr("idx")),name=that.attr("name"),resultTemplate=that.attr("resultTemplate"),status = that.attr("status");
            if(money==0 && leaf>0){
                //免费的可以直接给出结果 TODO 缺少批次
                $http.get(loocha+'/depth/query/result?id='+idx+'&year='+$scope.condition.timer+'&type=3')
                    .success(function (data) {
                        $scope.condition.article = data.response;
                    });
            }else if (money > 0 && leaf > 0){
                var obj = new Object();
                    obj.id = idx;
                    obj.name =  $scope.condition.parentTitle+name;
                    obj.school = $scope.condition.schlName;
                    obj.depart = $scope.condition.departName;
                    obj.money = money;
                    obj.year = $scope.condition.timer;
                $scope.orderList.push(obj);
                $scope.money  += money;
                $scope.condition.schlName = $scope.condition.departName = $scope.condition.timer = $scope.condition.parentTitle = "";
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