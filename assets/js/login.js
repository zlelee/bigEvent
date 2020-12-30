$(function () {
  $('.a-login').on('click', function () {
    $('.login-box').hide()
    $('.reg-box').show()
  })
  $('.a-reg').on('click', function () {
    $('.login-box').show()
    $('.reg-box').hide()
  })
  const form = layui.form
  form.verify({
    pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
    repwd: function (value) {
      let pwd = $('.reg-box [name=repassword]').val()
      console.log(pwd)
      if (value !== pwd) {
        return '两次密码不一致'
      }
    }
  })
})
