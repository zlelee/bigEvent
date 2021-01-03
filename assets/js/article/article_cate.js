$(function () {
  layer = layui.layer
  form = layui.form
  getlist()
  $('#btnAddCate').on('click', function () {
    indexAdd = layer.open({
      type: 1,
      area: ['500px', '250px'],
      title: '添加文章分类',
      content: $('#dialog-add').html()
    })
  })
  $('body').on('submit', '#form-add', function (e) {
    e.preventDefault()
    const data = $(this).serialize()
    $.ajax({
      url: '/my/article/addcates',
      method: 'POST',
      data,
      success(res) {
        if (res.status !== 0) {
          return layer.msg('新增文章失败')
        }
        layer.msg('添加文章成功')
        layer.close(indexAdd)
        getlist()
      }
    })
  })
  $('tbody').on('click', 'edit', function () {
    indexEdit = layer.open({
      type: 1,
      area: ['500px', '250px'],
      title: '编辑文章分类',
      content: $('#dialog-edit').html()
    })
    let id = $(this).attr('data-id')
    // console.log(id)
    $.ajax({
      method: 'GET',
      url: '/my/article/cates/' + id,
      success(res) {
        if (res.status !== 0) {
          layer.msg('获取数据失败')
        }
        layer.msg('成功')
        form.val('form-edit', res.data)
      }
    })
  })
})
//获取数据并渲染到页面
function getlist() {
  $.ajax({
    method: 'GET',
    url: '/my/article/cates',
    success(res) {
      console.log(res)
      if (res.status !== 0) {
        return layer.msg('获取文章失败')
      }
      let htmlStr = template('tpl-table', res)
      $('tbody').html(htmlStr)
    }
  })
}
