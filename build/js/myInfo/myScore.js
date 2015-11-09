/**
 * Created by qbl on 2015/11/9.
 */
angular.module("gaokaoAPP.myInfo.myScore", [])
    .controller("scroeCtr", ['$scope','$window',function ($scope,$window) {
        $scope.table = {
            obl:"",
            sel:"",
            score:"",
            subject:"",
            sub1:"",
            sub1:"",
            myScore:""
        }

        init();

        function init(){
            $scope.firstDoor = [
                {
                    id: "5",
                    name: "A+"
                }, {
                    id: 4,
                    name: "A",
                }, {
                    id: 3,
                    name: "B+",
                }, {
                    id: 2,
                    name: "B+",
                }, {
                    id: 1,
                    name: "C",
                }, {
                    id: 0,
                    name: "D",
                }
            ];

            if(localStorage.getItem("score") != null){
                $scope.table.myScore = JSON.parse(localStorage.getItem("score"));

            }
        }

        $scope.$watch('table.subject',function(newValue,oldValue){
            if(newValue == 1){
                $scope.table.sub1 = "历史";
                $scope.table.sub2 = "政治";
            }else if(newValue == 2){
                $scope.table.sub1 = "物理";
                $scope.table.sub2 = "化学";
            }
        })

        $scope.addScore = function(table){

            if(table.sel == null){
                alert('请选择科目等级');
            }else if(table.obl == null){
                alert('请选择科目等级');
            }

            var arr = [];
            var param = {};
                param.subject = $scope.table.subject == "1" ?"文科":"理科";
                param.score = $scope.table.score;
                param.level = $scope.table.sub1+table.obl.name+","+$scope.table.sub2+table.sel.name;
                param.date = new Date().getTime();

            if(localStorage.getItem("score") == null){
                param.state = 1;
                arr.push(param);
                localStorage.setItem("score",JSON.stringify(arr));
            }else {
                var array = JSON.parse(localStorage.getItem("score"));
                param.state = 0;
                array.push(param);
                localStorage.setItem("score",JSON.stringify(array));
            }

            $window.location.reload()
        }

        $scope.setUp = function(index){
            var arr = []
            $.each(JSON.parse(localStorage.getItem("score")), function (idx, val) {
                if (idx == index) {
                    val.state = 1
                } else {
                    val.state = 0
                }

                arr.push(val);
            });
            localStorage.setItem("score",JSON.stringify(arr));
            $window.location.reload();
        }

    }])