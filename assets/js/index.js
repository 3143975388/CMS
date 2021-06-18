$(function(){
    getUserInfo()
    var layer =layui.layer
    // 点击按钮实现退出功能
    $('#btnBeach').on('click',function(){
        layer.confirm('确认退出吗', {icon: 3, title:'提示'}, function(index){
            //do something
            // 清空token
            localStorage.removeItem('token')
            // 跳转登录界面
            location.href='/login.html'
            layer.close(index);
          });
    })
})

// 获取用户信息
function getUserInfo(){
    $.ajax({
        method: "GET",
        url: "/my/userinfo",
    //     headers:{
    //         Authorization:localStorage.getItem('token') || ''
    // },
        success: function (res) {
            // console.log(res);
            if(res.status !==0){
                return layui.layer.msg('获取用户信息失败')
            }
            // 调用
            renderAvater(res.data)
        },
        // // 不论成功还是失败都会调用complete回调函数
        // complete:function(res){
        //     console.log(res);
        //     //如果 res.responseJSON.status===1 && res.responseJSON.message==='身份认证失败！'
        //     if(res.responseJSON.status === 1 && res.responseJSON.message ==="身份认证失败！"){
        //         // 清空token
        //         localStorage.removeItem('token')
        //         // 强制跳转login.html
        //         location.href='/login.html'
        //     }
        // }
    });
}
// 渲染头像
function renderAvater(user){
     // 获取用户名称
    var name =user.nickname || user.username
    //设置用户的文本
    $('#welcome').html('欢迎&nbsp;&nbsp;'+name)
    // 渲染用户头像
    if(user.user_pic !==null){
        // 用户头像
        $('.layui-nav-img').attr('src',user.user_pic).show()
        $('.textPhoto').hide();
        
    }else{
        $('.layui-nav-img').hide()
        var first =name[0].toUpperCase()
        $('.textPhoto').html(first).show()
    }

}