/**
 * Created by qbl on 2015/10/9.
 */
angular.module("gaokaoAPP.hope.selectd",['gaokaoAPP.hope'])
//.constant("provinceURL","/city/province")
.constant("provinceURL","../JSON/province.JSON")
//.constant("propURL","/school/prop?depart_type=1")
.constant("propURL","../JSON/prop.JSON")
.factory("attr",['$http',function($http){
    var reqProvince = function(path){
        return $http({
            url: path,
            method: "GET",
            dataType: "json",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
            }
        });
    }
    var prop = function(path,num){
        return $http({
            url:path,
            method:"GET",
            dataType:"json",
            header:{
                "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
            }
        });
    }
    return {
        getProvince : function(path){
            return reqProvince(path);
        },
        getProp : function(path){
            return prop(path);
        }
    }
}])
.controller("wishTabCtr-attr",['$scope',"$timeout","ZYBinfoDATA","provinceURL","propURL","attr",function($scope,$timeout,ZYBinfoDATA,provinceURL,propURL,attr){
        $scope.attr = ZYBinfoDATA;
        $scope.area = "";
        $scope.areaArr = [];
        $scope.style="";
        $scope.attribute="";
        $scope.belongs="";

        attr.getProvince(provinceURL)
            .success(function(data,status){
                $scope.area = data.response.list;
        });

        attr.getProp(propURL)
            .success(function(data,status){
                var list = data.response;
                var arr_style = [],arr_attr=[],attr_belongs=[];
                var area_list = [];
                for (var i = 0; i < list.length; i++) {
                    if(list[i].type == 0){
                        arr_style.push(list[i]);
                    }else if(list[i].type == 2){
                        arr_attr.push(list[i]);
                    }else if(list[i].type == 1){
                        attr_belongs.push(list[i]);
                    }
                }
                arr_style.join(',');
                arr_attr.join(',');
                attr_belongs.join(',');
                $scope.style = arr_style;
                $scope.attribute = arr_attr;
                $scope.belongs = attr_belongs;
            });

        $timeout(function(){
            $scope.isCheckedCity = function (no) {
                var isok = false;
                for (var i = 0; i < $scope.attr.city_prefer.length; i++) {
                    if (no == $scope.attr.city_prefer[i]) {
                        isok = true;
                        break;
                    }
                }
                return isok;
            }

            $scope.isCheckedStyle = function(no){
                var isok = false;
                for (var i = 0; i < $scope.attr.style_prefer.length; i++) {
                    if (no == $scope.attr.style_prefer[i]) {
                        isok = true;
                        break;
                    }
                }
                return isok;
            }

            $scope.isCheckedAttr = function(no){
                var isok = false;
                for (var i = 0; i < $scope.attr.attr_prefer.length; i++) {
                    if (no == $scope.attr.attr_prefer[i]) {
                        isok = true;
                        break;
                    }
                }
                return isok;
            }

            $scope.isCheckedBelongs = function(no){
                var isok = false;
                for (var i = 0; i < $scope.attr.belongs_prefer.length; i++) {
                    if (no == $scope.attr.belongs_prefer[i]) {
                        isok = true;
                        break;
                    }
                }
                return isok;
            }

            loadingSelCity();
            loadingSelStyle();
            loadingSelAttr();
            loadingBelongs();
        },500);

        function loadingSelCity(){/**加载选中的城市*/
            var area_list=[],area_id = [];
            for(var i =0;i<$scope.area.length;i++){
                for (var j = 0; j < $scope.attr.city_prefer.length; j++) {
                    if($scope.attr.city_prefer[j] == $scope.area[i].id){
                        area_list.push($scope.area[i].name);
                        area_id.push($scope.area[i].id)
                    }
                }
            }
            area_list.join(',');
            area_id.join(',');
            $scope.area_list = area_list;
            $scope.area_id = area_id;
        }

        function loadingSelStyle(){/**加载选中的院校分类*/
            var style_list = [],style_id = [];
            for(var i = 0 ; i<$scope.style.length;i++){
                for(var j =0;j<$scope.attr.style_prefer.length;j++){
                    if($scope.attr.style_prefer[j] == $scope.style[i].id){
                        style_list.push($scope.style[i].name);
                        style_id.push($scope.style[i].id);
                    }
                }
            }
            style_list.join(',');
            style_id.join(',');
            $scope.style_list = style_list;
            $scope.style_id = style_id;
        }

        function loadingSelAttr(){/**加载选中的办学性质 */
            var attr_list=[],attr_id = [];
            for(var i = 0; i< $scope.attribute.length;i++){
                for(var j = 0;j< $scope.attr.attr_prefer;j++){
                    if($scope.attr.attr_prefer[j] == $scope.attribute[i].id){
                        attr_list.push($scope.attribute[i].name);
                        attr_id.push($scope.attribute[i].id);
                    }
                }
            }
            attr_list.join(',');
            attr_id.join(',');
            $scope.attribute_list = attr_list;
            $scope.attribute_id = attr_id;
        }

        function loadingBelongs(){/**加载选中的院校属管*/
            var belongs_list=[],belongs_id = [];
            for(var i = 0; i< $scope.belongs.length;i++){
                for(var j = 0;j< $scope.attr.belongs_prefer;j++){
                    if($scope.attr.belongs_prefer[j] == $scope.belongs[i].id){
                        belongs_list.push($scope.belongs[i].name);
                        belongs_id.push($scope.belongs[i].id);
                    }
                }
            }
            belongs_list.join(',');
            belongs_id.join(',');
            $scope.belongs_list = belongs_list;
            $scope.belongs_id = belongs_id;
        }

/////////////////////////////Event/////////////////////////////////////////////////////////////////////

        $scope.inputClick = function(id,name,number){
            if(number == 1){
                if($.inArray(name,$scope.area_list)>=0){
                    $scope.area_list.splice($.inArray(name,$scope.area_list),1);
                    $scope.area_id.splice($.inArray(id,$scope.area_id),1);
                }else{
                    $scope.area_id.push(id);
                    $scope.area_list.push(name);
                }
                $scope.attr.city_prefer = $scope.area_id;
                console.log($scope.attr.city_prefer );
            }else if(number == 2){
                if($.inArray(name,$scope.style_list)>=0){
                    $scope.style_list.splice($.inArray(name,$scope.style_list),1);
                    $scope.style_id.splice($.inArray(id,$scope.style_id),1);
                }else{
                    $scope.style_list.push(name);
                    $scope.style_id.push(id);
                }
                $scope.attr.style_prefer = $scope.style_id;
                console.log($scope.attr.style_prefer);
            }else if(number == 3){
                if($.inArray(name,$scope.attribute_list)>=0){
                    $scope.attribute_list.splice($.inArray(name,$scope.attribute_list),1);
                    $scope.attribute_id.splice($.inArray(id,$scope.attribute_id),1);
                }else{
                    $scope.attribute_id.push(id);
                    $scope.attribute_list.push(name);
                }
                $scope.attr.attribute_prefer = $scope.attribute_id;
                console.log($scope.attr.attr_prefer);
            }else {
                if($.inArray(name,$scope.belongs_list)>=0){
                    $scope.belongs_list.splice($.inArray(name,$scope.belongs_list),1);
                    $scope.belongs_id.splice($.inArray(id,$scope.belongs_id),1);
                }else{
                    $scope.belongs_id.push(id);
                    $scope.belongs_list.push(name);
                }
                $scope.attr.belongs_prefer = $scope.belongs_id;
                console.log($scope.attr.belongs_prefer);
            }
        }

        $scope.removeAll = function(){
            $scope.area_id = [];
            $scope.area_list=[];
            $scope.attr.city_prefer = [];
        }

        $scope.removeThis = function(name,number){
            if(number == 1){
                $scope.attr.city_prefer.splice($.inArray(name,$scope.area_list),1);
                $scope.area_list.splice($.inArray(name,$scope.area_list),1);
                $scope.area_id.splice($.inArray(name,$scope.area_list),1);
            }else if(number == 2){
                debugger;
                $scope.attr.style_prefer.splice($.inArray(name,$scope.style_list),1);
                $scope.style_list.splice($.inArray(name,$scope.style_list),1);
                $scope.style_id.splice($.inArray(name,$scope.style_list),1);
            }else if(number == 3){
                $scope.attr.attr_prefer.splice($.inArray(name,$scope.attribute_list),1);
                $scope.attribute_list.splice($.inArray(name,$scope.attribute_list),1);
                $scope.attribute_id.splice($.inArray(name,$scope.attribute_list),1);
            }else{
                $scope.attr.belongs_prefer.splice($.inArray(name,$scope.belongs_prefer),1);
                $scope.belongs_list.splice($.inArray(name,$scope.belongs_prefer),1);
                $scope.belongs_id.splice($.inArray(name,$scope.belongs_prefer),1);
            }

        }

}]);
