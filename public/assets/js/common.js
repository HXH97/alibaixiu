$('#logout').on('click', function () {
    var isConfirm = confirm('是否要退出');
    if (isConfirm) {
        $.ajax({
            type: 'post',
            url: '/logout',
            success: function () {
                location.href = 'login.html';
            }
        })
    }
})

$.ajax({
    type: 'get',
    url: `/users/${userId}`,
    success: function (res) {
        $('.profile img.avatar').attr('src', res.avatar);
        $('.profile h3.name').text(res.nickName);
        $('.profile').css('visibility', 'visible');
    }
})