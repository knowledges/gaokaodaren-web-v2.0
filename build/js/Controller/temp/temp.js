/**
 * Created by qbl on 2015/10/19.
 */
angular.module("gaokaoAPP.temp.tempPage",['ui.router'])
.config(function($stateProvider, $urlRouterProvider){
        $stateProvider
            .state('citylist', {
                url: '/{cityType:[0-9]{1,4}}',
                views: {
                    '': {
                        templateUrl: 'html/temp/tempPage.html'
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



}])