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
  shopLike: function (e) {
    let index = e.currentTarget.dataset.index;
    let follow = `NearbyShopList[${index}].follow`;
    let followCount = `NearbyShopList[${index}].followCount`;
    wx.request({
      url: 'http://xcx-dev.qiyuchuhai.com/xcx/red_shop/shopFollow',
      method: "post",
      data: {
        "shopNo": this.data.NearbyShopList[index].shopNo,
        "followFlag": !this.data.NearbyShopList[index].follow,
        "userNo": app.globalData.userInfo.userNo
      },
      success: res => {
        if (this.data.NearbyShopList[index].follow) {
          this.setData({
            [follow]: !this.data.NearbyShopList[index].follow,
            [followCount]: this.data.NearbyShopList[index].followCount - 1
          })
        } else {
          this.setData({
            [follow]: !this.data.NearbyShopList[index].follow,
            [followCount]: this.data.NearbyShopList[index].followCount + 1
          })
        }
        // this.getShopListAll();
      }
    })
  },
  back: function() {
    wx.navigateBack({
      //
    })
  },
  tostoreinfo: function (e) {
    console.log(e);
    this.setData({
      shopClass: e.currentTarget.dataset.shopclass,
    })
    wx.navigateTo({
      url: '../storeinfo/storeinfo?shopNo=' + e.currentTarget.dataset.shopno + '&shopClass=' + e.currentTarget.dataset.shopclass ,
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