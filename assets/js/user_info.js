var form = layui.form;
var layer = layui.layer
form.verify({
    nickname: function (value) {
        if (value.length > 6) {
            return '昵称长度不能超过6个字符'
        }
    }
})
// 初始化用户信息
function initUserInfo() {
    $.ajax({
        type: "get",
        url: "/my/userinfo",
        success: function (res) {
            console.log(res);
            if (res.status !== 0) {
                return layer.msg('获取用户信息失败')
            }
            // return layer.msg('获取用户信息成功')
            // 如果成功,渲染数据
            // 使用layui进行表单的赋值
            form.val('formUserInfo', res.data)
        }
    });
    // 重置功能
    $('btnReset').on('click', function (e) {
        e.preventDefault();
        initUserInfo();
    })
}
initUserInfo();
// 表单数据提交
$('.layui-form').on('submit', function (e) {
    e.preventDefault();
    $.ajax({
        method: 'post',
        url: '/my/userinfo',
        data: $(this).serialize(),
        success: function (res) {
            // console.log(res);
            if (res.status != 0) {
                return layer.msg('更新用户信息失败')
            }
            // 成功后
            // 通过window.parent获取iframe窗口的父窗口中的获取页面信息函数
            // 更新欢迎词
            window.parent.getUserInfo()
        }
    })
})