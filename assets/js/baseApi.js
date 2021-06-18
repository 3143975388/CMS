// 每次调用$.post,$.get,$.ajax时都会先调用.ajaxPrefilter函数
// 在这个函数中可以调用我们给ajax提供的配置对象
$.ajaxPrefilter(function(options){
    // 再发起真正的ajax请求,之前统一拼接根路径
    options.url='http://api-breakingnews-web.itheima.net'+options.url
    // console.log(options.url);
    // 统一为有权限的接口，设置headers请求
    if(options.url.indexOf('/my/') !==-1){
        options.headers={Authorization:localStorage.getItem('token') || ''}
    }

    // 全局统一挂载complete对象
     // 不论成功还是失败都会调用complete回调函数
     options.complete=function(res){
        console.log(res);
        //如果 res.responseJSON.status===1 && res.responseJSON.message==='身份认证失败！'
        if(res.responseJSON.status === 1 && res.responseJSON.message ==="身份认证失败！"){
            // 清空token
            localStorage.removeItem('token')
            // 强制跳转login.html
            location.href='/login.html'
        }
    }
})