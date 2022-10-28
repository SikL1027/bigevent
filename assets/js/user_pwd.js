var form = layui.form;
// form的配置
form.verify({
    pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
    samepwd: function (value) {
        if (value == $('[name=oldPwd]').val()) {
            return '新密码和旧密码不能相同'
        }
    },
    repwd: function (value) {
        if (value !== $('[name=newPwd]').val()) {
            return '两次密码不一致'
        }
    }
})
// 修改密码请求
$('.layui-form').on('submit', function (e) {
    e.preventDefault();
    $.ajax({
        type: 'post',
        url: '/my/updatepwd',
        data: $(this).serialize(),
        success: function (res) {
            // console.log(res);
            if (res.status !== 0) {
                return layui.layer.msg('修改密码失败')
            }
            layui.layer.msg('更新密码成功')
            // 重置表单信息 原生JS的DOM方法
            $('.layui-form')[0].reset()
        }
    })
})