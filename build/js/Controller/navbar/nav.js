/**
 * Created by qbl on 2015/10/21.
 */
angular.module("gaokaoAPP.navbar",[])
.constant("navURL_1","/article/show/3289")//城市
.constant("navURL_2","/article/show/3290")//高校
.constant("navURL_3","/article/show/3291")//高校
.constant("navURL_4","/article/show/3284")//填报
.constant("navURL_5","/article/show/3286")//分析
.constant("navURL_6","/article/show/3287")//招生
.constant("navURL_7","/article/show/3293")//毕业
.constant("navURL_8","/article/show/3294")//毕业
.constant("navURL_9","/article/show/3295")//咨询
.constant("navURL_10","/article/show/4451")//关于我们
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
.controller('schoolNav',['$scope','$sce','AJAX','navURL_2',function($scope,$sce,AJAX,navURL_2){
        $scope.nav = {
            content : ''
        }

        init()
        function init(){
            AJAX.getRequest(navURL_2,'GET','')
                .success(function(data,status){
                    $scope.nav.content = $sce.trustAsHtml(data);
                });
        }

}])
.controller('marjorNav',['$scope','$sce','AJAX','navURL_3',function($scope,$sce,AJAX,navURL_3){

        $scope.nav = {
            content : ''
        }

        init()
        function init(){
            AJAX.getRequest(navURL_3,'GET','')
                .success(function(data,status){
                    $scope.nav.content = $sce.trustAsHtml(data);
                });
        }
}])
.controller('recipeCtr',['$scope','$sce','AJAX','navURL_4',function($scope,$sce,AJAX,navURL_4){

        $scope.nav = {
            content : ''
        }

        init()
        function init(){
            AJAX.getRequest(navURL_4,'GET','')
                .success(function(data,status){
                    $scope.nav.content = $sce.trustAsHtml(data);
                });
        }
    }])
.controller('scoreNav',['$scope','$sce','AJAX','navURL_5',function($scope,$sce,AJAX,navURL_5){

        $scope.nav = {
            content : ''
        }

        init()
        function init(){
            AJAX.getRequest(navURL_5,'GET','')
                .success(function(data,status){
                    $scope.nav.content = $sce.trustAsHtml(data);
                });
        }
    }])
.controller('policyNav',['$scope','$sce','AJAX','navURL_6',function($scope,$sce,AJAX,navURL_6){

    $scope.nav = {
        content : ''
    }

    init()
    function init(){
        AJAX.getRequest(navURL_6,'GET','')
            .success(function(data,status){
                $scope.nav.content = $sce.trustAsHtml(data);
            });
    }
}])
.controller('jobNav',['$scope','$sce','AJAX','navURL_7',function($scope,$sce,AJAX,navURL_7){

        $scope.nav = {
            content : ''
        }

        init()
        function init(){
            AJAX.getRequest(navURL_7,'GET','')
                .success(function(data,status){
                    $scope.nav.content = $sce.trustAsHtml(data);
                });
        }
    }])
.controller('uniqueNav',['$scope','$sce','AJAX','navURL_8',function($scope,$sce,AJAX,navURL_8){

        $scope.nav = {
            content : ''
        }

        init()
        function init(){
            AJAX.getRequest(navURL_8,'GET','')
                .success(function(data,status){
                    $scope.nav.content = $sce.trustAsHtml(data);
                });
        }
    }])
.controller('onlineNav',['$scope','$sce','AJAX','navURL_9',function($scope,$sce,AJAX,navURL_9){

        $scope.nav = {
            content : ''
        }

        init()
        function init(){
            AJAX.getRequest(navURL_9,'GET','')
                .success(function(data,status){
                    $scope.nav.content = $sce.trustAsHtml(data);
                });
        }
    }])
.controller('aboutNav',['$scope','$sce','AJAX','navURL_10',function($scope,$sce,AJAX,navURL_10){

        $scope.nav = {
            content : ''
        }

        init()
        function init(){
            AJAX.getRequest(navURL_10,'GET','')
                .success(function(data,status){
                    $scope.nav.content = $sce.trustAsHtml(data);
                });
        }
    }])