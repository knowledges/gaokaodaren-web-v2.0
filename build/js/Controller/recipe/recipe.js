/**
 * Created by qbl on 2015/10/22.
 */
angular.module('gaokaoAPP.group.recipe.list',[])
    .constant('articleURL',"/article")
.controller('recipeInfoCtr',['$scope','$stateParams','AJAX','articleURL',function($scope,$stateParams,AJAX,articleURL){
        console.log($stateParams)

        $scope.title = {
            list :""
        }

        init();

        function init (){
            var param = {};
                param.index = 0;
                param.limit = 999;
                param.menu_id = $stateParams.itemId;
                param.key="";
            AJAX.getRequest(articleURL,'GET',param)
                .success(function(data,status){
                    debugger;
                    $scope.title.list = data.response.list;
                })
        }
}]);