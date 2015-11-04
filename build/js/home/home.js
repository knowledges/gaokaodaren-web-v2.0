/**
 * Created by qbl on 2015/9/22.
 */
'use strict';

angular.module("gaokaoAPP.home",[])
.controller("homeCtr",['$scope','$window','AJAX','provinceURL',function($scope,$window,AJAX,provinceURL) {
        $scope.table = {
            subject:"1",
            Batch :"1",
            type:0,
            provincelist:"",
            obl:"",
            sel:"",
            score:""
        }
        $scope.startTable = function(){
            var subject = $scope.table.subject,user_level = $scope.table.Batch;
            if(subject == "1"){
                switch(user_level){
                    case "1":
                        $scope.table.type = 1;
                        break;
                    case "2":
                        $scope.table.type = 3;
                        break;
                    case "3":
                        $scope.table.type = 5;
                        break;
                    case "4":
                        $scope.table.type = 7;
                        break;
                }
            }else {
                switch(user_level){
                    case "1":
                        $scope.table.type = 2;
                        break;
                    case "2":
                        $scope.table.type = 4;
                        break;
                    case "3":
                        $scope.table.type = 6;
                        break;
                    case "4":
                        $scope.table.type = 8;
                        break;
                }
            }
            locationHref($scope.table.type,parseInt(user_level),$scope.table.obl.id,$scope.table.sel.id,$scope.table.score);

        }

        function locationHref(type,user_level,obl,sel,score){
            $window.location.href="#/hope?type="+type+"&user_level="+user_level+"&obl="+obl+"&sel="+sel+"&score="+score;
        }

        $scope.menu = {
            provincelist: ""
        }



        init();

        function init() {
            AJAX.getRequest(provinceURL, 'GET', '')/**ʡ��*/
                .success(function (data, status) {
                    $scope.table.provincelist = data.response.list;
                });

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
        }

}]);