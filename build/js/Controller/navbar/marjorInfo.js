/**
 * Created by qbl on 2015/10/21.
 */
require(['app'],function(app){
    app.directive('onFinishRender',['$rootScope','$timeout',function($rootScope,$timeout){
        return{
            restrict: 'A',
            link:function(scope,elm,attr){
                if(scope.$last === true) {
                    $rootScope.loading = false;
                    $timeout(function () {
                        scope.$emit(attr.onFinishRender);
                    });
                }
            }
        }
    }]);
    app.controller('marjorInfoCtr',['$scope','$sce','AJAX','navURL_1',,function($scope,$sce,AJAX,navURL_1){
        $scope.marjorInfo = {
            strHtml:""
        }

        AJAX.getRequest(navURL_1,'GET','')
            .success(function(data,status){
                $scope.marjor.strHtml = $sce.trustAsHtml(data);
            });

        $scope.$on('methodname',function(){
            var idx = $stateParams.type !=undefined ? $stateParams.type :0;
            $(".panel-body li").removeClass('actived').eq(idx).addClass("actived");

            $(".panel-body li").on('click',function(e){
                $(".panel-body li").removeClass('actived');
                $(this).addClass('actived');
            });
        })

    }]);
});