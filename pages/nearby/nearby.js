// pages/nearby/nearby.js
const app = getApp();
const util = require('../../utils/util.js');
// var QQMapWX = require('../../utils/qqmap-wx-jssdk.js')
// var qqmapsdk;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    p: 1,
    lableList: []
  },

  tonearbyCate: function(e) {
    // console.log(e);
    // let shopClass = e.currentTarget.dataset.shopclass;
    // let latitude = e.currentTarget.dataset.latitude;
    // let longitude = e.currentTarget.dataset.longitude;
    wx.navigateTo({
      url: '../nearbyCate/nearbyCate?shopClass=' + e.currentTarget.dataset.shopclass + '&latitude=' + e.currentTarget.dataset.latitude + '&longitude=' + e.currentTarget.dataset.longitude,
    })
  },

  tostoreinfo: function() {
    wx.navigateTo({
      url: '../storeinfo/storeinfo',
    })
  },

  //获取用户位置信息
  getPosition: function() {
    var that = this;
    wx.getLocation({
      success: function(res) {
        console.log(res)
        that.setData({
          latitude: res.latitude,
          longitude: res.longitude
        })
      },
    })
  },




  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getPosition();
    // var userNo = wx.getStorageSync("userInfo['userNo']"); //wx.getStorageSync(key)，获取本地缓存
    // this.setData({
    //   userNo: userNo
    // })
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
    //获取用户信息
    wx.getLocation({
      success: function(res) {
        latitude: res.latitude;
        longitude: res.longitude;
      },
    })
    // this.getNearBy();
    var that = this;

    setTimeout(function() {
      //获取附近标签
      wx.request({
        url: 'http://xcx-dev.qiyuchuhai.com/xcx/red_shop/queryNearbyShopClassList',
        method: "post",
        data: {
          "latitude": that.data.latitude,
          "longitude": that.data.longitude,
          "userNo": app.globalData.userInfo.userNo
        },
        success: res => {
          console.log(res);
          that.setData({
            NearbyShopClassList: res.data.data
          })
        }
      })

      //获取附近美食列表
      wx.request({
        url: 'http://xcx-dev.qiyuchuhai.com/xcx/red_shop/queryNearbyShopList',
        method: "post",
        data: {
          "currentPage": that.data.p,
          "pageSize": "8",
          "latitude": that.data.latitude,
          "longitude": that.data.longitude,
          "userNo": app.globalData.userInfo.userNo
        },
        success: res => {
          console.log(res);
          that.setData({
            NearbyShopList: res.data.data
          })
        }
      })
    }, 2000)


    console.log(this.data.latitude);
    console.log(this.data.longitude);

    // this.getNearBy();
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
        "userNo": app.globalData.userInfo.userNo
      },
      success: res => {
        if(res.data.data){
          this.setData({
            NearbyShopList: this.data.NearbyShopList.concat(res.data.data)
          })
        }else{
          wx.showToast({
            title: '没有更多了...',
            icon:"none",
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