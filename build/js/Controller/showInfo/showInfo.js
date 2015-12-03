/**
 * Created by qbl on 2015/10/23.
 */
require(['app'],function(app){
    app.controller('onlineInfoCtr',['$scope','$stateParams','$sce','AJAX',function($scope,$stateParams,$sce,AJAX){
        $scope.title = {
            strHtml:"",
        }

        init();

        function init (){
            showInfo($stateParams.param);
        }

        function showInfo(id){
            AJAX.getRequest('/article/show/'+id,'GET','')
                .success(function(data,status){
                    $scope.title.strHtml = $sce.trustAsHtml(data);
                })
        }
    }]);
});

