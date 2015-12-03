/**
 * Created by qbl on 2015/10/13.
 */
require(['app'],function(app){
    app.constant("marjorURL","../JSON/marjor.json");
    app.constant("departURL","/depart/new");
    app.controller("wishTabCtr-colleges",['$scope',"$timeout","ZYBinfoDATA","marjorURL","departURL","AJAX","loadClickEvent","loadDblclickEvent","loadClickAll","loadClickCancle","loadCancleAll",function($scope,$timeout,ZYBinfoDATA,marjorURL,departURL,AJAX,loadClickEvent,loadDblclickEvent,loadClickAll,loadClickCancle,loadCancleAll){

            $scope.marjor = ZYBinfoDATA;
            $scope.isShowColleges = false;
            $scope.screenCollege = true;
            $scope.isMarjor = 0;
            $scope.isMarjorList = 0;
            $scope.zyb = {
                depart_name:[]
            }

            init();

            function init(){

                AJAX.getRequest(marjorURL,'GET',"")
                    .success(function(data,status){
                        $scope.marjorList = data.response;
                        var marjor_list = [];
                        $.each($scope.marjorList,function(key,val){
                            if(ZYBinfoDATA.types == val.type){
                                marjor_list.push(val)
                            }
                        })
                        $scope.marjor_list = marjor_list;
                    });

                var param = {};
                param.depart_type = ZYBinfoDATA.types;
                AJAX.getRequest(departURL,'GET', param)
                    .success(function(data,status){
                        $scope.marjorType = data.response;
                    })
            }

            var TimeFn = null;

            $scope.clickMarjor = function($event,id){
                var then = this.list.name;
                $timeout.cancel(TimeFn);
                TimeFn = $timeout(function(){
                    var target = $event.target,
                        state = $(target).attr('state') == undefined ? 0 : $(target).attr('state');
                    $scope.isMarjor = 1;
                    loadClickEvent.clickEvent(target,state,then,id,$scope.marjor.depart_ignore,$scope.marjor.depart_prefer,$scope.zyb.depart_name);
                },400);
            }

            $scope.clickClass = function($event,id){
                var then = this.list.name;
                $timeout.cancel(TimeFn);
                TimeFn = $timeout(function(){
                    var target = $event.target,
                        state = $(target).attr('state') == undefined ? 0 : $(target).attr('state');
                    $scope.isMarjorList = 1;
                    loadClickEvent.clickEvent(target,state,then,id,$scope.marjor.depart_ignore,$scope.marjor.depart_prefer,$scope.zyb.depart_name);
                },400);
            }

            $scope.dblclickMarjor = function($event,id){
                var then = this.list.name;
                $timeout.cancel(TimeFn);
                var target = $event.target,
                    state = $(target).attr('state') == undefined ? 0 : $(target).attr('state');
                loadDblclickEvent.dblclickEvent(target,state,then,id,$scope.marjor.depart_ignore,$scope.marjor.depart_prefer,$scope.zyb.depart_name);
            }

            $scope.dblclickArticle = function($event,id){
                var then = this.list.name;
                $timeout.cancel(TimeFn);
                var target = $event.target,
                    state = $(target).attr('state') == undefined ? 0 : $(target).attr('state');
                loadDblclickEvent.dblclickEvent(target,state,then,id,$scope.marjor.depart_ignore,$scope.marjor.depart_prefer,$scope.zyb.depart_name);
            }

            $scope.allMarjor = function(){
                var arr = $('button[marjor]');
                loadClickAll.all(arr,$scope.marjor.depart_prefer,'marjor',$scope.zyb.depart_name);
            }

            $scope.allMarList = function(class_id){
                var arr = $("button[class_id="+class_id+"]");
                loadClickAll.all(arr,$scope.marjor.depart_prefer,'article_id',$scope.zyb.depart_name);
            }

            $scope.cancleMarjor = function(){
                var arr = $('button[marjor]');
                loadClickCancle.reject(arr,$scope.marjor.depart_ignore,$scope.marjor.depart_prefer,'marjor',$scope.zyb.depart_name);
            }

            $scope.cancleMarList = function(class_id){
                var arr = $("button[class_id="+class_id+"]");
                loadClickCancle.reject(arr,$scope.marjor.depart_ignore,$scope.marjor.depart_prefer,'article_id',$scope.zyb.depart_name);
            }

            $scope.cancleAll = function(num){
                if(num == 1){
                    loadCancleAll.cancleAll($scope.marjor.depart_prefer,$scope.marjor.depart_ignore,$scope.marjor_list,'marjor');
                }else{
                    loadCancleAll.cancleAll($scope.marjor.depart_prefer,$scope.marjor.depart_ignore,$scope.marjorType,'class_id');
                }
            }

            $scope.clickScreen = function(isTrue){
                $scope.screenCollege = isTrue;
            }
        }]);
});
