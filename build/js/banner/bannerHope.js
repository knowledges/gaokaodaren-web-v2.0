/**
 * Created by qbl on 2015/11/19.
 */
require(['app'],function(app){
    app.controller('addhopeCtl',['$scope','$http','$window','getLoginUserInfo',function($scope,$http,$window,getLoginUserInfo){
        $scope.table = {
            obl:"",
            sel:"",
            score:"",
            subject:"",
            sub1:"",
            myScore:"",
            newScore:0
        };

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
            getLoginUserInfo.isLogoin();

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
                alert('成绩创建成功，默认使用此成绩去模拟志愿表');
                var index = responseDate.response,score = $scope.table.score;
                $http.get(loocha+'/uscore/uptime?id='+index+'&user_id='+sessionStorage.getItem("user_id")).success(function(data){
                    $http.get(loocha+"/uscore/info?id="+index).success(function(data,status){
                        sessionStorage.setItem('uScore',JSON.stringify(data.response));
                        alert("去选择批次吧！");
                        $window.location.href = "#/all/allScore";
                    });
                });
            });
        }
    }]);
});