function getUrlParams(key) {
    var str = location.search.substr(1);
    var arr = str.split('&');
    for (var i = 0; i < arr.length; i++) {
        var newArr = arr[i].split('=');
        if (newArr[0] == key) {
            return newArr[1];
        }
    }
}

var id = getUrlParams('id');

$('#feature').on('change', function () {
    var fd = new FormData();
    fd.append('cover', this.files[0]);
    $.ajax({
        type: 'post',
        url: '/upload',
        data: fd,
        processData: false,
        contentType: false,
        success: function (res) {
            console.log(res);
            $('.thumbnail').attr('src', res[0].cover).show();
            $('#thumbnail').val(res[0].cover);
        }
    })
})

$.ajax({
    type: 'get',
    url: '/posts/' + id,
    success: function (res) {
        var data = res;
        var html = template('postsTpl', res);
        $('.container-fluid').html(html);
        $.ajax({
            type: 'get',
            url: '/categories',
            success: function (res) {
                var html = template('categoryTpl', { data: res, category: data });
                $('#category').html(html);
            }
        })
    }
})

