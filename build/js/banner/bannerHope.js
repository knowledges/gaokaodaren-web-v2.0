/**
 * Created by qbl on 2015/11/19.
 */
require(['app'],function(app){
    app.controller('addhopeCtl',['$scope','$http','$window','getLoginUserInfo','loocha',function($scope,$http,$window,getLoginUserInfo,loocha){
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
                $scope.table.sub2 = "3";
            }else if(newValue == 2){
                $scope.table.sub1 = "物理";
                $scope.table.sub2 = "2";
            }
        });

        $scope.addScore = function(table){
            getLoginUserInfo.isLogoin();

            if(table.score <=0){
                alert('分数不能小于0！');
                return;
            }else if(table.sel == null){
                alert('请选择科目等级！');
                return;
            }else if(table.obl == null){
                alert('请选择科目等级！');
                return;
            }else if (table.batch ==""){
                alert('请选择批次！');
                return;
            }else if (table.subject == ""){
                alert('请选择科别！');
                return;
            }

            var param = {};
                param.user_id = sessionStorage.getItem("user_id");
                param.type = $scope.table.batch;
                param.subject = $scope.table.subject;
                param.score = $scope.table.score;
                param.sub_a = $scope.table.sub1;
                param.sub_b = subStr($scope.table.sub2);
                param.level_a = table.obl.name;
                param.level_b = table.sel.name;
                param.year = new Date().getFullYear();

            function subStr(num){
                var str ="";
                switch(parseInt(num)){
                    case 1:
                        str ="生物";
                        break;
                    case 2:
                        str ="化学";
                        break;
                    case 3:
                        str ="政治";
                        break;
                    case 4:
                        str ="地理";
                        break;
                }
                return str;
            }

            $http({
                method:'GET',
                url:loocha+"/uscore/addscore",
                params:param
            }).success(function(data){
                if(data.status == 0) {
                    getLoginUserInfo.isScores();
                    localStorage.setItem("type", $scope.table.batch);
                    $window.location.href = "#/hope/batch="+$scope.table.batch+"&out_trade_no=";
                }else if (data.status == 4){
                    alert('您还没有登陆，先去登陆吧！');
                    window.location.href = "#/login";
                }
            });
        }
    }]);
});