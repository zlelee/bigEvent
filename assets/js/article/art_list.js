$(function () {
  const layer = layui.layer
  const q = {
    pagenum: 1,
    pagesize: 2,
    cate_id: '',
    state: ''
  }
  function initTable() {
    $.ajax({
      method: 'GET',
      url: '/my/article/list',
      data: q,
      success(res) {
        if (res.status !== 0) {
          return layer.msg('获取文章列表失败')
        }
        layer.msg('获取文章列表成功')
        let htmlStr = template('tpl-table', res)
        $('tbody').html(htmlStr)
      }
    })
  }

  initTable()
})
