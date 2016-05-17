/**
 * Created by qbl on 2015/9/23.
 */
'use strict';

require(['app'], function (app) {
    app.controller("aboutCtr", ["$scope","$http","$sce","loocha",function ($scope,$http,$sce,loocha) {
        $scope.insertHTML="";
        $http.get(loocha+"/article/show/4451")
            .success(function(data){
                $scope.insertHTML = $sce.trustAsHtml(data);
            });
    }]);
});
