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
    util.request('/comm/saveUserInfo', {
      "city": app.globalData.userInfo.city,
      "country": app.globalData.userInfo.country,
      "nickname": app.globalData.userInfo.nickName,
      "productCode": "600009",
      "province": app.globalData.userInfo.province,
      "userAvatarUrl": app.globalData.userInfo.avatarUrl,
      "userNo": app.globalData.userInfo.userNo,
      "userSex": app.globalData.userInfo.gender,
      "wxOpenId": app.globalData.userInfo.openId
    },
      function (res) {
        //
      })
  },
  bindgetuserinfo: function (e) {
    if (e.detail.userInfo) {
      app.login();
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
    this.saveUserInfo();

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

  }
})