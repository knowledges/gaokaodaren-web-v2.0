/**
 * Created by qbl on 2015/10/22.
 */
require(['app'],function(app){
    app.controller('recipeMenuCtr',['$scope','$http','loocha',function($scope,$http,loocha){
        $scope.menu = {
            menuList : ""
        };
        init();
        function init(){
            $http.get(loocha+'/menu?index=0&limit=999&parent_id=15').success(function(data){
                $scope.menu.menuList = data.response.list;
            });
        }
    }]);
});

