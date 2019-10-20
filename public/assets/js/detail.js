var id = getUrlParams('postsId');
$.ajax({
    type: 'get',
    url: `/posts/${id}`,
    success: function (res) {
        var html = template('detailTpl', res);
        $('.article').html(html);
    }
})

$('.article').on('click', '#like', function () {
    $.ajax({
        type: 'post',
        url: `/posts/fabulous/${id}`,
        success: function (res) {
            $(this).css('color', 'red');
        }.bind(this)
    })
})

var state = 0;  //判断评论状态是否需要审核

$.ajax({
    type: 'get',
    url: '/settings',
    success: function (res) {
        if (res.state == 0) {
            state = 0;  //不需要审核
        } else {
            state = 1;  //需要审核
        }
        if (res.comment) {
            $('.comment').show();
        }
    }
})

// 评论的提交功能
$('.comment form').on('submit', function () {
    var content = $(this).find('textarea').val();
    $.ajax({
        type: 'get',
        url: '/comments',
        data: {
            content: content,
            post: id,
            state: state
        },
        success: function (res) {
            alert('评论成功');
            $(this).find('textarea').val('');
        }.bind(this)
    })
    return false;
})