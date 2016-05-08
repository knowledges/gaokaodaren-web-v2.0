/**
 * Created by Administrator on 2015/12/2.
 */
'use strict';
require(['app'],function(app){
    /*app.directive('isLoading',['$rootScope',function($rootScope){
        return{
            restrict: 'A',
            link:function(scope){
                if(scope.$last == true){
                    $rootScope.loading=false;
                }
            }
        }
    }]);*/
    app.factory("levelName", function () {
        return {
            ShowLevel: function (str) {
                var num = 0;
                switch (str) {
                    case "5":
                        num = 'A+';
                        break;
                    case "4":
                        num = 'A';
                        break;
                    case "3":
                        num = 'B+';
                        break;
                    case "2":
                        num = 'B';
                        break;
                    case "1":
                        num = 'C';
                        break;
                    case "0":
                        num = 'D';
                        break;
                }
                return num;
            }
        }
    });
    app.factory("levelNumber", function () {
        return {
            ShowLevel: function (str) {
                var num = "";
                switch (str) {
                    case "A+":
                        num = "5";
                        break;
                    case "A":
                        num = "4";
                        break;
                    case "B+":
                        num = "3";
                        break;
                    case "B":
                        num = "2";
                        break;
                    case "C":
                        num = "1";
                        break;
                    case "D":
                        num = "0";
                        break;
                }
                return num;
            }
        }
    });
    app.factory("doorStr", function () {
        return {
            ShowDoor: function (num) {
                var str ="";
                switch(num){
                    case "生物":
                        str ="1";
                        break;
                    case "化学":
                        str ="2";
                        break;
                    case "政治":
                        str ="3";
                        break;
                    case "地理":
                        str ="4";
                        break;
                }
                return str;
            }
        }
    });
    app.controller("myScore", ['$scope','$window','$http','loocha','getLoginUserInfo','levelName','levelNumber','doorStr',function ($scope,$window,$http,loocha,getLoginUserInfo,levelName,levelNumber,doorStr) {

     /*   $scope.$on("$includeContentLoaded",function(){
            alert('加载ok');
        })*/

        $scope.recommShow = false;
        $scope.table = {
            obl:"",
            sel:"",
            score:"",
            subject:"",
            sub1:"",
            sub2:"",
            myScore:"",
            newScore:0,
            batch:""
        }

        init();

        function init(){
            getLoginUserInfo.isLogoin();

            $('#myModal').modal({
                keyboard: false
            });

            $scope.firstDoor = [
                {
                    id: "5",
                    name: "A+"
                }, {
                    id: 4,
                    name: "A"
                }, {
                    id: 3,
                    name: "B+"
                }, {
                    id: 2,
                    name: "B"
                }, {
                    id: 1,
                    name: "C"
                }, {
                    id: 0,
                    name: "D"
                }
            ];

            $('.dropdown-toggle').dropdown();

            var user_id  = parseInt(sessionStorage.getItem("user_id"));

            $http.get(loocha+"/uscore").success(function(data){
                if(data.response!=null && data.response.length>0){
                    $scope.table.myScore = data.response;
                    sessionStorage.setItem('uScore',JSON.stringify(data.response[0]));
                    $("#obl option[value=''],#sel option[value='']").removeAttr("selected");
                    var obj = data.response[0];
                        $scope.table.subject = obj.subject+"";
                        $scope.table.obl = levelNumber.ShowLevel(obj.level_a);
                        $scope.table.sel =  levelNumber.ShowLevel(obj.level_b);
                        $("#obl option[value="+$scope.table.obl+"]").attr("selected","true");
                        $("#sel option[value="+$scope.table.sel+"]").attr("selected","true");
                        $scope.table.score =obj.score ;
                        $scope.table.sub1 = obj.sub_a;
                        $scope.table.sub2 = doorStr.ShowDoor(obj.sub_b);
                        $scope.table.myScore = obj.score;
                        $scope.table.newScore = obj.score;
                        $scope.table.batch =obj.type+"" ;
                }else{
                    $scope.loading = false;
                }
                $(".modal-backdrop").removeClass("in").hide();//取消掉黑框
            });

        };

        $scope.$watch('table.subject',function(newValue,oldValue){
            if(newValue == 1){
                $scope.table.sub1 = "历史";
                $scope.table.sub2 = "3";
            }else if(newValue == 2){
                $scope.table.sub1 = "物理";
                $scope.table.sub2 = "2";
            }
        });

        $scope.addScore = function(num){
            if(sessionStorage.getItem("uScore")!=null){
                if($scope.table.subject!="" && $scope.table.batch!="" && $scope.table.score == "" && $scope.table.sub1!="" && $scope.table.sub2!="") {
                    localStorage.setItem("type", $scope.table.batch);
                    if (num == 3) {
                        window.location.href="#/depth/depthInfo/batch="+$scope.table.batch;
                    } else{
                        addUserScore();
                    }
                }else{
                    addUserScore();
                }
            }else{
                addUserScore();
            }
            /**
             * 添加成绩
             */
            function addUserScore(){
                if($scope.table.subject == ""){
                    alert("请选择科别");
                    return;
                }
                if($scope.table.score <=0){
                    alert('分数不能小于0！');return;
                }
                if($scope.table.obl == null || $scope.table.obl == ""){
                    alert('请选择科目等级');return;
                }
                if($scope.table.sel == null || $scope.table.sel == ""){
                    alert('请选择另一门等级');return;
                }
                if($scope.table.batch == ""){
                    alert("请选择批次");
                    return;
                }

                var param = {};
                param.user_id = sessionStorage.getItem("user_id");
                param.type = $scope.table.batch;
                param.subject = $scope.table.subject;
                param.score = $scope.table.score;
                param.sub_a = $scope.table.sub1;
                param.sub_b = $("#other option:selected").text();
                param.level_a = levelName.ShowLevel($scope.table.obl);
                param.level_b = levelName.ShowLevel($scope.table.sel);
                param.year = new Date().getFullYear();

                $http({
                    method:'GET',
                    url:loocha+"/uscore/addscore",
                    params:param
                }).success(function(data){
                    if(data.status == 0){
                        getLoginUserInfo.isScores();
                        localStorage.setItem("type",$scope.table.batch);
                        sessionStorage.setItem('uScore',JSON.stringify(param));
                        if(num == 1){
                            $window.location.href = "#/hope/batch="+$scope.table.batch;
                        }else if (num == 2){
                            $window.location.href = "#/chance/batch="+$scope.table.batch;
                        }else{
                            $window.location.href="#/depth/depthInfo/batch="+$scope.table.batch;
                        }
                    }else if (data.status == 4){
                        alert('您还没有登陆，先去登陆吧！');
                        window.location.href = "#/login";
                    }
                });

            }
        };

        /**
         * 填志愿意向表前的判断
         * @param e 当前对象
         */
        $scope.startTable = function(e){
            var that = $(e.target),score = that.attr('score'),type = that.attr('type');
            if(score<=$scope.table.newScore){
                localStorage.setItem("type",type);
                $window.location.href = "#/hope/batch="+$scope.table.batch;
            }else{
                alert('您的分数没有达到该批次最低投档标准，请换别的批次！');
            }
        };
        $scope.startChance = function(e){
            var that = $(e.target),score = that.attr('score'),type = that.attr('type');
            if(score<=$scope.table.newScore){
                localStorage.setItem('type',type);
                $window.location.href = "#/chance/batch="+type;
            }else{
                alert('您的分数没有达到该批次最低投档标准，请换别的批次！');
            }
        };
        $scope.createAdd = function(){
            $(".bs-example-modal-sm").modal('show');
        }

    }]);
});