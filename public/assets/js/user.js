$.ajax({
    type: 'get',
    url: '/users',
    success: function (res) {
        var html = template('usersTpl', { data: res });
        $('#userBox').html(html);
    }
})

$('#userForm').on('submit', function () {
    var formData = $(this).serialize();
    $.ajax({
        type: 'post',
        url: '/users',
        data: formData,
        success: function () {
            // 刷新当前页面
            location.reload();
        }
    })
    return false;
})

// 上传用户头像
// 用事件委托 不然修改用户信息 修改不了头像
$('#modifyBox').on('change', '#avatar', function () {
    var fd = new FormData();
    fd.append('avatar', this.files[0]);
    $.ajax({
        type: 'post',
        url: '/upload',
        // 固定写法
        processData: false,
        contentType: false,
        data: fd,
        success: function (res) {
            $('#hiddenImg').val(res[0].avatar);
            $('#preview').attr('src', res[0].avatar);
        }
    })
})

// 修改用户界面显示
$('#userBox').on('click', '.edit', function () {
    var id = $(this).attr('data-id');
    $.ajax({
        type: 'get',
        url: '/users/' + id,
        success: function (res) {
            var html = template('modifyTpl', res);
            $('#modifyBox').html(html);
        }
    })
})

// 事件委托修改表单
$('#modifyBox').on('submit', '#modifyForm', function () {
    // 获取表单数据
    var formData = $(this).serialize();
    var id = $(this).attr('data-id');
    $.ajax({
        type: 'put',
        url: '/users/' + id,
        data: formData,
        success: function (res) {
            location.reload();
        }
    })
    return false;
})

// 删除用户
$('#userBox').on('click', '.delete', function () {
    if (confirm('确定要删除吗')) {
        var id = $(this).attr('data-id');
        $.ajax({
            type: 'delete',
            url: '/users/' + id,
            success: function () {
                location.reload();
            }
        })
    }
})

// 批量删除
$('#checkAll').on('change', function () {
    var bool = $(this).prop('checked');
    var checkList = $('#userBox input[type="checkbox"]');
    checkList.prop('checked', bool);
    if (bool) {
        $('#deleteAll').show();
    } else {
        $('#deleteAll').hide();
    }
})

// 全选效果切换
$('#userBox').on('change', 'input[type="checkbox"]', function () {
    // 只有当tbody中所有的checkbox长度等于选中的checkbox长度  checkAll选中
    if ($('#userBox input[type="checkbox"]').length == $('#userBox input[type="checkbox"]:checked').length) {
        $('#checkAll').prop('checked', true);
    } else {
        $('#checkAll').prop('checked', false);
    }
    if ($('#userBox input[type="checkbox"]:checked').length >= 1) {
        $('#deleteAll').show();
    } else {
        $('#deleteAll').hide();
    }
})

$('#deleteAll').on('click', function () {
    if (confirm('确定要删除吗')) {
        var checkList = $('#userBox input[type="checkbox"]:checked');
        var str = '';
        checkList.each(function (index, item) {
            str += $(item).attr('data-id') + '-';
        })
        str = str.substr(0, str.length - 1);
        console.log(str);
        $.ajax({
            type: 'delete',
            url: '/users/' + str,
            success: function () {
                location.reload();
            }
        })
    }
})
