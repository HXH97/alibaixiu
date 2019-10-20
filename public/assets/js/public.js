$.ajax({
  type: 'get',
  url: '/posts/random',
  success: function (res) {
    var randomTpl = `
            {{each data}}
            <li>
                <a href="javascript:;">
                  <p class="title">{{$value.title}}</p>
                  <p class="reading">阅读({{$value.meta.views}})</p>
                  <div class="pic">
                    <img src="{{$value.thumbnail}}" alt="">
                  </div>
                </a>
            </li>
            {{/each}}
        `;
    var html = template.render(randomTpl, { data: res });
    $('.random').html(html);
  }
})

$.ajax({
  type: 'get',
  url: '/comments/lasted',
  success: function (res) {
    var commentsTpl = `
            {{each data}}
            <li>
                <a href="javascript:;">
                  <div class="avatar">
                    <img src="{{$value.author.avatar}}" alt="">
                  </div>
                  <div class="txt">
                    <p>
                      <span>{{$value.author.nickName}}</span>{{$value.createAt.split("T")[0]}}说:
                    </p>
                    <p>{{$value.content}}</p>
                  </div>
                </a>
            </li>
            {{/each}}
        `;
    var html = template.render(commentsTpl, { data: res });
    $('.discuz').html(html);
  }
})

$.ajax({
  type: 'get',
  url: '/categories',
  success: function (res) {
    var navTpl = `
            {{each data}}
            <li><a href="list.html?categoryId={{$value._id}}"><i class="fa {{$value.className}}"></i>{{$value.title}}</a></li>
            {{/each}}
        `;
    var html = template.render(navTpl, { data: res });
    $('.header .nav').html(html);
  }
})

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

// 实现搜索功能
$('.search form').on('submit', function () {
  var key = $(this).find('.keys').val().trim();
  location.href = 'search.html?key=' + key;
  return false;
})

