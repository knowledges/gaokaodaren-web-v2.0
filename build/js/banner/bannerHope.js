/**
 * Created by qbl on 2015/11/19.
 */
define(function(require){
    require('banner-hope');

    var app = require('../../app');

    app.controller('addhopeCtl',['$scope',function($scope){
        $scope.table = {
            subject:"1",
            Batch :"1",
            type:0,
            provincelist:"",
            obl:"",
            sel:"",
            score:"",
        }

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

        $scope.addScore = function(table){
            //TODO �Ƿ��½
            var arr = [];
            var param = {};
            param.subject = $scope.table.subject == "1" ?"�Ŀ�":"���";
            param.score = $scope.table.score;
            param.level = $scope.table.sub1+table.obl.name+","+$scope.table.sub2+table.sel.name;
            param.date = new Date().getTime();

            if(localStorage.getItem("score") == null){
                param.state = 0;
                arr.push(param);
                localStorage.setItem("score",JSON.stringify(arr));
            }else {
                var array = JSON.parse(localStorage.getItem("score"));
                param.state = 0;
                array.push(param);
                localStorage.setItem("score",JSON.stringify(array));
            }

            var add = confirm('�ɼ������ɹ����Ƿ�ʹ�ô˳ɼ�ȥģ��־Ը��');
            if(add){
                $window.location.href="#/hope?type=1&user_level=1"
            }else{
                $window.location.href="#/all/all.score";
            }
        }
    }]);
})