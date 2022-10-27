var layer = layui.layer;
// 封装函数获取用户信息
getUserInfo();
function getUserInfo() {
    $.ajax({
        type: "get",
        url: "/my/userinfo",
        // 请求头配置
        // 在BaseAPI.js中统一设置
        // headers: {
        //     Authorization: localStorage.getItem('token')
        // },
        success: function (res) {
            // 如果接口获取失败
            if (res.status !== 0) {
                return layer.msg('获取用户信息失败')
            }
            // 如果成功，渲染用户的头像,渲染欢迎词。。。
            renderAvator(res.data)
        },
        // commpulete: function (res) {
        //     if (res.responseJSON.status == 1) {
        //         localStorage.removeItem('token')
        //         location.href = '/login.html'
        //     }
        // }
    });
}

// 封装一个渲染用户头像的函数
// 用户名如果有昵称，头像是昵称的第一个文字
// 如果没有昵称，显示用户名
// 如果有头像把头像的图片传给img，显示头像
function renderAvator(user) {
    var name = user.nickname || user.username;
    // 设置欢迎词
    $('#welcome').html('欢迎 ' + name)
    // 渲染头像
    if (user.user_pic !== null) {
        $('.layui-nav-img').attr('src', user_pic).show();
        $('.text-avatar').hide();
    } else {
        $('.layui-nav-img').hide();
        $('.text-avatar').html(name[0].toUpperCase()).show()
    }
}
// 退出功能：点击退出，弹窗提示，退出到登陆页面
$('#btnLogout').on('click', function () {
    layer.confirm('是否退出?', { icon: 3, title: '你正在退出系统' }, function (index) {
        //跳转到登陆页面，清除当前本地中的token
        localStorage.removeItem('token');
        location.href = "/login.html";
        // 关闭询问框
        layer.close(index);
    });
})
// 控制用户权限：如果用户未登录，直接打开index.html页面
//              应该是不能进入，返回登陆页面

