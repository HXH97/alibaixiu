$('#modifyForm').on('submit', function () {
    $.ajax({
        type: 'put',
        url: '/users/password',
        data: $(this).serialize(),
        success: function () {
            location.href = 'login.html';
            // location.href = '/admin/login.html'
        }
    })
    return false;
})