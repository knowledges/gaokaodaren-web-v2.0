/**
 * Created by qbl on 2015/10/21.
 */
require(['app'],function(app){
    app.controller('marjorInfoCtr',['$scope','$sce','AJAX','navURL_1',,function($scope,$sce,AJAX,navURL_1){
        $scope.marjorInfo = {
            strHtml:""
        }

        AJAX.getRequest(navURL_1,'GET','')
            .success(function(data,status){
                $scope.marjor.strHtml = $sce.trustAsHtml(data);
            });
    }]);
});