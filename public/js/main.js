$(document).ready(function(){

    $('.loginForm').on('click', function(){
        $.ajax({
            type:'GET',
            url:'/users/login',
            data:{
                username: $('#txtUsername'),
                password: $('#txtPwd')
            },
            success: function(response){
                if(response=='success') {
                    msg = 'login success',
                        window.location.replace('/')
                } else {
                    msg = 'Invalid username/password'
                }
            }

        });
    });

    $('.registerForm').on('click', function(){
        $.ajax({
            type:'post',
            url:'/users/register',
            data:{
                username: $('#rgUsername'),
                password: $('#rgPwd'),
                email: $('#rgEmail'),
                phone: $('#rgTel')
            },
            success: function(response){
                if(response=='success') {
                    msg = 'login success',
                        window.location.replace('/')
                } else {
                    msg = 'Invalid username/password'
                }
            }

        });
    });

});