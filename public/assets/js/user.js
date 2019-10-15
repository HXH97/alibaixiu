$.ajax({
    type: 'get',
    url: '/users',
    success: function (res) {
        var html = template('usersTpl', { data: res });
        $('#userBox').html(html);
    }
})

$('#userForm').on('submit', function () {
    var formData = $(this).serialize();
    $.ajax({
        type: 'post',
        url: '/users',
        data: formData,
        success: function () {
            // 刷新当前页面
            location.reload();
        }
    })
    return false;
})

// 上传用户头像
$('#avatar').on('change', function () {
    var fd = new FormData();
    fd.append('avatar', this.files[0]);
    $.ajax({
        type: 'post',
        url: '/upload',
        // 固定写法
        processData: false,
        contentType: false,
        data: fd,
        success: function (res) {
            console.log(res);

        }
    })
})
