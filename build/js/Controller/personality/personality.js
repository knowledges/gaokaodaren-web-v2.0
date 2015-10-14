/**
 * Created by qbl on 2015/10/13.
 */
angular.module('gaokaoAPP.hope.personality',[])
.constant("personalityURL","../JSON/cool.json")
.factory("loadingFilter",[function(){
    return {
        loadFilter:function(item,list,is){
            var hmtl = [],id = [],
                items = item.length,len = list.length;
            for(var i = 0 ; i< items; i++){
                if(item[i].list!=undefined ){
                    for(var j = 0; j<item[i].list.length;j++){
                        for(var k = 0 ; k<len;k++){
                            if(list[k] == item[i].list[j].id && $.inArray(list[k],id)<0){
                                id.push(item[i].list[j].id);
                                hmtl.push(item[i].list[j].name);
                            }
                        }
                    }
                }
            }
            hmtl.join(',');
            id.join(',');
            return hmtl+"-"+id;
        }
    }
}])
.controller("wishTabCtr-cool",['$scope','$timeout','ZYBinfoDATA','personalityURL','AJAX',"loadSelection","loadingFilter",function($scope,$timeout,ZYBinfoDATA,personalityURL,AJAX,loadSelection,loadingFilter){
        $scope.personality = ZYBinfoDATA;
        AJAX.getRequest(personalityURL,'GET',"")
            .success(function(data,status){
                $scope.items = data.response;
                var graduate_list = [],depart_list=[],course_list=[],wish_list=[],hobby_list=[],
                    gift_list = [],nature_list = [],physical_list = [],prop_list = [];
                $.each(data.response,function(idx,elem){
                    if(elem.type == 1){
                        graduate_list.push(elem);
                    }else if (elem.type == 2){
                        depart_list.push(elem)
                    }else if(elem.type ==3){
                        course_list.push(elem);
                    }else if(elem.type == 4){
                        wish_list.push(elem);
                    }else if(elem.type == 5){
                        hobby_list.push(elem);
                    }else if (elem.type == 6){
                        gift_list.push(elem);
                    }else if (elem.type == 7){
                        nature_list.push(elem);
                    }else if (elem.type == 8){
                        physical_list.push(elem);
                    }else {
                        prop_list.push(elem);
                    }
                })
                graduate_list.join(',');
                depart_list.join(',');
                course_list.join(',');
                wish_list.join(',');
                hobby_list.join(',');
                gift_list.join(',');
                nature_list.join(',');
                physical_list.join(',');
                prop_list.join(',');
                $scope.graduate = graduate_list;
                $scope.depart2 = depart_list;
                $scope.course = course_list;
                $scope.wish = wish_list;
                $scope.hobby = hobby_list;
                $scope.gift = gift_list;
                $scope.nature = nature_list;
                $scope.physical = physical_list;
                $scope.prop = prop_list;
            });

        $timeout(function(){

            $scope.isCheckedGraduate = function(no){ /**加载选中的毕业项目*/
                return loadSelection.defultsChecked($scope.personality.graduate_option,no);
            };

            $scope.isCheckedDepeart = function(no){ /**加载选中的专业方面*/
                return loadSelection.defultsChecked($scope.personality.depart_prefer2,no);
            };

            $scope.isCheckedCourse_prefer = function(no){ /**加载选中的学科强方面*/
                return loadSelection.defultsChecked($scope.personality.course_prefer,no);
            }

            $scope.isCheckedCourse_ignore = function(no){ /**加载选中的学科弱方面*/
                return loadSelection.defultsChecked($scope.personality.course_ignore,no);
            }

            $scope.isCheckedWish = function(no){ /**加载选中的学习愿望方面*/
                return loadSelection.defultsChecked($scope.personality.wish_prefer,no);
            }

            $scope.isCheckedBohhy = function(no){ /**加载选中的学习愿望方面*/
                return loadSelection.defultsChecked($scope.personality.user_prefer,no);
            }

            $scope.isCheckedGift_prefer = function(no){ /**加载选中的能力特长方面*/
                return loadSelection.defultsChecked($scope.personality.gift_prefer,no);
            }

            $scope.isCheckedGift_ignore = function(no){ /**加载选中的能力特长方面*/
                return loadSelection.defultsChecked($scope.personality.gift_ignore,no);
            }

            $scope.isCheckedNature = function(no){ /**加载选中的学习愿望方面*/
                return loadSelection.defultsChecked($scope.personality.nature_prefer,no);
            }

            $scope.isCheckedPhysical = function(no){ /**加载选中的学习愿望方面*/
                return loadSelection.defultsChecked($scope.personality.physical_ignore,no);
            }

            loadingGraduates();
            loadingDepear2();
            loadingCourse_prefer();
            loadingCourse_ignore();
            loadingWish_prefer();
            loadingUser_prefer();
            loadingGift_prefer();
            loadingGift_ignore();
            loadingNature_prefer();
            loadingPhysical_ignore();
        },500);

        function loadingGraduates(){
            var html = loadingFilter.loadFilter($scope.items,$scope.personality.graduate_option);
            $scope.graduate_list = html.split("-")[0].split(",");
            $scope.graduate_id = html.split("-")[1].split(",");
        }

        function loadingDepear2(){
            var html = loadingFilter.loadFilter($scope.items,$scope.personality.depart_prefer2);
            $scope.depear2_list = html.split("-")[0].split(",");
            $scope.depear2_id = html.split("-")[1].split(",");
        }

        function loadingCourse_prefer(){
            var html = loadingFilter.loadFilter($scope.items,$scope.personality.course_prefer);
            $scope.course_prefer_list = html.split("-")[0].split(",");
            $scope.course_prefer_id = html.split("-")[1].split(",");
        }

        function loadingCourse_ignore(){
            var html = loadingFilter.loadFilter($scope.items,$scope.personality.course_ignore);
            $scope.course_ignore_list = html.split("-")[0].split(",");
            $scope.course_ignore_id = html.split("-")[1].split(",");
        }

        function loadingWish_prefer(){
            var html = loadingFilter.loadFilter($scope.items,$scope.personality.wish_prefer);
            $scope.wish_prefer_list = html.split("-")[0].split(",");
            $scope. wish_prefer_id = html.split("-")[1].split(",");
        }

        function loadingUser_prefer(){
            var html = loadingFilter.loadFilter($scope.items,$scope.personality.wish_prefer);
            $scope.user_prefer_list = html.split("-")[0].split(",");
            $scope.user_prefer_id = html.split("-")[1].split(",");
        }

        function loadingGift_prefer (){
            var html  = loadingFilter.loadFilter($scope.items,$scope.personality.gift_prefer);
            $scope.gift_prefer_list = html.split("-")[0].split(",");
            $scope.gift_prefer_id = html.split("-")[1].split(",");
        }

        function loadingGift_ignore(){
            var html  = loadingFilter.loadFilter($scope.items,$scope.personality.gift_ignore);
            $scope.gift_ignore_list = html.split("-")[0].split(",");
            $scope.gift_ignore_id = html.split("-")[1].split(",");
        }

        function loadingNature_prefer(){
            var html  = loadingFilter.loadFilter($scope.items,$scope.personality.nature_prefer);
            $scope.nature_prefer_list = html.split("-")[0].split(",");
            $scope.nature_prefer_id = html.split("-")[1].split(",");
        }

        function loadingPhysical_ignore(){
            var html  = loadingFilter.loadFilter($scope.items,$scope.personality.physical_ignore);
            $scope.physical_ignore_list = html.split("-")[0].split(",");
            $scope.physical_ignore_id = html.split("-")[1].split(",");
        }

}]);
