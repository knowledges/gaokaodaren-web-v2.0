/**
 * Created by Administrator on 2016/4/14.
 */
$(function(){
    $("#register").click(function(){
        var param = {};
            param.j_username = $("#username").val();
            param.j_password =$("#password").val();
            param.mobile = "";
            param.code = $("#validate").val();

        $.ajax({
            type: "POST",
            url: "/loocha/user/register",
            dataType: "json",
            data: "j_username="+$("#username").val()+"&j_password="+$("#password").val()+"&mobile=&code="+$("#validate").val(),
            success:function(data){
                console.log(JSON.stringify(data));
                debugger;
            }
        })

        $.post('/loocha/user/register',param,function(data){console.log(data)
            console.log(JSON.stringify(data));
            debugger;
        });
    });

})