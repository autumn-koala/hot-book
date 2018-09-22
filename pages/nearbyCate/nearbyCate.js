// pages/nearbyCate/nearbyCate.js
const app = getApp();
const util = require('../../utils/util.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    p: 1
  },

  back: function() {
    wx.navigateBack({
      //
    })
  },
  tostoreinfo: function() {
    wx.navigateTo({
      url: '../storeinfo/storeinfo',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      shopClass: options.shopClass,
      latitude: options.latitude,
      longitude: options.longitude
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    wx.request({
      url: 'http://xcx-dev.qiyuchuhai.com/xcx/red_shop/queryNearbyShopList',
      method: "post",
      data: {
        "currentPage": this.data.p,
        "pageSize": "8",
        "latitude": this.data.latitude,
        "longitude": this.data.longitude,
        "shopClass": this.data.shopClass,
        "userNo": app.globalData.userInfo.userNo
      },
      success: res => {
        this.setData({
          NearbyShopList: res.data.data
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    this.setData({
      p: this.data.p + 1
    })
    wx.request({
      url: 'http://xcx-dev.qiyuchuhai.com/xcx/red_shop/queryNearbyShopList',
      method: "post",
      data: {
        "currentPage": this.data.p,
        "pageSize": "8",
        "latitude": this.data.latitude,
        "longitude": this.data.longitude,
        "shopClass": this.data.shopClass,
        "userNo": app.globalData.userInfo.userNo
      },
      success: res => {
        if (res.data.data) {
          this.setData({
            NearbyShopList: this.data.NearbyShopList.concat(res.data.data)
          })
        }else{
          wx.showToast({
            title: '没有更多了...',
            icon:'none',
            mask:true
          })
        }

      }
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})