/**
 * Created by qbl on 2015/10/23.
 */
require(['app'],function(app){
    app.constant('menuRecipeURL','/menu');
    app.controller('uniqueMenuCtr',['$scope','$http','loocha','menuRecipeURL',function($scope,$http,loocha,menuRecipeURL){
        $scope.menu = {
            menuList : ""
        };
        init();
        function init(){
            var param = {};
                param.index = 0;
                param.limit = 999;
                param.parent_id = 22;

            $http({
                url:loocha+menuRecipeURL,
                method:"GET",
                params:param
            })
            .success(function(data){
                $scope.menu.menuList = data.response.list;
            });
        }
    }]);
});