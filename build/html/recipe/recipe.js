/**
 * Created by qbl on 2015/10/22.
 */
require(['app'],function(app){
    app.constant('articleURL',"/article");
    app.directive('isLoading',['$rootScope',function($rootScope){
        return{
            restrict: 'A',
            link:function(scope){
                if(scope.$last == true){
                    $rootScope.loading=false;
                }
            }
        }
    }]);
    app.directive('isActive',['$stateParams',function($stateParams){
        return{
            restrict: 'A',
            link:function(scope,elm,attr){
                if(scope.$last == true){
                    $(".list-group-item").removeClass('active');
                    var idx = $stateParams.active !=undefined ? $stateParams.active :0;
                    $(".list-group-item").eq(idx).addClass("active");
                }
                $(".list-group-item").on('click',function(event){
                    $(".list-group-item").removeClass('active');
                    $(this).addClass('active');
                });
            }
        }
    }]);
    app.controller("recipeInfoCtr",['$scope','$stateParams','$http','$sce','loocha','articleURL','menuRecipeURL',function($scope,$stateParams,$http,$sce,loocha,articleURL,menuRecipeURL){
        $scope.title = {
            list :"",
            menuList:"",
            strHtml:"",
            breadcrumb_no:0,
            infoId:[],
            current:0
        };

        init();
        $scope.title.breadcrumb_no = $stateParams.itemId;

        $scope.listInfo = function(id){
            showInfo(id);
        };

        $scope.previous = function(idx){
            $scope.title.current-=1;
            if($scope.title.current<=0){
                return;
            }else{
                showInfo($scope.title.infoId[$scope.title.current]);
            }
        }

        $scope.next = function(idx){
            $scope.title.current+=1;

            if($scope.title.current>=$scope.title.infoId.length){
                $scope.title.current = $scope.title.infoId.length;
                return;
            }else{
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

            $http({
                url:loocha+articleURL,
                method:"GET",
                params:param
            })
                .success(function(data){
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
            $http({
                url:loocha+menuRecipeURL,
                method:"GET",
                params:parame
            })
                .success(function (data, status) {
                    $scope.title.menuList = data.response.list;

                });
        }

        function showInfo(id){
            $http.get(loocha+'/article/show/'+id)
                .success(function(data,status){
                    $scope.title.strHtml = $sce.trustAsHtml(data);
                });
        }
    }]);
});
