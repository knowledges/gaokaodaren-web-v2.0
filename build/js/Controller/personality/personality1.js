/**
 * Created by qbl on 2015/11/5.
 */
angular.module('gaokaoAPP.hope.personality',[])
    .constant("personalityURL","../JSON/cool.json")
    .controller("wishTabCtr-cool",['$scope','$timeout','ZYBinfoDATA','personalityURL','AJAX',"loadSelection","loadingFilter",function($scope,$timeout,ZYBinfoDATA,personalityURL,AJAX,loadSelection,loadingFilter){
        $scope.personality = ZYBinfoDATA;
        $scope.isShowPersonality = false;
        $scope.screening = true;

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

        $scope.inputClick = function(id,name,type){
            if(type == 1){
                if($.inArray(name,$scope.graduate_list)>=0){
                    $scope.personality.graduate_option.splice($.inArray(name,$scope.graduate_id),1);
                    $scope.graduate_list.splice($.inArray(name,$scope.graduate_list),1);
                    $scope.graduate_id.splice($.inArray(id,$scope.graduate_id),1);
                }else{
                    $scope.graduate_list.push(name);
                    $scope.graduate_id.push(id);
                    $scope.personality.graduate_option.push(id)
                }
            }else if (type == 2){
                if($.inArray(name,$scope.depear2_list)>=0){
                    $scope.personality.depart_prefer2.splice($.inArray(id,$scope.depear2_id),1);
                    $scope.depear2_list.splice($.inArray(name,$scope.depear2_list),1);
                    $scope.depear2_id.splice($.inArray(name,$scope.depear2_id),1);
                }else{
                    $scope.depear2_list.push(name);
                    $scope.depear2_id.push(id);
                    $scope.personality.depart_prefer2.push(id);
                }
            }else if(type == 4){
                if($.inArray(name,$scope.wish_prefer_list) >=0){
                    $scope.wish_prefer_list.splice($.inArray(name,$scope.wish_prefer_list));
                    $scope.course_ignore_id.splice($.inArray(name,$scope.wish_prefer_id));
                    $scope.personality.wish_prefer.splice($.inArray(name,$scope.wish_prefer_id));
                }else{
                    $scope.wish_prefer_list.push(name);
                    $scope.course_ignore_id.push(id);
                    $scope.personality.wish_prefer.push(id);
                }
            }else if (type == 5){
                if($.inArray(name,$scope.user_prefer_list) >=0){
                    $scope.user_prefer_id.splice($.inArray(name,$scope.user_prefer_id))
                    $scope.user_prefer_list.splice($.inArray(name,$scope.user_prefer_list))
                    $scope.personality.user_prefer.splice($.inArray(name,$scope.user_prefer_id))
                }else{
                    $scope.user_prefer_list.push(name);
                    $scope.user_prefer_id.push(id);
                    $scope.personality.user_prefer.push(id);
                }
            }else if (type == 7){
                if($.inArray(name,$scope.nature_prefer_list) >=0){
                    $scope.nature_prefer_id.splice($.inArray(name,$scope.nature_prefer_id))
                    $scope.nature_prefer_list.splice($.inArray(name,$scope.nature_prefer_list))
                    $scope.personality.nature_prefer.splice($.inArray(name,$scope.nature_prefer_id))
                }else{
                    $scope.nature_prefer_list.push(name);
                    $scope.nature_prefer_id.push(id);
                    $scope.personality.nature_prefer.push(id);
                }
            }else if (type == 8){
                if($.inArray(name,$scope.physical_ignore_list) >=0){
                    $scope.physical_ignore_id.splice($.inArray(name,$scope.physical_ignore_id))
                    $scope.physical_ignore_list.splice($.inArray(name,$scope.physical_ignore_list))
                    $scope.personality.physical_ignore.splice($.inArray(name,$scope.physical_ignore_id))
                }else{
                    $scope.physical_ignore_list.push(name);
                    $scope.physical_ignore_id.push(id);
                    $scope.personality.physical_ignore.push(id);
                }
            }else if (type == 10){
                if($.inArray(name,$scope.course_prefer_list) >=0){
                    $scope.course_prefer_id.splice($.inArray(name,$scope.course_prefer_id))
                    $scope.course_prefer_list.splice($.inArray(name,$scope.course_prefer_list))
                    $scope.personality.course_prefer.splice($.inArray(name,$scope.course_prefer_id))
                }else{
                    $scope.course_prefer_list.push(name);
                    $scope.course_prefer_id.push(id);
                    $scope.personality.course_prefer.push(id);
                }
            }else if (type == 11){
                if($.inArray(name,$scope.course_ignore_list) >=0){
                    $scope.course_ignore_id.splice($.inArray(name,$scope.course_ignore_id))
                    $scope.course_ignore_list.splice($.inArray(name,$scope.course_ignore_list))
                    $scope.personality.course_ignore.splice($.inArray(name,$scope.course_ignore_id))
                }else{
                    $scope.course_ignore_list.push(name);
                    $scope.course_ignore_id.push(id);
                    $scope.personality.course_ignore.push(id);
                }
            }else if (type == 12){
                if($.inArray(name,$scope.gift_prefer_list) >=0){
                    $scope.gift_prefer_id.splice($.inArray(name,$scope.gift_prefer_id))
                    $scope.gift_prefer_list.splice($.inArray(name,$scope.gift_prefer_list))
                    $scope.personality.gift_prefer.splice($.inArray(name,$scope.gift_prefer_id))
                }else{
                    $scope.gift_prefer_list.push(name);
                    $scope.gift_prefer_id.push(id);
                    $scope.personality.gift_prefer.push(id);
                }
            }else if (type == 13){
                if($.inArray(name,$scope.gift_ignore_list) >=0){
                    $scope.gift_ignore_id.splice($.inArray(name,$scope.gift_ignore_id))
                    $scope.gift_ignore_list.splice($.inArray(name,$scope.gift_ignore_list))
                    $scope.personality.gift_ignore.splice($.inArray(name,$scope.gift_ignore_list))
                }else{
                    $scope.gift_ignore_list.push(name);
                    $scope.gift_ignore_id.push(id);
                    $scope.personality.gift_ignore.push(id);
                }
            }

            if($scope.graduate_list.length>0 || $scope.depear2_list.length>0 || $scope.wish_prefer_list.length>0 || $scope.user_prefer_list.length>0 || $scope.nature_prefer_list.length>0 || $scope.physical_ignore_list.length>0 || $scope.course_prefer_list.length>0 || $scope.course_ignore_list.length>0 || $scope.gift_prefer_list.length>0 || $scope.gift_ignore_list.lenth>0 || $scope.economy_option || $scope.prop5|| $scope.prop6){
                $scope.isShowPersonality = true;
            }else {
                $scope.isShowPersonality = false;
            }
        }

        $scope.removeThis = function(index,type,name){
            if(name == undefined){
                if(type == 1){
                    $scope.personality.graduate_option.splice(index,1);
                    $scope.graduate_list.splice(index,1);
                    $scope.graduate_id.splice(index,1);
                }else if(type == 2){
                    $scope.depear2_list.splice(index,1);
                    $scope.depear2_id.splice(index,1);
                    $scope.personality.depart_prefer2.splice(index,1);
                }else if(type == 4){
                    $scope.wish_prefer_list.splice(index,1);
                    $scope.course_ignore_id.splice(index,1);
                    $scope.personality.wish_prefer.splice(index,1);
                }else if(type == 5){
                    $scope.user_prefer_list.splice(index,1);
                    $scope.user_prefer_id.splice(index,1);
                    $scope.personality.user_prefer.splice(index,1);
                }else if(type == 7){
                    $scope.nature_prefer_list.splice(index,1);
                    $scope.nature_prefer_id.splice(index,1);
                    $scope.personality.nature_prefer.splice(index,1);
                }else if(type == 8){
                    $scope.physical_ignore_list.splice(index,1);
                    $scope.physical_ignore_id.splice(index,1);
                    $scope.personality.physical_ignore.splice(index,1);
                }else if(type == 10){
                    $scope.course_prefer_list.splice(index,1);
                    $scope.course_prefer_id.splice(index,1);
                    $scope.personality.course_prefer.splice(index,1);
                }else if(type == 11){
                    $scope.course_ignore_list.splice(index,1);
                    $scope.course_ignore_id.splice(index,1);
                    $scope.personality.course_ignore.splice(index,1);
                }else if(type == 12){
                    $scope.gift_prefer_list.splice(index,1);
                    $scope.gift_prefer_id.splice(index,1);
                    $scope.personality.gift_prefer.splice(index,1);
                }else if(type == 13){
                    $scope.gift_ignore_list.splice(index,1);
                    $scope.gift_ignore_id.splice(index,1);
                    $scope.personality.gift_ignore.splice(index,1);
                }
            }else{
                if (name == "家庭经济") {
                    $scope.personality.economy_option = false;
                } else if (name == "政策照顾加分") {
                    $scope.personality.prop5 = false;
                } else {
                    $scope.personality.prop6 = false;
                }
            }

            if($scope.graduate_list.length<=0 && $scope.depear2_list.length<=0 &&$scope.wish_prefer_list.length<=0 &&$scope.user_prefer_list.length<=0 &&$scope.nature_prefer_list.length<=0 &&$scope.physical_ignore_list.length<=0 && $scope.course_prefer_list.length<=0 && $scope.course_ignore_list.length<=0 && $scope.gift_prefer_list.length<=0 && !$scope.personality.economy_option && !$scope.personality.prop5 && !$scope.personality.prop6){
                $scope.isShowPersonality = false;
            }else{
                $scope.isShowPersonality = true;
            }

        }

        $scope.remove = function(){

            $scope.personality.graduate_option = [];
            $scope.graduate_list = [];
            $scope.graduate_id = [];

            $scope.depear2_list = [];
            $scope.depear2_id = [];
            $scope.personality.depart_prefer2 = [];

            $scope.wish_prefer_list = [];
            $scope.course_ignore_id = [];
            $scope.personality.wish_prefer = [];

            $scope.user_prefer_list = [];
            $scope.user_prefer_id = [];
            $scope.personality.wish_prefer = [];

            $scope.nature_prefer_list = [];
            $scope.nature_prefer_id = [];
            $scope.personality.nature_prefer = [];

            $scope.physical = [];
            $scope.physical_ignore_id = [];
            $scope.personality.physical_ignore = [];

            $scope.course_prefer_list = [];
            $scope.course_prefer_id = [];
            $scope.personality.course_prefer = [];

            $scope.course_ignore_list = [];
            $scope.course_ignore_id = [];
            $scope.personality.course_ignore = [];

            $scope.gift_prefer_list = [];
            $scope.gift_prefer_id = [];
            $scope.personality.gift_prefer = [];

            $scope.gift_ignore_list = [];
            $scope.gift_ignore_id = [];
            $scope.personality.gift_ignore = [];

            $scope.personality.economy_option = false;
            $scope.personality.prop5 = false;
            $scope.personality.prop6 = false;

            $scope.isShowPersonality = false;

        }

        $scope.clickScreen = function(isTure){
            $scope.screening = isTure;
        }


        function loadingGraduates(){
            var html = loadingFilter.loadFilter($scope.items,$scope.personality.graduate_option,1);
            $scope.graduate_list = html.split("-")[0].split(",") == "" ? [] :html.split("-")[0].split(",");
            $scope.graduate_id = html.split("-")[1].split(",") == "" ? [] : html.split("-")[1].split(",");
        }

        function loadingDepear2(){
            var html = loadingFilter.loadFilter($scope.items,$scope.personality.depart_prefer2,1);
            $scope.depear2_list = html.split("-")[0].split(",") == "" ? [] :html.split("-")[0].split(",");
            $scope.depear2_id = html.split("-")[1].split(",") == "" ? [] : html.split("-")[1].split(",");
        }

        function loadingCourse_prefer(){
            var html = loadingFilter.loadFilter($scope.items,$scope.personality.course_prefer,1);
            $scope.course_prefer_list = html.split("-")[0].split(",") == "" ? [] :html.split("-")[0].split(",");
            $scope.course_prefer_id = html.split("-")[1].split(",") == "" ? [] : html.split("-")[1].split(",");
        }

        function loadingCourse_ignore(){
            var html = loadingFilter.loadFilter($scope.items,$scope.personality.course_ignore,1);
            $scope.course_ignore_list = html.split("-")[0].split(",") == "" ? [] :html.split("-")[0].split(",");
            $scope.course_ignore_id = html.split("-")[1].split(",") == "" ? [] : html.split("-")[1].split(",");
        }

        function loadingWish_prefer(){
            var html = loadingFilter.loadFilter($scope.items,$scope.personality.wish_prefer,1);
            $scope.wish_prefer_list = html.split("-")[0].split(",") == "" ? [] :html.split("-")[0].split(",");
            $scope. wish_prefer_id = html.split("-")[1].split(",") == "" ? [] : html.split("-")[1].split(",");
        }

        function loadingUser_prefer(){
            var html = loadingFilter.loadFilter($scope.items,$scope.personality.wish_prefer,1);
            $scope.user_prefer_list = html.split("-")[0].split(",") == "" ? [] :html.split("-")[0].split(",");
            $scope.user_prefer_id = html.split("-")[1].split(",") == "" ? [] : html.split("-")[1].split(",");
        }

        function loadingGift_prefer (){
            var html  = loadingFilter.loadFilter($scope.items,$scope.personality.gift_prefer,1);
            $scope.gift_prefer_list = html.split("-")[0].split(",") == "" ? [] :html.split("-")[0].split(",");
            $scope.gift_prefer_id = html.split("-")[1].split(",") == "" ? [] : html.split("-")[1].split(",");
        }

        function loadingGift_ignore(){
            var html  = loadingFilter.loadFilter($scope.items,$scope.personality.gift_ignore,1);
            $scope.gift_ignore_list =html.split("-")[0].split(",") == "" ? [] :html.split("-")[0].split(",");
            $scope.gift_ignore_id = html.split("-")[1].split(",") == "" ? [] : html.split("-")[1].split(",");
        }

        function loadingNature_prefer(){
            var html  = loadingFilter.loadFilter($scope.items,$scope.personality.nature_prefer,1);
            $scope.nature_prefer_list = html.split("-")[0].split(",") == "" ? [] :html.split("-")[0].split(",");
            $scope.nature_prefer_id = html.split("-")[1].split(",") == "" ? [] : html.split("-")[1].split(",");
        }

        function loadingPhysical_ignore(){
            var html  = loadingFilter.loadFilter($scope.items,$scope.personality.physical_ignore,1);
            $scope.physical_ignore_list = html.split("-")[0].split(",") == "" ? [] :html.split("-")[0].split(",");
            $scope.physical_ignore_id = html.split("-")[1].split(",") == "" ? [] : html.split("-")[1].split(",");
        }

    }]);
