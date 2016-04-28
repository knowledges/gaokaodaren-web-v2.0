/**
 * Created by qbl on 2016/1/19.
 */
'use strict';
require(['app'],function(app){
    app.directive("onFinishRender",['$timeout',function($timeout){
        return {
            restrict:'A',
            link:function(scope,element,attr){
                if(scope.$last == true){
                    $timeout(function () {
                        scope.$emit(attr.onFinishRender);
                    });
                }

            }
        }
    }]);
    app.controller('searchCtr',['$rootScope','$scope','$http','$location','$stateParams','$sce','loocha',function($rootScope,$scope,$http,$location,$stateParams,$sce,loocha){
        console.log($stateParams);
        $scope.html={
            list:[],
            content:"",
            key:$stateParams.key
        };
        init();
        function init(){
            $http.get(loocha+'/article/search?name='+$stateParams.key+'&index='+0+'&limit='+15).success(function(data,status){
                $scope.html.list = data.response; $rootScope.loading = false;
                $rootScope.loading = false;
                //$scope.html.content =$sce.trustAsHtml($scope.html.list[0].content);
            });
        };

        /*   $scope.searchArticle = function(id){
         $http.get(loocha+"/article/show/"+id)
         .success(function(data){
         $scope.html.content =$sce.trustAsHtml(data);
         });
         };*/

        $scope.$on("articleload", function (ngRepeatFinishedEvent) {
            $(".list-group-item").click(function(e){
                var that = $(e.target),artice_id = that.attr("artice_id");
                $(".list-group-item").removeClass("active");
                that.addClass("active");
                $http.get(loocha+"/article/show/"+artice_id + "?key=" + $scope.html.key)
                    .success(function(data){
                        $scope.html.content =$sce.trustAsHtml(data);
                    });
            }).eq(0).trigger("click");
        });
    }]);
});