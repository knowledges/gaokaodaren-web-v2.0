/**
 * Created by qbl on 2015/10/21.
 */
require(['app'],function(app){
    app.constant("navURL_1","/article/show/3289")//城市
    app.constant("navURL_2","/article/show/3290")//高校
    app.constant("navURL_3","/article/show/3291")//高校
    app.constant("navURL_4","/article/show/3284")//填报
    app.constant("navURL_5","/article/show/3286")//分析
    app.constant("navURL_6","/article/show/3287")//招生
    app.constant("navURL_7","/article/show/3293")//毕业
    app.constant("navURL_8","/article/show/3294")//毕业
    app.constant("navURL_9","/article/show/3295")//咨询
    app.constant("navURL_10","/article/show/4451")//关于我们
    app.constant("navURL_11","/article/show/3282")//志愿意向
    app.controller('cityNav',['$scope','$sce','$http','navURL_1','loocha',function($scope,$sce,$http,navURL_1,loocha){
        $scope.nav = {
            content : ''
        };

        $http.get(loocha+navURL_1)
            .success(function(data){
                $scope.nav.content = $sce.trustAsHtml(data);
                $scope.loading = false;
            });

    }]);
    app.controller('schoolNav',['$scope','$sce','$http','navURL_2','loocha',function($scope,$sce,$http,navURL_2,loocha){
        $scope.nav = {
            content : ''
        };

        $http.get(loocha+navURL_2)
            .success(function(data){
                $scope.nav.content = $sce.trustAsHtml(data);
                $scope.loading = false;
            });
    }]);
    app.controller('marjorNav',['$scope','$sce','$http','navURL_3','loocha',function($scope,$sce,$http,navURL_3,loocha){
        $scope.nav = {
            content : ''
        };

        $http.get(loocha+navURL_3)
            .success(function(data){
                $scope.nav.content = $sce.trustAsHtml(data);
                $scope.loading = false;
            });
    }]);
    app.controller('recipeNav',['$scope','$sce','$http','navURL_4','loocha',function($scope,$sce,$http,navURL_4,loocha){
        $scope.nav = {
            content : ''
        };

        $http.get(loocha+navURL_4)
            .success(function(data){
                $scope.nav.content = $sce.trustAsHtml(data);
                $scope.loading = false;
            });
    }]);
    app.controller('scoreNav',['$scope','$sce','$http','navURL_5','loocha',function($scope,$sce,$http,navURL_5,loocha){
        $scope.nav = {
            content : ''
        };

        $http.get(loocha+navURL_5)
            .success(function(data){
                $scope.nav.content = $sce.trustAsHtml(data);
                $scope.loading = false;
            });
    }]);
    app.controller('policyNav',['$scope','$sce','$http','navURL_6','loocha',function($scope,$sce,$http,navURL_6,loocha){
        $scope.nav = {
            content : ''
        };

        $http.get(loocha+navURL_6)
            .success(function(data){
                $scope.nav.content = $sce.trustAsHtml(data);
                $scope.loading = false;
            });
    }]);
    app.controller('jobNav',['$scope','$sce','$http','navURL_7','loocha',function($scope,$sce,$http,navURL_7,loocha){
        $scope.nav = {
            content : ''
        };

        $http.get(loocha+navURL_7)
            .success(function(data){
                $scope.nav.content = $sce.trustAsHtml(data);
                $scope.loading = false;
            });
    }]);
    app.controller('uniqueNav',['$scope','$sce','$http','navURL_8','loocha',function($scope,$sce,$http,navURL_8,loocha){
        $scope.nav = {
            content : ''
        };

        $http.get(loocha+navURL_8)
            .success(function(data){
                $scope.nav.content = $sce.trustAsHtml(data);
                $scope.loading = false;
            });
    }]);
    app.controller('onlineNav',['$scope','$sce','$http','navURL_9','loocha',function($scope,$sce,$http,navURL_9,loocha){
        $scope.nav = {
            content : ''
        };

        $http.get(loocha+navURL_9)
            .success(function(data){
                $scope.nav.content = $sce.trustAsHtml(data);
                $scope.loading = false;
            });
    }]);
    app.controller('aboutNav',['$scope','$sce','$http','navURL_10','loocha',function($scope,$sce,$http,navURL_10,loocha){
        $scope.nav = {
            content : ''
        };

        $http.get(loocha+navURL_10)
            .success(function(data){
                $scope.nav.content = $sce.trustAsHtml(data);
                $scope.loading = false;
            });
    }]);
    app.controller('exampleNav',['$scope','$sce','$http','navURL_11','loocha',function($scope,$sce,$http,navURL_11,loocha){
        $scope.nav = {
            content : ''
        };

        $http.get(loocha+navURL_11)
            .success(function(data){
                $scope.nav.content = $sce.trustAsHtml(data);
                $scope.loading = false;
            });
    }]);
});
