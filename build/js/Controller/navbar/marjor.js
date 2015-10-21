/**
 * Created by qbl on 2015/10/21.
 */
angular.module("gaokaoAPP.navbar.marjor",['ui.router'])
//.constant("findMarjorURL",'/depart')
    .constant("findMarjorURL",'../JSON/marjorinfo.json')
.controller("marjorConCtl",['$scope','$stateParams','$sce','AJAX','navURL_1','departURL','findMarjorURL',function($scope,$stateParams,$sce,AJAX,navURL_1,departURL,findMarjorURL){
        console.log($stateParams);

        $scope.marjor = {
            isnav:true,
            ismarjor:false,
            info:false,
            isfind:false,
            strHtml:"",
            key:""
        }

        if($stateParams.marjorType == 0){
            $scope.marjor.isnav = true;
            getNav();
        }else{
            $scope.marjor.isnav = false;
            $scope.marjor.ismarjor = true;
            $scope.marjor.info = false;
            loading();
        }

        $scope.showInfo = function(id){
            //console.log(id);
            $scope.marjor.isnav = false;
            $scope.marjor.ismarjor = false;
            $scope.marjor.isfind = false;
            $scope.marjor.info = true;

            //AJAX.getRequest('/article/show/3307','GET','')
            AJAX.getRequest(navURL_1,'GET','')
                .success(function(data,status){
                    $scope.marjor.strHtml = $sce.trustAsHtml(data);
                });



        }

        $scope.findMarjor = function(){
            $scope.marjor.isnav = false;
            $scope.marjor.ismarjor = false;
            $scope.marjor.info = false;
            $scope.marjor.isfind = true;

            //AJAX.getRequest(findMarjorURL,'GET',$.param({"depart_type":$stateParams.marjorType,"key":$scope.marjor.key}))
            AJAX.getRequest(findMarjorURL,'GET',$.param({"depart_type":$stateParams.marjorType,"key":$scope.marjor.key}))
                .success(function(data,status){
                    $scope.findList =  data.response;
                    debugger;
                });
        }

        function loading(){
            AJAX.getRequest(departURL,'GET', $.param({"depart_type":$stateParams.marjorType}))
                .success(function(data,status){
                    $scope.marjorType = data.response;
                })
        }


        function getNav(){
            //AJAX.getRequest('/article/show/3291','GET','')
            AJAX.getRequest(navURL_1, 'GET', "")
                .success(function (data, status) {
                    $scope.marjor.strHtml = $sce.trustAsHtml(data);
                });
        }

}]);
