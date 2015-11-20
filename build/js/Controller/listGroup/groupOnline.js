/**
 * Created by qbl on 2015/10/23.
 */
angular.module('gaokaoAPP.group.online',[])
.constant('articleURL','/article')
.controller('onlineMenuCtr',['$scope','AJAX','articleURL',function($scope,AJAX,articleURL){
        $scope.menu = {
            menuList : ""
        }
        init();
        function init(){
            var parame = {};
            parame.index = 0;
            parame.limit = 999;
            parame.menu_id = 93;
            parame.key="";
            AJAX.getRequest(articleURL,'GET',parame)
                .success(function(data,status){
                    $scope.menu.menuList = data.response.list;
                })
        }


    }]);