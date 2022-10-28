// 1.1 获取裁剪区域的 DOM 元素
var $image = $('#image')
// 1.2 配置选项
const options = {
    // 纵横比
    aspectRatio: 1,
    // 指定预览区域
    preview: '.img-preview'
}

// 1.3 创建裁剪区域
$image.cropper(options)

// 上传图片功能
// 点击上传按钮，调用点击文件域的事件
$('#btnChooseImg').on('click', function (e) {
    // 当文件域传入图片后，触发change事件：
    // 事件对象中的e.target就是input.file
    // 使用文件上传的代码，获取files[0] 就是上传的图片文件
    e.preventDefault();
    $('#file').click()
})
// 把图片裁剪区域的图换为我们选中的图片
// 获取自己上传的图片
$('#file').on('change', function (e) {
    var files = e.target.files;
    if (files.length <= 0) {
        return layui.layer.msg('请先选择图片')
    }
    // 如果有图片，放入裁剪区域
    // 根据选择的文件，创建一个对应的 URL 地址：
    var newImgURL = URL.createObjectURL(files[0]);
    // 先`销毁`旧的裁剪区域，再`重新设置图片路径`，之后再`创建新的裁剪区域`：
    $image
        .cropper('destroy')      // 销毁旧的裁剪区域
        .attr('src', newImgURL)  // 重新设置图片路径
        .cropper(options)        // 重新初始化裁剪区域 
})
// 把裁剪的头像上传到服务器
$('#btnUpload').on('click', function () {
    // 将裁剪后的图片，输出为 base64 格式的字符串
    var dataURL = $image
        .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
            width: 100,
            height: 100
        })
        .toDataURL('image/png')       // 将 Canvas 画布上的内容，转化为 base64 格式的字符串
    // console.log(dataURL);
    // 调用接口，上传图片
    $.ajax({
        type: 'post',
        url: '/my/update/avatar',
        data: {
            avatar: dataURL
        },
        success: (res) => {
            if (res.status !== 0) {
                return layui.layer.msg('更换头像失败')
            }
            layui.layer.msg('更换头像成功')
            // 成功后调用iframe中的获取用户信息函数，重新渲染页面
            window.parent.getUserInfo()
        }
    })
})
