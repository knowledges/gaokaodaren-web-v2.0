/**
 * Created by qbl on 2015/10/22.
 */
require(['app'],function(app){
    app.constant('menuRecipeURL','/menu');
    app.controller('recipeMenuCtr',['$scope','AJAX','menuRecipeURL',function($scope,AJAX,menuRecipeURL){
        $scope.menu = {
            menuList : ""
        }
        init();
        function init(){
            var parame = {};
            parame.index = 0;
            parame.limit = 999;
            parame.parent_id = 15;
            AJAX.getRequest(menuRecipeURL,'GET',parame)
                .success(function(data,status){
                    $scope.menu.menuList = data.response.list;
                });
        }
    }]);
});

