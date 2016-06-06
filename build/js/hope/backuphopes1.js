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
                                        iteratorSureCls(firsts,obj,v);
                                        iteratorSureCls(seconds,obj,v);
                                        iteratorSureCls(thirds,obj,v);
                                        iteratorSureCls(fourths,obj,v);
                                        iteratorSureCls(fifths,obj,v);
                                    });
                                    obj.state = 1;
                                })
                        }else {
                            angular.forEach(scope.classify.marjors,function(v,i){
                                iteratorSureCls(firsts,obj,v);
                                iteratorSureCls(seconds,obj,v);
                                iteratorSureCls(thirds,obj,v);
                                iteratorSureCls(fourths,obj,v);
                                iteratorSureCls(fifths,obj,v);
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

                scope.rejectMarjorLClsClk = function(obj){
                    $timeout.cancel(_times);
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
                                    iteratorCanelCls(firsts,obj,v);
                                    iteratorCanelCls(seconds,obj,v);
                                    iteratorCanelCls(thirds,obj,v);
                                    iteratorCanelCls(fourths,obj,v);
                                    iteratorCanelCls(fifths,obj,v);
                                });
                                obj.state = 2;
                            })
                    }else {
                        angular.forEach(scope.classify.marjors,function(v,i){
                            iteratorCanelCls(firsts,obj,v);
                            iteratorCanelCls(seconds,obj,v);
                            iteratorCanelCls(thirds,obj,v);
                            iteratorCanelCls(fourths,obj,v);
                            iteratorCanelCls(fifths,obj,v);
                        });
                        if(obj.state ==0 || obj.state== undefined){
                            obj.state = 2;
                        }else if (obj.state == 2){
                            obj.state = 0;
                        }
                    }
                    scope.showMe = !scope.showMe;
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

                function iteratorSureCls(list,parent,child){
                    angular.forEach(list,function(v,i){
                        if(parent.state == undefined || parent.state == 0){

                            if(child.state!= 2){
                                child.state = 1;

                                if(child.id == v.class_id){
                                    v.state = 1;
                                }
                            }

                        }else if (parent.state == 1){
                            if(child.state!= 2){
                                child.state = 0;

                                if(child.id == v.class_id){

                                    v.state = 0;

                                }
                            }

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

                function iteratorCanelCls(list,parent,child){
                    angular.forEach(list,function(v,i){
                        if(parent.state == undefined || parent.state == 0){

                            child.state = 2;

                            if(child.id == v.class_id){
                                v.state = 2;
                            }

                        }else if (parent.state == 2){
                            child.state = 0;

                            if(child.id == v.class_id){
                                v.state = 0;
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
    app.controller('recommendCtrl',['$rootScope','$scope','$http','$timeout','$stateParams','$state','$q','$window','loocha','maskRequest',function($rootScope,$scope,$http,$timeout,$stateParams,$state,$q,$window,loocha,maskRequest){

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
            personality:"",
            personalityBase:"",
            personalityExpectation:"",
            personalityMatching:"",
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
                getPersonalitys(data.fourth.data);
            });
            function getDeparts(data){
                if(data.status == "-1"){
                    alert("登陆失效，请重新登陆");
                    $state.go('login');
                }else if(data.status == 0){
                    $scope.hope.firstDepart = data.response.item2;
                    $scope.hope.secondDepart = data.response.item3;
                    $scope.hope.thirdDepart = data.response.item4;
                    $scope.hope.fourthDepart = data.response.item5;
                    $scope.hope.fifthDepart = data.response.item6;
                }

            }
            function getPersonalitys(data){
                $scope.hope.personality = data.response.pmap.type1;
                $scope.hope.personalityBase = data.response.pmap.type2;
                $scope.hope.personalityExpectation = data.response.pmap.type3;
                $scope.hope.personalityMatching = data.response.pmap.type4;
            }
        }

///////////////////////////////event//////////////////////////////////////////////////////////////////////////////////////////
        var _timer = null;

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

