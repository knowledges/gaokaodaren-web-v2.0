/**
 * Created by Administrator on 2015/12/2.
 */
'use strict';
require(['app'],function(app){
    app.controller('exampleAllCtr',['$rootScope','$scope','$sce','$stateParams','$location','homeService','getLoginUserInfo',function($rootScope,$scope,$sce,$stateParams,$location,homeService,getLoginUserInfo){
        $scope.ishide = true;
        $scope.service = homeService;
        $scope.insertHTML = "";
        $scope.nav = {
            batch:$location.$$url.split("batch=")[1]
        };
        $scope.userInfo = {
            uScore:"",
            subject:"",
            sub_a:"",
            sub_b:"",
            level_a:"",
            level_b:"",
            score:"",
        };

        init();

        function init(){
            $scope.userInfo.uScore = JSON.parse(sessionStorage.getItem("uScore"));
            if($scope.userInfo.uScore != null){
                $scope.userInfo.subject =subStr($location.$$url.split("batch=")[1]);
                $scope.userInfo.score = $scope.userInfo.uScore.score;
                $scope.userInfo.sub_a = $scope.userInfo.uScore.sub_a;
                $scope.userInfo.sub_b = $scope.userInfo.uScore.sub_b;
                $scope.userInfo.level_a = $scope.userInfo.uScore.level_a;
                $scope.userInfo.level_b = $scope.userInfo.uScore.level_b;
            }else{
                getLoginUserInfo.isLogoin();
                getLoginUserInfo.isScores();
            }

            function subStr(str){

                switch(parseInt(str)){
                    case 1:
                        return "文科本一";
                        break;
                    case 3:
                        return "文科本二";
                        break;
                    case 5:
                        return "文科本三";
                        break;
                    case 7:
                        return "文科高职";
                        break;
                    case 2:
                        return "理科本一";
                        break;
                    case 4:
                        return "理科本二";
                        break;
                    case 6:
                        return "理科本三";
                        break;
                    case 8:
                        return "理科高职";
                        break;
                }
            }

        }

        $scope.$watch('service',function(newValue){
            if(newValue.htmlPage!=""){
                $scope.ishide = false;
                $scope.insertHTML = $sce.trustAsHtml(newValue.htmlPage);
            }
        },true);

        $scope.back = function(){
            $scope.ishide = true;
            $scope.insertHTML = "";
        };
    }]);
})