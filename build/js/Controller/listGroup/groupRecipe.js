/**
 * Created by qbl on 2015/10/22.
 */
angular.module('gaokaoAPP.group.recipe',[])
.constant('menuRecipeURL','/menu')
.controller('recipeMenuCtr',['$scope','AJAX','menuRecipeURL',function($scope,AJAX,menuRecipeURL){

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
                    debugger;
                    $scope.menu.menuList = data.response.list;
                })
        }


}])
