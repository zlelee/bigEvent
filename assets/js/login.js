$(function () {
  $('.a-login').on('click', function () {
    $('.login-box').hide()
    $('.reg-box').show()
  })
  $('.a-reg').on('click', function () {
    $('.login-box').show()
    $('.reg-box').hide()
  })
})
