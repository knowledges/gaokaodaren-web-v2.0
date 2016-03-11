/**
 * Created by qbl on 2016/2/1.
 */
require(['app'],function(app){
    app.controller('referCtr',['$scope',function($scope){
        $scope.showModel = function(){
            $("#myModal").show();
        }
        $scope.showMarjor = function(){
            $("#zyb_marjor").show();
        };
        $scope.reqOrder = function(){
            $("#zyb_random").show();
        }
    }]);
});