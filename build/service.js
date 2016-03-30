/**
 * Created by qbl on 2015/11/20.
 */
angular.module('gaokaoApp.factory',[])
.constant("logoutURL","/logout")//ע��
//��ҳ8��ģ��
.constant("men2","/menu?index=0&limit=8&parent_id=15")
.constant("men3","/menu?index=0&limit=8&parent_id=16")
.constant("men4","/menu?index=0&limit=4&parent_id=17")
.constant("men5","/menu?index=0&limit=4&parent_id=21")
.constant("men6","/menu?index=0&limit=8&parent_id=22")
.constant("men7","/depth?index=0&limit=8&menu_id=93&key=")
.factory('AJAX',['$http',"$q",function($http,$q){
    var request = function(path,method,data){
        if(method == undefined || method == 'GET'){
            return $http({
                url:path,
                method: 'GET',
                params:data,
            })
        }else{
            var dfd = $q.defer();
            var transform = function (data) {
                return $.param(data);
            }
            var postCfg = {
                transformRequest:transform,
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
                }
            }
            var promise = $http.post(path,data,postCfg).then(function (response) {
                return dfd.resolve(response) ;
            });
            return dfd.promise;
        }
    }
    return {
        getRequest : function(path,method,data){
            return request(path,method,data);
        }
    }
}])
.factory('homeService',function(){
    return {
        htmlPage:""
    }
})
.factory('newService',['$http','$q','AJAX','provinceURL','men2','men3','men4','men5','men6','men7',function($http,$q,AJAX,provinceURL,men2,men3,men4,men5,men6,men7){
    var response = function(url){
        var dtd = $q.defer();
        $http.get(url).then(function (response) {
            dtd.resolve(response);
        }, function (response) {
            dtd.resolve(response);
        });
        return dtd.promise;
    }
    return {
        getProvinceURL: function () {
            /**ʡ��*/
            return response(provinceURL);
        },
        getHomeModel2: function () {
            /**�Ҫ��*/
            return response(men2);
        },
        getHomeModel3: function () {
            /**��������*/
            return response(men3);
        },
        getHomeModel4: function () {
            /**��������*/
            return response(men4);
        },
        getHomeModel5: function () {
            /**��ҵȥ��*/
            return response(men5);
        },
        getHomeModel6: function () {
            /**��������*/
            return response(men6);
        },
        getHomeModel7: function () {
            /**��ѯ��·*/
            return response(men7);
        },
    }
}])
