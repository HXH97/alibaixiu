$.ajax({
    type: 'get',
    url: '/slides',
    success: function (res) {
        var html = template('slidesTpl', { data: res });
        $('#slidesBox').html(html);
    }
})

$('#file').on('change', function () {
    var fd = new FormData();
    fd.append('avatar', this.files[0]);
    $.ajax({
        type: 'post',
        url: '/upload',
        data: fd,
        processData: false,
        contentType: false,
        success: function (res) {
            $('#hiddenImg').val(res[0].avatar);
            $('.thumbnail').attr('src', res[0].avatar).show();
        }
    })
})

$('#slidesForm').on('submit', function () {
    $.ajax({
        type: 'post',
        url: '/slides',
        data: $(this).serialize(),
        success: function (res) {
            location.reload();
        }
    })
    return false;
})

$('#slidesBox').on('click', '.delete', function () {
    var id = $(this).attr('data-id');
    $.ajax({
        type: 'delete',
        url: `/slides/${id}`,
        success: function (res) {
            location.reload();
        }
    })
})