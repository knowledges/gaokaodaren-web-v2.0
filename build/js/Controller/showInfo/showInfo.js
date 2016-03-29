/**
 * Created by qbl on 2015/10/23.
 */
require(['app'],function(app){
    app.controller('onlineInfoCtr',['$scope','$stateParams','$sce','$http','loocha',function($scope,$stateParams,$sce,$http,loocha){
        $scope.title = {
            strHtml:"",
        };

        init();

        function init (){
            showInfo($stateParams.param);
        }

        function showInfo(id){
            $http.get(loocha+'/article/show/'+id)
                .success(function(data){
                    $scope.title.strHtml = $sce.trustAsHtml(data);
                    $scope.loading=false;
                });
        }
    }]);
});

