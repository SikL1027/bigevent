// JQ中ajax提供的函数，用来拼接url
$.ajaxPrefilter(function (options) {
    // 如果接口中包含my为开头，用来拼接url
    if (options.url.indexOf('/my/') != -1) {
        options.headers = {
            Authorization: localStorage.getItem('token')
        }
    }
    // 设置统一的请求头
    options.url = 'http://api-breakingnews-web.itheima.net' + options.url
    // 权限优化
    options.complete = function (res) {
        if (res.responseJSON.status == 1) {
            localStorage.removeItem('token')
            location.href = '/login.html'
        }
    }
})