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
  const layer = layui.layer
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
  //监听注册表单的提交事件
  $('#form_reg').on('submit', function (e) {
    //阻止默认提交行为
    e.preventDefault()
    let data = $(this).serialize()
    console.log(data)
    $.ajax({
      method: 'POST',
      url: 'http://ajax.frontend.itheima.net/api/reguser',
      data,
      success(res) {
        if (res.status !== 0) {
          layer.msg(res.message)
        }
        layer.msg('注册成功,请登录')
        setTimeout(() => {
          $('.a-reg').click()
        }, 1000)
      }
    })
  })
  //监听登录表单的提交事件
  $('#form_login').on('submit', function (e) {
    e.preventDefault()
    let data = $(this).serialize()
    $.ajax({
      method: 'POST',
      url: 'http://ajax.frontend.itheima.net/api/login',
      data,
      success(res) {
        if (res.status !== 0) {
          return layer.msg('登陆失败,请检查用户名或密码')
        }
        layer.msg('登陆成功')
        localStorage.setItem('token', res.token)
        location.href = '/index.html'
      }
    })
  })
})
