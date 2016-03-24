/**
 * Created by qbl on 2016/1/19.
 */
'use strict';
require(['app'],function(app){
    app.controller('searchCtr',['$scope','$http','$location','$stateParams','$sce',loocha,function($scope,$http,$location,$stateParams,$sce,loocha){
        console.log($stateParams);
        $scope.html={
            list:[],
            content:""
        };
        init();
        function init(){
            $http.get(loocha+'/article/search?name='+$stateParams.key+'&index='+0+'&limit='+15).success(function(data,status){
                $scope.html.list = data.response;
                $scope.html.content =$sce.trustAsHtml($scope.html.list[0].content);
            });
        };

        $scope.searchArticle = function(e){
            var _this = $(e.target),content = _this.attr('content');
            $scope.html.content =$sce.trustAsHtml(content);
        }
    }]);
});