const baseUrl = 'https://www.qiyuchuhai.com/xcx'


const showLoading = page =>{
  page.setData({
    loading:true
  })
}

const hideLoading = page => {
  page.setData({
    loading: false
  })
}


function createPubParam() {
  var date = new Date()
  var reqNo = 'qych' + date.getTime()
  var reqTime = date.getFullYear() + '/' + date.getMonth() + '/' + date.getDate() + '-' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds()
  return { 'reqNo': reqNo, 'reqTime': reqTime }
}

function myRequest(url, params, suc_callback, fail_callback) {
  const DC = new createPubParam()
  let data = Object.assign({
    reqNo: DC.reqNo,
    reqTime: DC.reqTime,
    productCode: 600009,
  }, params)

  // wx.showLoading({
  //   title: '加载中..',
  // })

  wx.request({
    url: baseUrl + url,
    data: data,
    method: 'POST',

    success: function (res) {
      suc_callback(res.data.data)
      // wx.hideLoading()
    },

    fail: function (res) {
      // fail_callback(res)
      console.log('fail' + res)
      wx.showToast({
        title: '数据出错!',
        icon: 'none',
        image: '',
        duration: 0,
        mask: true,
      })
    },
  })
}


module.exports = {
  showLoading: showLoading,
  hideLoading: hideLoading,
  request: myRequest
}

