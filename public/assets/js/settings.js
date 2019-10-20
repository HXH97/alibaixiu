$('#logo').on('change', function () {
    var fd = new FormData();
    fd.append('logo', this.files[0]);
    $.ajax({
        type: 'post',
        url: '/upload',
        data: fd,
        processData: false,
        contentType: false,
        success: function (res) {
            $('#hiddenLogo').val(res[0].logo);
            $('#preview').attr('src', res[0].logo);
        }
    })
})

$('#settingsForm').on('submit', function () {
    $.ajax({
        type: 'post',
        url: '/settings',
        data: $(this).serialize(),
        success: function (res) {
            location.reload();
        }
    })
    return false;
})

$.ajax({
    type: 'get',
    url: '/settings',
    success: function (res) {
        if (res) {
            $('#hiddenLogo').val(res.logo);
            $('#preview').attr('src', res.logo);
            $('input[name="title"]').val(res.title);
            $('input[name="comment"]').prop('checked', res.comment);
            $('input[name="review"]').prop('checked', res.review);
        }
    }
})