/**
 * Created by qbl on 2015/10/22.
 */
require(['app'],function(app){
    app.directive('isActive',['$stateParams',function($stateParams){
        return{
            restrict: 'A',
            link:function(scope,elm,attr){
                if(scope.$last == true){
                    var list = $(".list-group-item");
                    for(var i =0;i<list.length;i++){
                        $(".list-group-item").eq(i).removeClass("active");
                    }
                    var idx = $stateParams.active !=undefined ? $stateParams.active :0;
                    $(".list-group-item").eq(idx).addClass("active");
                }
            }
        }
    }]);
    app.controller('recipeMenuCtr',['$scope','$http','menuRecipeURL',function($scope,$http,menuRecipeURL){
        $scope.menu = {
            menuList : ""
        };
        init();
        function init(){
            $http.get('/loocha/menu?index=0&limit=999&parent_id=15').success(function(data){
                $scope.menu.menuList = data.response.list;
            });
        }
    }]);
});

