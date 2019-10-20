// 获取地址栏中的categoryId参数
// var categoryId = location.search.split('=')[1]    没有通用性

var key = getUrlParams('key');

// 根据categId获取文章列表
$.ajax({
    type: 'get',
    url: `/posts/search/${key}`,
    success: function (res) {
        if (res.length != 0) {
            var html = template('postsTpl', { data: res });
            $('#listBox').html(html);
        } else {
            $('#listBox').text('搜索内容不存在');
        }
    }
})