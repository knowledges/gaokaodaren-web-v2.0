/**
 * Created by qbl on 2015/10/13.
 */
angular.module("gaokaoAPP.hope.college",[])
.constant("marjorURL","../JSON/marjor.json")
.constant("departURL","../JSON/marjorType.json")
//.constant("departURL","/depart/new")
.factory("DATA",['$http',function($http){
    var request = function(path){
        return $http({
            url: path,
            method: "GET",
            dataType: "json",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
            }
        });
    }
    var paramterRequest = function(path,option){
        return $http({
            url: path,
            method: "GET",
            dataType: "json",
            data:$.param({"depart_type":option.depar_type}),
            headers: {
                "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
            }
        })
    }
    return{
        getRequest:function(path){
            return request(path);
        },
        getParmRequest:function(path,option){
            return paramterRequest(path,option);
        }
    }
}])
.controller("wishTabCtr-colleges",['$scope',"$timeout","ZYBinfoDATA","marjorURL","departURL","DATA",function($scope,$timeout,ZYBinfoDATA,marjorURL,departURL,DATA){        $scope.marjor = ZYBinfoDATA;
        $scope.marjor = ZYBinfoDATA;
        console.log(marjorURL);
        DATA.getRequest(marjorURL)
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

        DATA.getParmRequest(departURL,{"depart_type":ZYBinfoDATA.types})
            .success(function(data,status){
                $scope.marjorType = data.response;
            })

        $timeout(function(){
            $scope.isCheckedMarjor = function(no){
                var isok = false;
                for (var i = 0; i < $scope.marjor.depart_prefer.length; i++) {
                    if (no == $scope.marjor.depart_prefer[i]) {
                        isok = true;
                        break;
                    }
                }
                return isok;
            }
            loadingSelMarjor();
        },500);

        $scope.inputClick = function(id,name){
            if($.inArray(name,$scope.depart_list)>=0){
                $scope.depart_id.splice($.inArray(id,$scope.depart_id),1);
                $scope.depart_list.splice($.inArray(name,$scope.depart_list),1);
            }else{
                $scope.depart_id.push(id);
                $scope.depart_list.push(name);
            }
        }

        $scope.removeThis = function(name){
            $scope.marjor.depart_prefer.splice($.inArray(name,$scope.depart_list),1);
            $scope.depart_list.splice($.inArray(name,$scope.depart_list),1);
            $scope.depart_id.splice($.inArray(name,$scope.depart_list),1);
        }
        $scope.removeAll = function(){
            $scope.depart_id=[];
            $scope.depart_list=[];
            $scope.marjor.depart_prefer = [];
        }

        function loadingSelMarjor(){ /**加载选中的专业*/
            var depart_list = [],depart_id = [];
            for(var i = 0 ; i<$scope.marjor_list.length;i++){
                for(var j = 0; j<$scope.marjor.depart_prefer.length;j++){
                    if($scope.marjor.depart_prefer[j] == $scope.marjorList[i].id){
                        depart_list.push($scope.marjorList[i].name);
                        depart_id.push($scope.marjorList[i].id);
                    }
                }
            }

            for(var i = 0 ; i<$scope.marjorType.length;i++){
                for(var j = 0 ; j<$scope.marjorType[i].list.length;j++){
                    for(var k = 0; k<$scope.marjor.depart_prefer.length;k++){
                        if($scope.marjor.depart_prefer[k] == $scope.marjorType[i].list[j].id && $.inArray($scope.marjor.depart_prefer[k],depart_id)<0){
                            depart_list.push($scope.marjorType[i].list[j].name);
                            depart_id.push($scope.marjorType[i].list[j].id);
                        }
                    }
                }
            }

            depart_id.join(',');
            depart_list.join(',');
            $scope.depart_id = depart_id;
            $scope.depart_list = depart_list;
        }
}]);