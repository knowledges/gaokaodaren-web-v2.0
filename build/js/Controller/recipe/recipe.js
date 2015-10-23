/**
 * Created by qbl on 2015/10/22.
 */
angular.module('gaokaoAPP.group.recipe.list',[])
.constant('articleURL',"/article")
.controller('recipeInfoCtr',['$scope','$stateParams','$sce','AJAX','articleURL','menuRecipeURL',function($scope,$stateParams,$sce,AJAX,articleURL,menuRecipeURL){
        console.log($stateParams)

        $scope.title = {
            list :"",
            menuList:"",
            strHtml:"",
            breadcrumb_no:0,
            infoId:[],
            current:0
        }

        init();

        $scope.title.breadcrumb_no = $stateParams.itemId;

        $scope.listInfo = function(id){
            showInfo(id);
        }

        $scope.previous = function(idx){
            $scope.title.current-=1;
            if($scope.title.current<=0){
                return;
            }else{
                debugger;
                showInfo($scope.title.infoId[$scope.title.current]);
            }
        }

        $scope.next = function(idx){
            $scope.title.current+=1;

            if($scope.title.current>=$scope.title.infoId.length){
                $scope.title.current = $scope.title.infoId.length;
                return;
            }else{
                debugger;
                showInfo($scope.title.infoId[$scope.title.current]);
            }


        }

        function init (){
            loadingMenuList();
            loadingInfo($stateParams.itemId);
        }

        function loadingInfo(id){
            var param = {};
            param.index = 0;
            param.limit = 999;
            param.menu_id = id;
            param.key="";
            AJAX.getRequest(articleURL,'GET',param)
                .success(function(data,status){
                    $scope.title.list = data.response.list;

                    var arr = [];
                    $.each(data.response.list,function(i,v){
                        arr.push(v.id);
                    });

                    $scope.title.infoId = arr;

                });
        }

        function loadingMenuList(){
            var parame = {};
            parame.index = 0;
            parame.limit = 999;
            parame.parent_id = $stateParams.param;
            AJAX.getRequest(menuRecipeURL, 'GET', parame)
                .success(function (data, status) {
                    $scope.title.menuList = data.response.list;

                });
        }

        function showInfo(id){
            AJAX.getRequest('/article/show/'+id,'GET','')
                .success(function(data,status){
                    $scope.title.strHtml = $sce.trustAsHtml(data);
                })
        }
}]);