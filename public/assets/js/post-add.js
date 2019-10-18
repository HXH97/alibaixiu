$.ajax({
    type: 'get',
    url: '/categories',
    success: function (res) {
        var html = template('categoryTpl', { data: res });
        $('#category').html(html);
    }
})

// 图片上传功能
$('#feature').on('change', function () {
    var fd = new FormData();
    fd.append('avatar', this.files[0]);
    $.ajax({
        type: 'post',
        url: '/upload',
        data: fd,
        // jq默认会把数据变成键值对形式，我们的数据类型是multipart/form-data  分开向服务器发送
        processData: false,
        contentType: false,
        success: function (res) {
            console.log(res);
            $('.thumbnail').attr('src', res[0].avatar).show();
            $('#thumbnail').val(res[0].avatar);
        }
    })
})

$('#addForm').on('submit', function () {
    $.ajax({
        type: 'post',
        url: '/posts',
        data: $(this).serialize(),
        success: function (res) {
            console.log(res);
            location.href = 'posts.html';
        }
    })
    return false;
})