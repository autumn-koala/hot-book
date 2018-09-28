// pages/login/login.js
const app = getApp();
const util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  //保存用户信息
  saveUserInfo: function () {
    console.log(app)
    util.request('/comm/saveUserInfo', {
      "city": this.data.userInfo.city,
      "country": this.data.userInfo.country,
      "nickname": this.data.userInfo.nickName,
      "productCode": "600009",
      "province": this.data.userInfo.province,
      "userAvatarUrl": this.data.userInfo.avatarUrl,
      "userNo": app.globalData.userInfo.userNo,
      "userSex": this.data.userInfo.gender,
      "wxOpenId": app.globalData.userInfo.openId
    },
      function (res) {
        //
      })
  },
  bindgetuserinfo: function (e) {
    let that = this
    if (e.detail.userInfo) {
      this.setData({
        userInfo:e.detail.userInfo
      })
      console.log(this.data.userInfo)

    
      app.login(that.saveUserInfo)

      console.log(9)
      wx.switchTab({
        url: '/pages/index/index',
      })
    } else {
      wx.showToast({
        title: '未授权成功',
        icon: 'none',
      })
    }
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: '打卡美食店，签到我的美食'
    }
  }
})