/**
 * Created by qbl on 2015/10/23.
 */
require(['app'],function(app){
    app.constant('menuRecipeURL','/menu');
    app.controller('jobMenuCtr',['$scope','AJAX','menuRecipeURL',function($scope,AJAX,menuRecipeURL){
        $scope.menu = {
            menuList : ""
        };
        init();

        function init(){
            var parame = {};
            parame.index = 0;
            parame.limit = 999;
            parame.parent_id = 21;
            AJAX.getRequest(menuRecipeURL,'GET',parame)
                .success(function(data,status){
                    $scope.menu.menuList = data.response.list;
                })
        }
    }]);
});