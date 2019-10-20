// 获取地址栏中的categoryId参数
// var categoryId = location.search.split('=')[1]    没有通用性

var categoryId = getUrlParams('categoryId');

// 根据categId获取文章列表
$.ajax({
    type: 'get',
    url: `/posts/category/${categoryId}`,
    success: function (res) {
        console.log(res);

        var html = template('postsTpl', { data: res });
        $('#listBox').html(html);
        $('#listBox').siblings().text(res[0].category.title);
    }
})