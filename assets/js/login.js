$(function(){
    // 点击“去注册”的链接
    $('#link-reg').on('click',function(){
        $('.login-box').hide();
        $('.reg-box').show();
    })
    // 点击“去登陆”的链接
    $('#link-login').on('click',function(){
        $('.login-box').show();
        $('.reg-box').hide();
    })

    // 获取layui的form对象
    var form =layui.form
    // 调用form的verify函数自定义效验规则
    form.verify({
        // 自定义pwd效验规则
        pwd:[/^[\S]{6,12}$/
        ,'密码必须6到12位，且不能出现空格'
      ],
    //  效验两个密码一致不一致 
        repwd:function(value){
            // 通过形参拿到确认密码框的内容
            // 然后拿出密码框的内容
            // 进行一次的等于判断
            // 判断失败返回一个值

            // 获取注册时候的密码值
            var pwd=$('.reg-box [name=password]').val()
            // 判断
            if(pwd!==value){
                return '密码不一致'
            }
        }

    })
    // 获取layer对象
    var layer =layui.layer
    // 监听注册表单的提交事件
    $('.reg-box').submit(function (e) { 
        // 阻止默认提交事件
        e.preventDefault();
        // 发起ajax请求
        $.post('/api/reguser',{username:$('#form-reg [name=username]').val()
        ,password:$('#form-reg [name=password]').val()},function(res){
            if(res.status!==0){
                return layer.msg(res.message);
            }
            layer.msg('注册成功');
        })
        // 模拟点击行为
        $('#link-login').click()
    });

    // 监听登录表单的提交事件
    $('#form-login').submit(function(e){
        e.preventDefault()
        $.ajax({
            url: "/api/login",
            method: "POST",
            // 快速获取表单数据
            // 账号ty9
            // 密码123456
            data: $(this).serialize(),
            success: function (res) {
                if(res.status !==0){
                    return layer.msg('登陆失败')
                }
                layer.msg('登陆成功')
                // console.log(res.token);
                // 将登录的值存储在localStorage
                localStorage.setItem('token',res.token)
                // 跳转后台主页
                location.href='/index.html'

            }
        });
    })
})