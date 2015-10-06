/**
 * Created by qbl on 2015/9/22.
 */
'use strict';

angular.module("gaokaoAPP.hope",['ngRoute'])
.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/hope', {
        templateUrl: "html/hope/hope.html",
        controller: "hopeCtr"
    })
}]).controller("hopeCtr", ['$scope','$location',function ($scope,$location) {

        $scope.table ={
            subject:"",
            stage:"",
            batch:"",
            result1:"",
            user_level:"",
            type:""
        }

        $scope.table.type = $.getParam("types",window.location.hash);
        $scope.table.user_level = $.getParam("user_level",window.location.hash);
        showTableName($scope.table.type,$scope.table.user_level);

        function showTableName(type,user_level){
            debugger;
            switch (type){
                case "1":
                    $scope.table.subject = "文科";
                    $scope.table.batch = "本一";
                    $scope.table.stage = "第一阶段";
                    break;
                case "2":
                    $scope.table.subject = "理科";
                    $scope.table.batch = "本一";
                    $scope.table.stage = "第一阶段";
                    break;
                case "3":
                    $scope.table.subject = "文科";
                    $scope.table.batch = "本二";
                    $scope.table.stage = "第一阶段";
                    break;
                case "4":
                    $scope.table.subject = "理科";
                    $scope.table.batch = "本二";
                    $scope.table.stage = "第一阶段";
                    break;
                case "5":
                    $scope.table.subject = "文科";
                    $scope.table.batch = "本三";
                    $scope.table.stage = "第二阶段";
                    break;
                case "6":
                    $scope.table.subject = "理科";
                    $scope.table.batch = "本三";
                    $scope.table.stage = "第二阶段";
                    break;
                case "7":
                    $scope.table.subject = "文科";
                    $scope.table.batch = "高职（专科）";
                    $scope.table.stage = "第二阶段";
                    break;
                case "8":
                    $scope.table.subject = "理科";
                    $scope.table.batch = "高职（专科）";
                    $scope.table.stage = "第二阶段";
                    break;
            }
        }
}]);
