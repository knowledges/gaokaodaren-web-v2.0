/**
 * Created by qbl on 2015/10/19.
 */
angular.module("gaokaoAPP.temp.tempPage",['ui.router'])
.config(function($stateProvider, $urlRouterProvider){
        $stateProvider
            .state('marjorlist',{
                url:'/{marjorType:[0-9]{1,4}}',
                views:{
                    '': {
                        templateUrl: 'html/temp/tempMarjor.html'
                    },
                    'marjorType@marjorlist': {
                        templateUrl: 'templete/model-navbarCity/navbarMarjor.html'
                    },
                    'marjorList@marjorlist': {
                        templateUrl: 'html/marjor/marjor.html'
                    }
                }
            })
            .state('schoollist',{
                url:'/{type:[0-9]{1,4}}',
                views:{
                    '': {
                        templateUrl: 'html/temp/tempSchool.html'
                    },
                    'schoolType@schoollist': {
                        templateUrl: 'templete/model-navbarCity/navbarSchool.html'
                    },
                    'schoolList@schoollist': {
                        templateUrl: 'html/school/school.html'
                    }
                }
            })
            .state('citylist', {
                url: '/{cityType:[0-9]{1,4}}',
                views: {
                    '': {
                        templateUrl: 'html/temp/tempCity.html'
                    },
                    'cityType@citylist': {
                        templateUrl: 'templete/model-navbarCity/navbarCity.html'
                    },
                    'cityList@citylist': {
                        templateUrl: 'html/city/city.html'
                    }
                }
            });

})
.controller("tempCtr",['$scope',"$location",function($scope,$location){
}]);