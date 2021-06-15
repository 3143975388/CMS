// 每次调用$.post,$.get,$.ajax时都会先调用.ajaxPrefilter函数
// 在这个函数中可以调用我们给ajax提供的配置对象
$.ajaxPrefilter(function(options){
    // 再发起真正的ajax请求,之前统一拼接根路径
    options.url='http://api-breakingnews-web.itheima.net'+options.url
    console.log(options.url);
})