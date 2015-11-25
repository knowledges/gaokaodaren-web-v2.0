/**
 * Created by qbl on 2015/10/21.
 */
angular.module("gaokaoAPP.navbar.marjor",['ui.router'])
.constant("findMarjorURL",'/depart')
.controller("marjorConCtl",['$scope','$stateParams','$sce','AJAX','navURL_1','departURL','findMarjorURL',function($scope,$stateParams,$sce,AJAX,navURL_1,departURL,findMarjorURL){
        $scope.search = true;
        $scope.back = false;
        $scope.marjor = {
            info:false,
            content:true,
            isfind:true,
            findlist:false,
            key:""
        }

        loading();

        $scope.showInfo = function(id){
            $scope.marjor.info = true;
            $scope.marjor.content = false;
            $scope.isfind = false;
            $scope.marjor.findlist = false;
            $scope.search = false
            $scope.back = true;
            AJAX.getRequest('/article/show/'+id,'GET','')
                .success(function(data,status){
                    $scope.marjor.strHtml = $sce.trustAsHtml(data);
                });
        }

        $scope.findMarjor = function(){
            $scope.marjor.content = false;
            $scope.marjor.findlist = true;
            $scope.search = true;
            $scope.back = true;
            var param = {};
                param.depart_type = $stateParams.type;
                param.key = $scope.marjor.key;
            AJAX.getRequest(findMarjorURL,'GET',param)
                .success(function(data,status){
                    $scope.findList =  data.response;
                });
        }

        function loading(){
            var param = {};
                param.depart_type = $stateParams.type;
            AJAX.getRequest(departURL,'GET', param)
                .success(function(data,status){
                    $scope.marjorType = data.response;
                })
        }

}]);
