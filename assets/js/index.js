$(function () {
  getUserInfo()
})
function getUserInfo() {
  $.ajax({
    url: '/my/userinfo',
    type: 'GET',
    header: {
      Authorization: localStorage.getItem('token') || ''
    },
    success(res) {
      console.log(res)
    }
  })
}
