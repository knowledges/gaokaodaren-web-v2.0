/**
 * Created by qbl on 2015/10/23.
 */
angular.module("gaokaoAPP.temp.online.showInfo",[])
.controller('onlineInfoCtr',['$scope','$stateParams','$sce','AJAX','articleURL','menuRecipeURL',function($scope,$stateParams,$sce,AJAX,articleURL,menuRecipeURL){
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

