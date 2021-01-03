$(function () {
  const layer = layui.layer
  const form = layui.form
  const laypage = layui.laypage
  let q = {
    pagenum: 1,
    pagesize: 2,
    cate_id: '',
    state: ''
  }

  initSelet()
  initTable()

  $('#form-search').on('submit', function (e) {
    e.preventDefault()
    let cate_id = $('[name="cate_id"]').val()
    let state = $('[name="state"]').val()
    q.cate_id = cate_id
    q.state = state
    initTable()
  })
  $('tbody').on('click', '.btn-delete', function () {
    let id = $(this).attr('data-id')
    layer.confirm('确定删除?', { icon: 3, title: '提示' }, function (index) {
      let len = $('.btn-delete').length
      $.ajax({
        method: 'GET',
        url: '/my/article/delete/' + id,
        success(res) {
          if (res.status !== 0) {
            layer.msg('删除失败')
          }
          layer.msg('删除成功')
          if (len === 1) {
            q.pagenum = q.pagenum <= 1 ? 1 : q.pagenum - 1
          }

          // console.log(q)
          initTable()
        }
      })

      layer.close(index)
    })
  })
  //渲染表格
  function initTable() {
    $.ajax({
      method: 'GET',
      url: '/my/article/list',
      data: q,
      success(res) {
        if (res.status !== 0) {
          return layer.msg('获取文章列表失败')
        }
        // layer.msg('获取文章列表成功')
        let htmlStr = template('tpl-table', res)
        $('tbody').html(htmlStr)
        renderPage(res.total)
      }
    })
  }
  //渲染下拉菜单
  function initSelet() {
    $.ajax({
      method: 'GET',
      url: '/my/article/cates',
      success(res) {
        if (res.status !== 0) {
          return layer.msg('获取分类失败')
        }
        let htmlStr = template('tpl-cate', res)
        $('[name="cate_id"]').html(htmlStr)
        form.render()
      }
    })
  }

  function renderPage(total) {
    laypage.render({
      elem: 'pageBox', // 分页容器的 Id
      count: total, // 总数据条数
      limit: q.pagesize, // 每页显示几条数据
      curr: q.pagenum, // 设置默认被选中的分页
      layout: ['count', 'limit', 'prev', 'page', 'next', 'skip'],
      limits: [2, 3, 5, 10],
      // 分页发生切换的时候，触发 jump 回调
      // 触发 jump 回调的方式有两种：
      // 1. 点击页码的时候，会触发 jump 回调
      // 2. 只要调用了 laypage.render() 方法，就会触发 jump 回调
      jump: function (obj, first) {
        // 可以通过 first 的值，来判断是通过哪种方式，触发的 jump 回调
        // 如果 first 的值为 true，证明是方式2触发的
        // 否则就是方式1触发的
        // console.log(first)
        // console.log(obj.curr)
        // 把最新的页码值，赋值到 q 这个查询参数对象中
        q.pagenum = obj.curr
        // 把最新的条目数，赋值到 q 这个查询参数对象的 pagesize 属性中
        q.pagesize = obj.limit
        // 根据最新的 q 获取对应的数据列表，并渲染表格
        // initTable()
        if (!first) {
          initTable()
        }
      }
    })
  }
})
