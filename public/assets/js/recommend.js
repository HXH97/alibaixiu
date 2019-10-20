$.ajax({
    type: 'get',
    url: '/posts/recommend',
    success: function (res) {
        // 复用 避免模板写两次
        var recommendTpl = `
            {{each data}}
            <li>
                <a href="javascript:;">
                  <img src="{{$value.thumbnail}}" alt="">
                  <span>{{$value.title}}</span>
                </a>
            </li>
            {{/each}}
        `;
        var html = template.render(recommendTpl, { data: res });
        $('.hots ul').html(html);
    }
})