/**
 * Created by Administrator on 2016/6/7.
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
    app.directive('areasToggle',['$http','$timeout','loocha','maskRequest',function($http,$timeout,loocha,maskRequest){
        return{
            restrict:'EA',
            replace:true,
            transclude:true,
            templateUrl:'templete/btn-group/btn-group-areas.html',
            link:function(scope,element,attrs){
                scope.classify = {
                    provinces:"",
                };

                scope.showMe = false;
                var _times = null;
                scope.toggleDown = function(obj){
                    if(obj.isRequest == undefined) {
                        maskRequest.getMethod(loocha + '/wish/areatype?batch=' +scope.hope.type+ '&city_id=' +  obj.city_id )
                            .then(function (data) {
                                scope.classify.provinces = data.response;
                                obj.isRequest = true;
                            })
                    }
                    scope.showMe = !scope.showMe;
                };

            }

        }
    }]);
    app.directive('citysToggle',['$http','$q','$timeout','loocha','maskRequest',function($http,$q,$timeout,loocha,maskRequest){
        return{
            restrict:'EA',
            replace:true,
            transclude:true,
            templateUrl:'templete/btn-group/btn-group-citys.html',
            link:function(scope,element,attrs){
                scope.classify = {
                    schoolList:""
                };
                scope.showMe = false;

                scope.getSchoolsByCitysId = function(obj){
                    if(obj.isShow == undefined){
                        $http.get(loocha + '/schbath/depart?cityId=' + obj.city_id + '&type=' + scope.hope.type)
                            .success(function (data) {
                                scope.classify.schoolList = data.response;
                                scope.showMe = !scope.showMe;
                            });
                    }else{
                        if( scope.showMe == true){
                            scope.showMe = false;
                        }else{
                            scope.showMe = true;
                        }
                    }
                };

                var _timer = null;
                scope.agreeCityBySchools = function(obj){
                    $timeout.cancel(_timer);
                    _timer = $timeout(function(){
                        if(obj.state == undefined || obj.state == 0){
                            console.log('0');
                            obj.state = 1;
                        }else if (obj.state == 1){
                            console.log('1');
                            obj.state = 0;
                        }
                    },500);
                };

                scope.rejectCityBySchools = function(obj){
                    $timeout.cancel(_timer);
                    if(obj.state == undefined || obj.state == 0){
                        obj.state = 2;

                        var param = {};
                        param.type = $scope.reject.batch;
                        param.style = $scope.reject.style;
                        param.belongs = $scope.reject.belongs;
                        param.attr = $scope.reject.attribute;
                        param.prop3 = $scope.reject.prop3;
                        param.prop4 = $scope.reject.prop4;
                        param.prop5 = $scope.reject.prop5;
                        param.prop6 = $scope.reject.prop6;
                        param.prop8 = $scope.reject.prop8;
                        param.citys = $scope.reject.citys;
                        //TODO 请求

                    }else if (obj.state == 2){
                        obj.state = 0;
                    }
                };

                function getSchoolsArray(param){
                    var deferred = $q.defer();
                    $http({
                        url:loocha+"/schbath",
                        method:"GET",
                        params:param
                    }).success(function(data){
                        deferred.resolve(data);
                    });
                    return deferred.promise;
                }
            }

        }
    }]);
    app.controller('recommendCtrl',['$rootScope','$scope','$http','$timeout','$stateParams','$state','$q','$window','loocha','maskRequest',function($rootScope,$scope,$http,$timeout,$stateParams,$state,$q,$window,loocha,maskRequest){

        $scope.hope = {
            type:$stateParams.batch,
            area:"",
            js_province:"",
            firstCities:"",
            secondCities:"",
            thirdCities:"",
            fourthCities:"",
            fifthCities:"",
            schools:"",
            schoolList:"",
            attrs:"",
            styles:"",
            props:"",
            belongs:"",
        };
        $scope.sure = {
            attr:"",
            belongs:"",
            style:"",
            prop3:"",
            prop4:"",
            prop5:"",
            prop6:"",
            prop8:"",
            citys:"",
        };
        $scope.reject = {
            attr:"",
            belongs:"",
            style:"",
            prop3:"",
            prop4:"",
            prop5:"",
            prop6:"",
            prop8:"",
            citys:"",
        };

        init();


        function init(){

            $q.all({
                first:$http.get(loocha + '/wish/area?batch=' + $scope.hope.type,{cache: false}),
                second: $http.get(loocha + '/schbath?type=' + $scope.hope.type,{cache: false}),
                third:$http.get(loocha + '/batch?type=' + $scope.hope.type,{cache: false}),
                fourth:$http.get(loocha + "/depart/personality",{cache: false})
            }).then(function(data){
                getAreas(data.first.data);
                getSchlTypes(data.second.data);
                //getDeparts(data.third.data);
                //getPersonalitys(data.fourth.data);
            });

            function getAreas(data){
                $scope.hope.area = data.response.item1;
                $scope.hope.js_province = data.response.item2;
                $scope.hope.firstCities = data.response.item3;
                $scope.hope.secondCities = data.response.item4;
                $scope.hope.thirdCities = data.response.item5;
                $scope.hope.fourthCities = data.response.item6;
                $scope.hope.fifthCities = data.response.item7;
            }

            function getSchlTypes(data){
                $scope.hope.schools = data.response;
            }

        }

///////////////////////////////event//////////////////////////////////////////////////////////////////////////////////////////
        var _timer =null;

        $scope.atrlistClk = function(e){
            var isTrue = $scope.hope.attrs.isShow;
            if (isTrue == undefined) {
                $http.get(loocha + '/school/prop?type=2&depart_type=' + $scope.hope.type).success(function (data) {
                    $scope.hope.attrs =  data.response;
                    $scope.hope.attrs.isShow = true;
                });
            }else{
                if(isTrue == true){
                    $scope.hope.attrs.isShow = false;
                }else{
                    $scope.hope.attrs.isShow = true;
                }
            }
        };
        $scope.stylistClk = function(){
            var isTrue = $scope.hope.styles.isShow;
            if (isTrue == undefined) {
                $http.get(loocha + '/school/prop?type=0&depart_type=' + $scope.hope.type).success(function (data) {
                    $scope.hope.styles =  data.response;
                    $scope.hope.styles.isShow = true;
                });
            }else{
                if(isTrue == true){
                    $scope.hope.styles.isShow = false;
                }else{
                    $scope.hope.styles.isShow = true;
                }
            }
        };
        $scope.proplistClk = function(){
            var isTrue = $scope.hope.props.isShow;
            if (isTrue == undefined) {
                var url = "";
                if($scope.hope.type<=6){
                    url=loocha + '/school/attr?type=' + $scope.hope.type;
                }else {
                    url="../JSON/shuxing.json"
                }
                $http.get(url).success(function (data) {
                    $scope.hope.props =  data.response;
                    $scope.hope.props.isShow = true;
                });
            }else{
                if(isTrue == true){
                    $scope.hope.props.isShow = false;
                }else{
                    $scope.hope.props.isShow = true;
                }
            }
        };
        $scope.belongslistClk = function(){
            var isTrue = $scope.hope.belongs.isShow;
            if (isTrue == undefined) {
                $http.get(loocha + '/school/prop?type=1&depart_type='+$scope.hope.type).success(function (data) {
                    $scope.hope.belongs =  data.response;
                    $scope.hope.belongs.isShow = true;
                });
            }else{
                if(isTrue == true){
                    $scope.hope.belongs.isShow = false;
                }else{
                    $scope.hope.belongs.isShow = true;
                }
            }
        };

        $scope.agreeSchool = function(obj){
            $timeout.cancel(_timer);
            _timer = $timeout(function(){
                var state = obj.state;
                if(state == undefined || state == 0){
                    obj.state = 1;
                }else if (state == 1){
                    obj.state = 0;
                }
            },500);
        };

        $scope.rejectSchool = function(obj){
            $timeout.cancel(_timer);
            var state = obj.state;
            if(state == undefined || state == 0){
                obj.state = 2;
            }else if (state == 2){
                obj.state = 0;
            }
        };

        $scope.agreeSchl = function(e){
            $timeout.cancel(_timer);
            _timer = $timeout(function(){

                var that = $(e.target),wish_id = that.attr('wishid'),state = that.attr("state");
                angular.forEach($scope.hope.schools,function(v,i){
                    if(v.swish_id == wish_id){

                        if(v.state != 2){

                            if(state == undefined || state == 0){
                                v.state = 1;
                            }else if ( state == 1 ){
                                v.state = 0;
                            }

                        }

                    }
                });

                if(state == undefined || state == 0){
                    that.attr('state',1).removeClass('agree reject cancel').addClass('agree');
                }else if ( state == 1 ){
                    that.attr('state',0).removeClass('agree reject cancel').addClass('cancel');
                }

            },500);
        };

        $scope.rejectSchl = function(e){
            $timeout.cancel(_timer);
            var that = $(e.target),wish_id = that.attr('wishid'),state = that.attr("state");
            angular.forEach($scope.hope.schools,function(v,i){
                if(v.swish_id == wish_id){

                    if(state == undefined || state == 0){
                        v.state = 2;
                    }else if ( state == 2 ){
                        v.state = 0;
                    }
                }
            });

            if(state == undefined || state == 0){
                that.attr('state',2).removeClass('agree reject cancel').addClass('reject');
            }else if ( state == 2 ){
                that.attr('state',0).removeClass('agree reject cancel').addClass('cancel');
            }

        };

        $scope.getCollegeByAttrClk=function(obj,num){
            if(num == 1){
                $scope.sure.attrs = obj.id;
            }else if (num == 2){
                $scope.sure.style = obj.id;
            }else if (num == 3){
                $scope.sure.belongs = obj.id;
            }

            if(obj.state == undefined || obj.state == 0){

                obj.state = 1;
            }else if(obj.state == 1){
                obj.state = 0;
            }
        };

        function getCollegeMethod(){
            var params = {};
            params.attr = "";
            params.style = "";
            params.belongs = "";
            params.prop3 = "";
            params.prop4 = "";
            params.prop5 = "";
            params.prop6 = "";
            params.prop8 = "";
            params.type = $scope.hope.type;

            $http({
                url:loocha+'/schbath',
                method:'GET',
                param:params
            }).success(function(data){

            });
        }

    }]);

});