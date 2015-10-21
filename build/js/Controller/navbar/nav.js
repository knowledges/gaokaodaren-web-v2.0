/**
 * Created by qbl on 2015/10/21.
 */
angular.module("gaokaoAPP.navbar",[])
//.constant("navURL_1","/article/show/3289")//城市
//.constant("navURL_1","/article/show/3290")//高校
//.constant("navURL_1","/article/show/3291")//高校
.constant("navURL_1","../JSON/nav.html")
.controller('cityNav',['$scope','$sce','AJAX','navURL_1',function($scope,$sce,AJAX,navURL_1){
        $scope.nav = {
            content : ''
        }

        init()
        function init(){
            AJAX.getRequest(navURL_1,'GET','')
                .success(function(data,status){
                    $scope.nav.content = $sce.trustAsHtml(data);
                });
        }

}])
.controller('schoolNav',['$scope','$sce','AJAX','navURL_1',function($scope,$sce,AJAX,navURL_1){
        $scope.nav = {
            content : ''
        }

        init()
        function init(){
            AJAX.getRequest(navURL_1,'GET','')
                .success(function(data,status){
                    $scope.nav.content = $sce.trustAsHtml(data);
                });
        }

}])
.controller('marjorNav',['$scope','$sce','AJAX','navURL_1',function($scope,$sce,AJAX,navURL_1){

        $scope.nav = {
            content : ''
        }

        init()
        function init(){
            AJAX.getRequest(navURL_1,'GET','')
                .success(function(data,status){
                    $scope.nav.content = $sce.trustAsHtml(data);
                });
        }
}]);
