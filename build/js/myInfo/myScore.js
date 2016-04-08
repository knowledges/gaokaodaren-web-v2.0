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
    app.controller("myScore", ['$scope','$window','$http','loocha','getLoginUserInfo',function ($scope,$window,$http,loocha,getLoginUserInfo) {

        $scope.recommShow = false;
        $scope.table = {
            obl:"",
            sel:"",
            score:"",
            subject:"",
            sub1:"",
            myScore:"",
            newScore:0
        }

        init();

        function init(){
            getLoginUserInfo.isLogoin();

            $('#myModal').modal({
                keyboard: false
            })

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
                $scope.table.sub2 = "政治";
            }else if(newValue == 2){
                $scope.table.sub1 = "物理";
                $scope.table.sub2 = "化学";
            }
        });

        $scope.addScore = function(table){
            if(table.score <=0){
                alert('分数不能小于0！');
            }else if(table.sel == null){
                alert('请选择科目等级！');
            }else if(table.obl == null){
                alert('请选择科目等级！');
            }

            var param = {};
                param.user_id = sessionStorage.getItem("user_id");
                param.subject = $scope.table.subject;
                param.score = $scope.table.score;
                param.sub_a = $scope.table.sub1;
                param.sub_b = $scope.table.sub2;
                param.level_a = table.obl.name;
                param.level_b = table.sel.name;
                param.year = new Date().getFullYear();
            
            var tramsform = function(data){
                return $.param(data);
            };
            
            $http.post(loocha+"/uscore/addscore",param,{
                headers:{'Content-type':'application/x-www-form-urlencoded; charset=UTF-8'},
                transformRequest:tramsform
            }).success(function(responseDate){
                alert("请点击页面中‘开始使用’，我们将开始使用此次成绩！");
            	$window.location.reload(0);
            });
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