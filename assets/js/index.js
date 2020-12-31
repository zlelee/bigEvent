$(function () {
  const layer = layui.layer
  getUserInfo()
})
function getUserInfo() {
  $.ajax({
    url: '/my/userinfo',
    method: 'GET',
    success(res) {
      console.log(res)
      if (res.status !== 0) {
        return layer.msg('获取信息失败')
      }
      renderUserinfo(res.data)
    }
  })
}
function renderUserinfo(data) {
  let name = data.nickname || data.username
  let first = name[0].toUpperCase()
  if (data.user_pic !== null) {
    $('.welcome').html('欢迎' + name)
    $('.layui-nav-img').attr('src', data.user_pic).show()
    $('.text-avatar').hide()
  } else {
    $('.welcome').html('欢迎' + name)
    $('.layui-nav-img').hide()
    $('.text-avatar').html(first).show()
  }
}
