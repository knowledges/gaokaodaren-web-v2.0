/**
 * Created by qbl on 2015/10/13.
 */
angular.module('gaokaoAPP.hope.personality',[])
    .constant("personalityURL","../JSON/cool.json")
    .controller("wishTabCtr-cool",['$scope','$timeout','ZYBinfoDATA','personalityURL','AJAX',"loadClickEvent","loadDblclickEvent","loadClickAll","loadClickCancle",function($scope,$timeout,ZYBinfoDATA,personalityURL,AJAX,loadClickEvent,loadDblclickEvent,loadClickAll,loadClickCancle){
        $scope.personality = ZYBinfoDATA;
        $scope.isShowPersonality = false;
        $scope.screening = true;

        $scope.zyb = {
            graduate_name:[],
            graduate_ignore:[],
            depart_name:[],
            course_name:[],
            wish_name:[],
            user_name:[],
            gift_name:[],
            nature_name:[],
            nature_ignore:[],
            physical_prefer:[],
            physical_name:[],
            prop_name:[],
        }

        init();

        function init (){
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

        }

        var TimeFn = null;
/////////////////////////单击///////////////////////////////////////////////////
        $scope.clickEveGraduate = function($event,id){
            var then = this.list.name;
            $timeout.cancel(TimeFn);
            TimeFn = $timeout(function(){
                var target = $event.target,
                    state = $(target).attr('state') == undefined ? 0 : $(target).attr('state');
                loadClickEvent.clickEvent(target,state,then,id,$scope.zyb.graduate_ignore,$scope.personality.graduate_option,$scope.zyb.graduate_name);
            },400);

        }

        $scope.clickEveDepart = function($event,id){
            var then = this.list.name;
            $timeout.cancel(TimeFn);
            TimeFn = $timeout(function(){
                var target = $event.target,
                    state = $(target).attr('state') == undefined ? 0 : $(target).attr('state');
                loadClickEvent.clickEvent(target,state,then,id,$scope.personality.depart_ignore2,$scope.personality.depart_prefer2,$scope.zyb.depart_name);
            },400);
        }

        $scope.clickEveCourse = function($event,id){
            var then = this.list.name;
            $timeout.cancel(TimeFn);
            TimeFn = $timeout(function(){
                var target = $event.target,
                    state = $(target).attr('state') == undefined ? 0 : $(target).attr('state');
                loadClickEvent.clickEvent(target,state,then,id,$scope.personality.course_ignore,$scope.personality.course_prefer,$scope.zyb.course_name);
            },400);
        }

        $scope.clickEveWish = function($event,id){
            var then = this.list.name;
            $timeout.cancel(TimeFn);
            TimeFn = $timeout(function(){
                var target = $event.target,
                    state = $(target).attr('state') == undefined ? 0 : $(target).attr('state');
                loadClickEvent.clickEvent(target,state,then,id,$scope.personality.wish_ignore,$scope.personality.wish_prefer,$scope.zyb.wish_name);
            },400);
        }

        $scope.clickEveUser = function($event,id){
            var then = this.list.name;
            $timeout.cancel(TimeFn);
            TimeFn = $timeout(function(){
                var target = $event.target,
                    state = $(target).attr('state') == undefined ? 0 : $(target).attr('state');
                loadClickEvent.clickEvent(target,state,then,id,$scope.personality.user_ignore,$scope.personality.user_prefer,$scope.zyb.user_name);
            },400);
        }

        $scope.clickEveGift = function($event,id){
            var then = this.list.name;
            $timeout.cancel(TimeFn);
            TimeFn = $timeout(function(){
                var target = $event.target,
                    state = $(target).attr('state') == undefined ? 0 : $(target).attr('state');
                loadClickEvent.clickEvent(target,state,then,id,$scope.personality.gift_ignore,$scope.personality.gift_prefer,$scope.zyb.gift_name);
            },400);
        }

        $scope.clickEveNature = function($event,id){
            var then = this.list.name;
            $timeout.cancel(TimeFn);
            TimeFn = $timeout(function(){
                var target = $event.target,
                    state = $(target).attr('state') == undefined ? 0 : $(target).attr('state');
                loadClickEvent.clickEvent(target,state,then,id,$scope.personality.nature_ignore,$scope.personality.nature_prefer,$scope.zyb.nature_name);
            },400);
        }

//////////////////////双击/////////////////////////////////////////////////////////////////
        $scope.dblclickEveGraduate = function($event,id){
            var then = this.list.name;
            $timeout.cancel(TimeFn);
            var target = $event.target,
                state = $(target).attr('state') == undefined ? 0 : $(target).attr('state');
            loadDblclickEvent.dblclickEvent(target,state,then,id,$scope.zyb.graduate_ignore,$scope.personality.graduate_option,$scope.zyb.graduate_name);
        }

        $scope.dblclickEveDepart = function($event,id){
            var then = this.list.name;
            $timeout.cancel(TimeFn);
            var target = $event.target,
                state = $(target).attr('state') == undefined ? 0 : $(target).attr('state');
            loadDblclickEvent.dblclickEvent(target,state,then,id,$scope.personality.depart_ignore2,$scope.personality.depart_prefer2,$scope.zyb.depart_name);
        }

        $scope.dblclickEveCourse = function($event,id){
            var then = this.list.name;
            $timeout.cancel(TimeFn);
            var target = $event.target,
                state = $(target).attr('state') == undefined ? 0 : $(target).attr('state');
            loadDblclickEvent.dblclickEvent(target,state,then,id,$scope.personality.course_ignore,$scope.personality.course_prefer,$scope.zyb.course_name);
        }

        $scope.dblclickEveWish = function($event,id){
            var then = this.list.name;
            $timeout.cancel(TimeFn);
            var target = $event.target,
                state = $(target).attr('state') == undefined ? 0 : $(target).attr('state');
            loadDblclickEvent.dblclickEvent(target,state,then,id,$scope.personality.wish_ignore,$scope.personality.wish_prefer,$scope.zyb.wish_name);
        }

        $scope.dblclickEveUser = function($event,id){
            var then = this.list.name;
            $timeout.cancel(TimeFn);
            var target = $event.target,
                state = $(target).attr('state') == undefined ? 0 : $(target).attr('state');
            loadDblclickEvent.dblclickEvent(target,state,then,id,$scope.personality.user_ignore,$scope.personality.user_prefer,$scope.zyb.user_name);
        }

        $scope.dblclickEveGift = function($event,id){
            var then = this.list.name;
            $timeout.cancel(TimeFn);
            var target = $event.target,
                state = $(target).attr('state') == undefined ? 0 : $(target).attr('state');
            loadDblclickEvent.dblclickEvent(target,state,then,id,$scope.personality.gift_ignore,$scope.personality.gift_prefer,$scope.zyb.gift_name);
        }

        $scope.dblclickEveNature = function($event,id){
            var then = this.list.name;
            $timeout.cancel(TimeFn);
            var target = $event.target,
                state = $(target).attr('state') == undefined ? 0 : $(target).attr('state');
            loadDblclickEvent.dblclickEvent(target,state,then,id,$scope.personality.nature_ignore,$scope.personality.nature_prefer,$scope.zyb.nature_name);
        }

        $scope.dblclickEvePhysical = function($event,id){
            var then = this.list.name;
            $timeout.cancel(TimeFn);
            var target = $event.target,
                state = $(target).attr('state') == undefined ? 0 : $(target).attr('state');
            loadDblclickEvent.dblclickEvent(target,state,then,id,$scope.personality.physical_ignore,$scope.personality.physical_prefer,$scope.zyb.physical_name);
        }
//////////////////////////////////全选////////////////////////////////////////////////////////////////////
        $scope.allGraduate = function(id){
            var arr = $('button[parent='+id+']');
            loadClickAll.all(arr,$scope.personality.graduate_option,'graduate',$scope.zyb.graduate_name);
        }

        $scope.allDepart = function(id){
            var arr = $('button[parent='+id+']');
            loadClickAll.all(arr,$scope.personality.depart_prefer2,'depart',$scope.zyb.depart_name);
        }

        $scope.allCourse = function(id){
            var arr = $('button[parent1='+id+']');
            loadClickAll.all(arr,$scope.personality.course_prefer,'course1',$scope.zyb.course_name);

            var arr = $('button[parent2='+id+']');

            for (var i = 0; i < arr.length; i++) {
                arr.eq(i).attr('state',0).removeClass().addClass("btn btn-sm btn-default");
            }
            $scope.personality.course_ignore = [];
        }

        $scope.allWish = function(id){
            var arr = $('button[parent='+id+']');
            loadClickAll.all(arr,$scope.personality.wish_prefer,'wish',$scope.zyb.wish_name);
        }

        $scope.allUser = function(id){
            var arr = $('button[parent='+id+']');
            loadClickAll.all(arr,$scope.personality.user_prefer,'user',$scope.zyb.user_name);
        }

        $scope.allGift = function(id){
            var arr = $('button[parent1='+id+']');
            loadClickAll.all(arr,$scope.personality.gift_prefer,'gift1',$scope.zyb.gift_name);

            var arr = $('button[parent2='+id+']');

            for (var i = 0; i < arr.length; i++) {
                arr.eq(i).attr('state',0).removeClass().addClass("btn btn-sm btn-default");
            }
            $scope.personality.gift_ignore = [];
        }

        $scope.allNature = function(id){
            var arr = $('button[parent='+id+']');
            loadClickAll.all(arr,$scope.personality.nature_prefer,'nature',$scope.zyb.nature_name);
        }
///////////////////////////////////拒绝/////////////////////////////////////////////////////////////////

        $scope.cancleGraduate = function(id){
            var arr = $('button[parent='+id+']');
            loadClickCancle.reject(arr,$scope.zyb.graduate_ignore,$scope.personality.graduate_option,'graduate',$scope.zyb.graduate_name);
        }

        $scope.cancleDepart = function(id){
            var arr = $('button[parent='+id+']');
            loadClickCancle.reject(arr,$scope.personality.depart_ignore2,$scope.personality.depart_prefer2,'depart',$scope.zyb.depart_name);
        }

        $scope.cancleCourse = function(id){
            var arr = $('button[parent2='+id+']');
            loadClickCancle.reject(arr,$scope.personality.course_ignore,$scope.personality.course_prefer,'course2',$scope.zyb.course_name);

            var arr = $('button[parent1='+id+']');

            for(var i = 0 ; i< arr.length;i++){
                arr.eq(i).attr('state',0).removeClass().addClass("btn btn-sm btn-default");
            }

            $scope.personality.course_prefer=[];
            $scope.zyb.course_name = [];
        }

        $scope.cancleWish = function(id){
            var arr = $('button[parent='+id+']');
            loadClickCancle.reject(arr,$scope.personality.wish_ignore,$scope.personality.wish_prefer,'wish',$scope.zyb.wish_name);
        }

        $scope.cancleUser = function(id){
            var arr = $('button[parent='+id+']');
            loadClickCancle.reject(arr,$scope.personality.user_ignore,$scope.personality.user_prefer,'user',$scope.zyb.user_name);
        }

        $scope.cancleGift = function(id){
            var arr = $('button[parent2='+id+']');
            loadClickCancle.reject(arr,$scope.personality.gift_ignore,$scope.personality.gift_prefer,'gift2',$scope.zyb.gift_name);

            var arr = $('button[parent1='+id+']');

            for(var i = 0 ; i< arr.length;i++){
                arr.eq(i).attr('state',0).removeClass().addClass("btn btn-sm btn-default");
            }

            $scope.personality.gift_prefer=[];
            $scope.zyb.gift_name = [];

        }

        $scope.cancleNature = function(id){
            var arr = $('button[parent='+id+']');
            loadClickCancle.reject(arr,$scope.zyb.nature_ignore,$scope.personality.nature_prefer,'nature',$scope.zyb.nature_name);
        }

        $scope.canclePhysical = function(id){
            var arr = $('button[parent='+id+']');
            loadClickCancle.reject(arr,$scope.personality.physical_ignore,$scope.zyb.physical_prefer,'physical',$scope.zyb.physical_name);
        }
///////////////////////////其他因素////////////////////////////////////////////////////////////////////////

        $scope.clickEveEconomy = function($event,id){
            var then = this.list.name;
            $timeout.cancel(TimeFn);
            TimeFn = $timeout(function(){
                var target = $event.target,
                    state = $(target).attr('state') == undefined ? 0 : $(target).attr('state');

                if(state == 2){
                    propState(false,id);
                    $scope.zyb.prop_name.splice($.inArray(then,$scope.zyb.prop_name),1);
                    $(target).attr('state',0).removeClass().addClass("btn btn-sm btn-default");
                }else if (state == 1){
                    propState(false,id);
                    $scope.zyb.prop_name.splice($.inArray(then,$scope.zyb.prop_name),1);
                    $(target).attr('state',0).removeClass().addClass("btn btn-sm btn-default");
                }else {
                    propState(true,id);
                    $scope.zyb.prop_name.push(then);
                    $(target).attr('state',1).removeClass().addClass("btn btn-sm btn-success");
                }
            },400);

        }

        $scope.dblclickEveEconomy = function($event,id){
            var then = this.list.name;
            $timeout.cancel(TimeFn);

            var target = $event.target,
                state = $(target).attr('state') == undefined ? 0 : $(target).attr('state');

            if(state == 2){
                propState(false,id);
                $(target).attr('state',0).removeClass().addClass("btn btn-sm btn-default");
            }else if (state == 1){
                propState(false,id);
                $scope.zyb.prop_name.splice($.inArray(then,$scope.zyb.prop_name),1);
                $(target).attr('state',2).removeClass().addClass("btn btn-sm btn-danger");
            }else {
                propState(false,id);
                $(target).attr('state',2).removeClass().addClass("btn btn-sm btn-danger");
            }

        }

        /**
         * 修改prop状态
         * ture or false
         * */
        function propState(isTrue,id){
                if (id == 1020) {
                    $scope.personality.economy_option = isTrue;
                } else if (id == 1021) {
                    $scope.personality.prop5 = isTrue;
                } else if (id == 1022) {
                    $scope.personality.prop6 = isTrue;
                }
        }

        //$scope.allProp = function(){
        //    var arr = $('button[prop]');
        //    loadClickAll.all(arr,"",'prop',$scope.zyb.prop_name,2);
        //}

        $scope.cancleProp = function(){
            var arr = $('button[economy]');
            loadClickCancle.reject(arr,"","",'prop',$scope.zyb.prop_name,2);
        }


    }]);
