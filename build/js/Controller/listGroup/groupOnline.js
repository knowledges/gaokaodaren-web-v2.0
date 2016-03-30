/**
 * Created by qbl on 2015/10/23.
 */
require(['app'], function (app) {
    app.constant('articleURL','/depth');
    app.controller('onlineMenuCtr',['$scope','$http','loocha','articleURL',function($scope,$http,loocha,articleURL){
            $scope.menu = {
                menuList : ""
            };
            init();
            function init(){
                var param = {};
                    param.index = 0;
                    param.limit = 999;
                    param.menu_id = 93;
                    param.key="";

                $http({
                    url:loocha+articleURL,
                    method:"GET",
                    params:param
                })
                .success(function(data){
                    $scope.menu.menuList = data.response.list;
                });
            }
        }]);
});
