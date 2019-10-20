$.ajax({
    type: 'get',
    url: '/posts',
    success: function (res) {
        var html = template('postsTpl', res);
        $('#postsBox').html(html);
        var page = template('pageTpl', res);
        $('.pagination').html(page);
    }
})

function dateFormat(date) {
    date = new Date(date);
    return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
}

function changePage(pageNum) {
    $.ajax({
        type: 'get',
        url: '/posts',
        data: { page: pageNum },
        success: function (res) {
            var html = template('postsTpl', res);
            $('#postsBox').html(html);
            var page = template('pageTpl', res);
            $('.pagination').html(page);
        }
    })
}

// 获取并渲染分类数据
$.ajax({
    type: 'get',
    url: '/categories',
    success: function (res) {
        var html = template('categoryTpl', { data: res });
        $('#categoryBox').html(html);
    }
})

$('#filterForm').on('submit', function () {
    var fd = $(this).serialize();
    $.ajax({
        type: 'get',
        url: '/posts',
        data: fd,
        success: function (res) {
            var html = template('postsTpl', res);
            $('#postsBox').html(html);
            var page = template('pageTpl', res);
            $('.pagination').html(page);
        }
    });
    return false;
})

$('#postsBox').on('click', '.edit', function () {
    var id = $(this).attr('data-id');
    location.href = 'post-edit.html?id=' + id;
})
