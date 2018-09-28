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
  /**店铺关注 */
  shopLike: function(e) {
    let index = e.currentTarget.dataset.index;
    let follow = `NearbyShopList[${index}].follow`;
    let followCount = `NearbyShopList[${index}].followCount`;
    wx.request({
      url: 'https://www.qiyuchuhai.com/xcx/red_shop/shopFollow',
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
  tonearbyCate: function(e) {
    wx.navigateTo({
      url: '../nearbyCate/nearbyCate?shopClass=' + e.currentTarget.dataset.shopclass + '&latitude=' + e.currentTarget.dataset.latitude + '&longitude=' + e.currentTarget.dataset.longitude,
    })
  },
  // 跳转店铺详情
  tostoreinfo: function(e) {
    console.log(e);
    this.setData({
      shopClass: e.currentTarget.dataset.shopclass,
      shopCity: e.currentTarget.dataset.shopcity
    })
    wx.navigateTo({
      url: '../storeinfo/storeinfo?shopNo=' + e.currentTarget.dataset.shopno + '&shopClass=' + e.currentTarget.dataset.shopclass + '&shopCity=' + e.currentTarget.dataset.shopcity,
    })
  },

  //获取用户位置信息
  getPosition: function(sucFun) {
    var that = this;
    wx.getLocation({
      success: function(res) {
        console.log(res)
        that.setData({
          latitude: res.latitude,
          longitude: res.longitude
        })
        sucFun()
      },
    })
  },




  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    
    wx.showToast({
      title: '正在获取地理位置，请稍候...',
      icon: "none"
    })
    this.getPosition(this.getNearByList);
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

getNearByList:function(){
  var that = this
  //获取附近标签
  wx.request({
    url: 'https://www.qiyuchuhai.com/xcx/red_shop/queryNearbyShopClassList',
    method: "post",
    data: {
      "latitude": that.data.latitude,
      "longitude": that.data.longitude,
      "userNo": app.globalData.userInfo.userNo
    },
    success: res => {
      that.setData({
        NearbyShopClassList: res.data.data
      })
    }
  })

  that.setData({
    p: 1
  })
  //获取附近美食列表
  wx.request({
    url: 'https://www.qiyuchuhai.com/xcx/red_shop/queryNearbyShopList',
    method: "post",
    data: {
      "currentPage": that.data.p,
      "pageSize": "10",
      "latitude": that.data.latitude,
      "longitude": that.data.longitude,
      "userNo": app.globalData.userInfo.userNo
    },
    success: res => {
      that.setData({
        NearbyShopList: res.data.data
      })
    }
  })
},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    var that = this;
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
    var that = this;
    that.setData({
      p: that.data.p + 1,
      wait: true
    })
    wx.request({
      url: 'https://www.qiyuchuhai.com/xcx/red_shop/queryNearbyShopList',
      method: "post",
      data: {
        "currentPage": that.data.p,
        "pageSize": "8",
        "latitude": that.data.latitude,
        "longitude": that.data.longitude,
        "userNo": app.globalData.userInfo.userNo
      },
      success: res => {
        if(res.data.data){
          that.setData({
            wait: false,
            NearbyShopList: that.data.NearbyShopList.concat(res.data.data)
          })
        } else {
          wx.showToast({
            title: '没有更多了...',
            icon: 'none',
            mask: true
          })
          this.setData({
            wait: false
          })
        }
        
      }
    })
  },


  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: '打卡美食店，签到我的美食'
    }
  }
})