/**
 * Created by Administrator on 2016/5/27.
 */
require(['app'], function (app) {

    app.factory('maskRequest',['$http','$q',function($http,$q){
        return{
           getMethod:function(url){
               var deferred = $q.defer();
               $http.get(url)
                   .success(function(d){
                       deferred.resolve(d);
                   });
               return deferred.promise;
           }
        }
    }]);

    app.directive('departsToggle',['$http','$timeout','loocha','maskRequest',function($http,$timeout,loocha,maskRequest){
        return{
            restrict:'EA',
            replace:true,
            transclude:true,
            templateUrl:'templete/btn-group/btn-group-depart.html',
            link:function(scope,element,attrs){
                scope.classify = {
                    marjors:""
                };

                scope.showMe = false;
                var _times = null;
                scope.preferMarjorLClsClk = function(obj){
                    $timeout.cancel(_times);
                    _times =$timeout(function(){
                        var firsts = scope.hope.firstDepart,
                            seconds = scope.hope.secondDepart,
                            thirds = scope.hope.thirdDepart,
                            fourths = scope.hope.fourthDepart,
                            fifths = scope.hope.fifthDepart;
                        if(obj.isRequest == undefined) {
                            maskRequest.getMethod(loocha + '/depart/specific?course_id=' + obj.id + '&depart_type=' + scope.hope.type)
                                .then(function (data) {
                                    scope.classify.marjors = data.response;
                                    obj.isRequest = true;
                                    angular.forEach(scope.classify.marjors,function(v,i){
                                        iteratorSure(firsts,v,v.id,obj.state);
                                        iteratorSure(seconds,v,v.id,obj.state);
                                        iteratorSure(thirds,v,v.id,obj.state);
                                        iteratorSure(fourths,v,v.id,obj.state);
                                        iteratorSure(fifths,v,v.id,obj.state);
                                    });
                                    obj.state = 1;
                                })
                        }else {
                            angular.forEach(scope.classify.marjors,function(v,i){
                                iteratorSure(firsts,v,v.id,obj.state);
                                iteratorSure(seconds,v,v.id,obj.state);
                                iteratorSure(thirds,v,v.id,obj.state);
                                iteratorSure(fourths,v,v.id,obj.state);
                                iteratorSure(fifths,v,v.id,obj.state);
                            });
                            if(obj.state ==0 || obj.state== undefined){
                                obj.state = 1;
                            }else if (obj.state == 1){
                                obj.state = 0;
                            }
                        }
                        scope.showMe = !scope.showMe;
                    },500);
                };

                scope.toggleDown = function(obj){
                    if(obj.isRequest == undefined) {
                        maskRequest.getMethod(loocha + '/depart/specific?course_id=' + obj.id + '&depart_type=' + scope.hope.type)
                            .then(function (data) {
                                scope.classify.marjors = data.response;
                                obj.isRequest = true;
                            })
                    }
                    scope.showMe = !scope.showMe;
                };

                scope.preferMarjorSClsClk = function(obj){
                    $timeout.cancel(_times);
                    _times = $timeout(function(){
                        var state = obj.state, id = obj.id;
                        var firsts = scope.hope.firstDepart,
                            seconds = scope.hope.secondDepart,
                            thirds = scope.hope.thirdDepart,
                            fourths = scope.hope.fourthDepart,
                            fifths = scope.hope.fifthDepart;

                        iteratorSure(firsts,obj,id,state);
                        iteratorSure(seconds,obj,id,state);
                        iteratorSure(thirds,obj,id,state);
                        iteratorSure(fourths,obj,id,state);
                        iteratorSure(fifths,obj,id,state);

                        scope.showMe = !scope.showMe;
                    },500);
                };

                scope.rejectMarjorSClsClk = function(obj){
                    $timeout.cancel(_times);
                    var state = obj.state, id = obj.id;
                    var firsts = scope.hope.firstDepart,
                        seconds = scope.hope.secondDepart,
                        thirds = scope.hope.thirdDepart,
                        fourths = scope.hope.fourthDepart,
                        fifths = scope.hope.fifthDepart;

                        iteratorCancel(firsts,obj,id,state);
                        iteratorCancel(seconds,obj,id,state);
                        iteratorCancel(thirds,obj,id,state);
                        iteratorCancel(fourths,obj,id,state);
                        iteratorCancel(fifths,obj,id,state);

                    scope.showMe = !scope.showMe;
                };

                function iteratorSureCls(list,parent,obj,child){
                    angular.forEach(list,function(v,i){
                        if(parent.state == undefined || parent.state == 0){

                            if(obj.state!= 2){
                                obj.state = 1;
                            }

                        }else if (parent.state == 1){


                        }
                    });
                };

                function iteratorSure (list,obj,class_id,state){
                    angular.forEach(list,function(v,i){
                        if(state == undefined || state == 0 ){
                            obj.state = 1;
                            if(class_id == v.class_id){
                                if(v.state !=2){
                                    v.state = 1;
                                }
                            }
                        }else if(state == 1){
                            obj.state = 0;
                            if(class_id == v.class_id){
                                if(v.state !=2){
                                    v.state = 0;
                                }
                            }
                        }
                    });
                }

                function iteratorCancel (list,obj,class_id,state){
                    angular.forEach(list,function(v,i){
                        if(state == undefined || state == 0){
                            obj.state = 2;
                            if(class_id == v.class_id){
                                v.state = 2;
                            }
                        }else if (state == 2){
                            obj.state = 0;
                            if(class_id == v.class_id){
                                v.state = 0;
                            }
                        }
                    });
                }
            }
        }
    }]);
    app.controller('recommendCtrl',['$rootScope','$scope','$http','$timeout','$stateParams','$q','$window','loocha','maskRequest',function($rootScope,$scope,$http,$timeout,$stateParams,$q,$window,loocha,maskRequest){

        $scope.hope = {
            type:$stateParams.batch,
            marjorLargeCls:[],
            //marjorSmallCls:[],
            marjor:[],
            firstDepart:"",
            secondDepart:"",
            thirdDepart:"",
            fourthDepart:"",
            fifthDepart : "",
        };

        init();


        function init(){
            var type = $scope.hope.type,url="";

            if(type <= 6){
                url = loocha+'/depart/prop?type=0&depart_type=0';
            }else{
                url = loocha+'/depart/prop?type=0&depart_type=1';
            }

            maskRequest.getMethod(url)
                .then(function(data){
                    $.each(data.response, function (i, v) {
                        if(type <=6){
                            if (i < 13) {
                                $scope.hope.marjorLargeCls.push(v);
                            }
                        }else{
                            if (i < 19) {
                                $scope.hope.marjorLargeCls.push(v);
                            }
                        }
                    });
                });

            $q.all({
                first:$http.get(loocha + '/wish/area?batch=' + $scope.hope.type,{cache: false}),
                second: $http.get(loocha + '/schbath?type=' + $scope.hope.type,{cache: false}),
                third:$http.get(loocha + '/batch?type=' + $scope.hope.type,{cache: false}),
                fourth:$http.get(loocha + "/depart/personality",{cache: false})
            }).then(function(data){
                //getAreas(data.first.data);
                //getSchlTypes(data.second.data);
                getDeparts(data.third.data);
                //getPersonalitys(data.fourth.data);
            });

            function getDeparts(data){
                $scope.hope.firstDepart = data.response.item2;
                $scope.hope.secondDepart = data.response.item3;
                $scope.hope.thirdDepart = data.response.item4;
                $scope.hope.fourthDepart = data.response.item5;
                $scope.hope.fifthDepart = data.response.item6;
            }
        }

///////////////////////////////event//////////////////////////////////////////////////////////////////////////////////////////
        var _timer =null;
        $scope.agreeDepart = function(obj){
            $timeout.cancel(_timer);
            _timer = $timeout(function(){
                var state = obj.state;
                if(state == 0 || state == undefined){
                    obj.state = 1;
                }else if (state == 1){
                    obj.state = 0 ;
                }
            },500);
        };

        $scope.rejectDepart = function(obj){
            $timeout.cancel(_timer);
            var state = obj.state;
            if(state == 0 || state == undefined){
                obj.state = 2;
            }else if (state == 2){
                obj.state = 0 ;
            }
        };

        $scope.agreeDep = function(e){
            $timeout.cancel(_timer);
            _timer = $timeout(function(){
                var that = e.target,wishId = $(that).attr("wishid"),list = "",state = $(that).attr("state");
                if(wishId == 2){
                    list = $scope.hope.firstDepart;
                }else if (wishId == 3){
                    list = $scope.hope.secondDepart;
                }else if (wishId == 4){
                    list = $scope.hope.thirdDepart;
                }else if (wishId == 5){
                    list = $scope.hope.fourthDepart;
                }else if (wishId == 6){
                    list = $scope.hope.fifthDepart;
                }

                angular.forEach(list,function(v,i){
                    if(state == undefined || state == 0 ){
                        $(that).attr("state",1);
                        if(v.state !=2){
                            v.state = 1;
                        }
                    }else if (state == 1){
                        $(that).attr("state",0);
                        if(v.state !=2){
                            v.state = 0;
                        }
                    }
                });
            },500);
        };

        $scope.rejectDep = function(e){
            $timeout.cancel(_timer);
            var that = e.target,wishId = $(that).attr("wishid"),list = "",state = $(that).attr("state");
            if(wishId == 2){
                list = $scope.hope.firstDepart;
            }else if (wishId == 3){
                list = $scope.hope.secondDepart;
            }else if (wishId == 4){
                list = $scope.hope.thirdDepart;
            }else if (wishId == 5){
                list = $scope.hope.fourthDepart;
            }else if (wishId == 6){
                list = $scope.hope.fifthDepart;
            }
            angular.forEach(list,function(v,i){
                if(state == undefined || state == 0 ){
                    $(that).attr("state",2);
                    v.state = 2;
                }else if (state == 2){
                    $(that).attr("state",0);
                    v.state = 0;
                }
            });
        };
    }]);
});

