/**
 * Created by Administrator on 2015/12/2.
 */
'use strict';
require(['app'],function(app){
    app.directive('isLoading',['$rootScope',function($rootScope){
        return{
            restrict: 'A',
            link:function(scope){
                if(scope.$last == true){
                    $rootScope.loading=false;
                }
            }
        }
    }]);
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
    app.controller("myScore", ['$scope','$window','$http','loocha','getLoginUserInfo','levelName',function ($scope,$window,$http,loocha,getLoginUserInfo,levelName) {

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

            $http.get(loocha+"/uscore?user_id="+user_id).success(function(data){
                if(data.response!=null && data.response.length>0){
                    $scope.table.myScore = data.response;

                    $.each(data.response,function(i,v){
                        if(v.userTime>0){
                            sessionStorage.setItem('uScore',JSON.stringify(v));
                            $scope.table.newScore = v.score;
                        }
                    });
                }else{
                    $scope.loading = false;
                }

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
            addUserScore();
            /*if(sessionStorage.getItem("uScore")!=null){
                if($scope.table.subject!="" && $scope.table.batch!="" && $scope.table.score == "" && $scope.table.sub1!="" && $scope.table.sub2!=""){
                    localStorage.setItem("type",$scope.table.batch);
                    if(num == 1){
                        $window.location.href = "#/hope";
                    }else if (num == 2){
                        $window.location.href = "#/chance";
                    }else{
                        $window.location.href = "#/depath";
                    }
                }else if($scope.table.subject=="" && $scope.table.batch!="" ){
                    alert("请选择学科");
                }else if ($scope.table.subject!="" && $scope.table.batch==""){
                    alert("请选择批次");
                }else{
                    addUserScore();
                }
            }else{
                addUserScore();
            }*/
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
                param.subject = $scope.table.subject;
                param.score = $scope.table.score;
                param.sub_a = $scope.table.sub1;
                param.sub_b = $("#other option:selected").text();
                param.level_a = $scope.table.obl.name;
                param.level_b = $scope.table.sel.name;
                param.year = new Date().getFullYear();

                $http({
                    method:'GET',
                    url:loocha+"/uscore/addscore",
                    params:param
                }).success(function(responseDate){
                    var id = responseDate.response;
                    if(responseDate.status == 0){
                        $http.get(loocha+'/uscore/uptime?id='+id+'&user_id='+sessionStorage.getItem("user_id")).success(function(data){
                            $http.get(loocha+"/uscore/info?id="+id).success(function(data,status){
                                sessionStorage.setItem('uScore',JSON.stringify(data.response));
                                localStorage.setItem("type",$scope.table.batch);
                                if(num == 1){
                                    $window.location.href = "#/hope";
                                }else if (num == 2){
                                    $window.location.href = "#/chance";
                                }else{
                                    $window.location.href = "#/depath";
                                }
                            });
                        });
                    }
                });

                /*var tramsform = function(data){
                    return $.param(data);
                };

                $http.post(loocha+"/uscore/addscore",param,{
                    headers:{'Content-type':'application/x-www-form-urlencoded; charset=UTF-8'},
                    transformRequest:tramsform
                }).success(function(responseDate){
                    var id = responseDate.response;
                    if(responseDate.status == 0){
                        $http.get(loocha+'/uscore/uptime?id='+id+'&user_id='+sessionStorage.getItem("user_id")).success(function(data){
                            $http.get(loocha+"/uscore/info?id="+id).success(function(data,status){
                                sessionStorage.setItem('uScore',JSON.stringify(data.response));
                                localStorage.setItem("type",$scope.table.batch);
                                if(num == 1){
                                    $window.location.href = "#/hope";
                                }else if (num == 2){
                                    $window.location.href = "#/chance";
                                }else{
                                    $window.location.href = "#/depath";
                                }
                            });
                        });
                    }
                });*/
            }
        };

        $scope.setUp = function(e){
            var that = $(e.target),index = that.attr("list_id"),score = that.attr("score");
            $http.get(loocha+'/uscore/uptime?id='+index+'&user_id='+sessionStorage.getItem("user_id")).success(function(data){
                alert("该成绩已开始使用");
                $http.get(loocha+"/uscore/info?id="+index).success(function(data,status){
                    sessionStorage.setItem('uScore',JSON.stringify(data.response));
                    $window.location.reload(0);
                });
            });
        };

        /**
         * 填志愿意向表前的判断
         * @param e 当前对象
         */
        $scope.startTable = function(e){
            var that = $(e.target),score = that.attr('score'),type = that.attr('type');
            if(score<=$scope.table.newScore){
                localStorage.setItem("type",type);
                $window.location.href = "#/hope";
            }else{
                alert('您的分数没有达到该批次最低投档标准，请换别的批次！');
            }
        };
        $scope.startChance = function(e){
            var that = $(e.target),score = that.attr('score'),type = that.attr('type');
            if(score<=$scope.table.newScore){
                localStorage.setItem('type',type);
                $window.location.href = "#/chance";
            }else{
                alert('您的分数没有达到该批次最低投档标准，请换别的批次！');
            }
        };
        $scope.createAdd = function(){
            $(".bs-example-modal-sm").modal('show');
        }

    }]);
});