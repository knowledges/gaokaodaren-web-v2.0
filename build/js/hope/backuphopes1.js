/**
 * Created by Administrator on 2016/6/4.
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

    app.directive('personalitysToggle',['$http','$timeout','loocha','maskRequest',function($http,$timeout,loocha,maskRequest){
        return{
            restrict:'EA',
            replace:true,
            transclude:true,
            templateUrl:'templete/btn-group/btn-group-personality.html',
            link:function(scope,element,attrs){
                var _times = null;

                scope.identityAgreeClk = function(obj){
                    $timeout.cancel(_times);
                    _times = $timeout(function(){
                        if(obj.id == 97 ||obj.id == 22 ||obj.id == 42 ||obj.id == 103){
                            return;
                        }
                        var base = scope.hope.personalityBase,
                            expectation = scope.hope.personalityExpectation,
                            matching = scope.hope.personalityMatching;

                        iteratorSure(base,obj);
                        iteratorSure(expectation,obj);
                        iteratorSure(matching,obj);

                    },500);
                };

                scope.identityRejectClk = function(obj){
                    $timeout.cancel(_times);
                    if(obj.id == 97 ||obj.id == 22 ||obj.id == 42){
                        return;
                    }
                    var base = scope.hope.personalityBase,
                        expectation = scope.hope.personalityExpectation,
                        matching = scope.hope.personalityMatching;
                    iteratorCancel(base,obj);
                    iteratorCancel(expectation,obj);
                    iteratorCancel(matching,obj);
                };


                function iteratorSure (list,obj){
                    angular.forEach(list,function(val,idx){
                        if(val.id == obj.id){
                            angular.forEach(val.sublist,function(v,i){
                                if(obj.state == undefined || obj.state == 0 ){
                                    if(obj.id == v.parentId){
                                        if(v.state !=2){
                                            v.state = 1;
                                        }
                                    }
                                }else if(obj.state == 1){
                                    if(obj.id == v.parentId){
                                        if(v.state !=2){
                                            v.state = 0;
                                        }
                                    }
                                }
                            });
                            if(obj.state == undefined || obj.state == 0 ){
                                obj.state = 1;
                            }else if(obj.state == 1){
                                obj.state = 0;
                            }
                        }
                    });
                }

                function iteratorCancel (list,obj){
                    angular.forEach(list,function(val,idx){
                        if(val.id == obj.id){
                            angular.forEach(val.sublist,function(v,i){
                                if(obj.state == undefined || obj.state == 0){
                                    if(obj.id == v.parentId){
                                        v.state = 2;
                                    }
                                }else if (obj.state == 2){
                                    if(obj.id == v.parentId){
                                        v.state = 0;
                                    }
                                }
                            });
                            if(obj.state == undefined || obj.state == 0 ){
                                obj.state = 2;
                            }else if(obj.state == 2){
                                obj.state = 0;
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
            personality:"",
            personalityBase:"",
            personalityExpectation:"",
            personalityMatching:"",
        };

        init();

        function init(){
            $q.all({
                first:$http.get(loocha + '/wish/area?batch=' + $scope.hope.type,{cache: false}),
                second: $http.get(loocha + '/schbath?type=' + $scope.hope.type,{cache: false}),
                third:$http.get(loocha + '/batch?type=' + $scope.hope.type,{cache: false}),
                fourth:$http.get(loocha + "/depart/personality",{cache: false})
            }).then(function(data){
                //getAreas(data.first.data);
                //getSchlTypes(data.second.data);
                //getDeparts(data.third.data);
                getPersonalitys(data.fourth.data);
            });

            function getPersonalitys(data){
                $scope.hope.personality = data.response.pmap.type1;
                $scope.hope.personalityBase = data.response.pmap.type2;
                $scope.hope.personalityExpectation = data.response.pmap.type3;
                $scope.hope.personalityMatching = data.response.pmap.type4;
            }
        }

///////////////////////////////event//////////////////////////////////////////////////////////////////////////////////////////
        var _timer = null;

        $scope.identityClk = function(obj){
            if(obj.show==true){
                obj.show = false;
            }else{
                obj.show = true;
            }
        };

        $scope.agreePersonality = function(obj){

            $timeout.cancel(_timer);
            _timer = $timeout(function(){

                if(obj.state == undefined || obj.state == 0){
                    obj.state = 1;
                }else if( obj.state == 1){
                    obj.state = 0;
                }

            },500)
        };

        $scope.rejectPersonality = function(obj){
            $timeout.cancel(_timer);
            if(obj.state == undefined || obj.state == 0){
                obj.state = 2;
            }else if( obj.state == 2){
                obj.state = 0;
            }
        };


        $scope.agreePersonl = function(obj){
            $timeout.cancel(_timer);
            _timer = $timeout(function(){
                var list = obj.sublist;
                angular.forEach(list,function(v,i){
                    if(obj.state == undefined || obj.state == 0){
                        if(v.state !=2 ){
                            v.state = 1;
                        }
                    }else if(obj.state == 1){
                        if(v.state !=2 ){
                            v.state = 0;
                        }
                    }
                });

                if(obj.state == undefined || obj.state == 0){
                    obj.state = 1;
                }else if(obj.state == 1){
                    obj.state = 0;
                }

            },500);
        };

        $scope.rejectPersonl = function(obj){
            $timeout.cancel(_timer);
            var list = obj.sublist;

            angular.forEach(list,function(v,i){
                if(obj.state == undefined || obj.state == 0){
                    v.state = 2;
                }else if(obj.state == 2){
                    v.state = 0;
                }
            });

            if(obj.state == undefined || obj.state == 0){
                obj.state = 2;
            }else if(obj.state == 2){
                obj.state = 0;
            }
        };

    }]);
});

