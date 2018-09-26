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
  shopLike: function (e) {
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
  tostoreinfo: function (e) {
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
    // wx.getLocation({
    //   success: function(res) {
    //     latitude: res.latitude;
    //     longitude: res.longitude;
    //   },
    // })
    // this.getNearBy();
    var that = this;

    setTimeout(function() {
      wx.showLoading({
        title: 'Loading...',
      })
      if (that.data.latitude && that.data.longitude){
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
            wx.hideLoading();
            that.setData({
              NearbyShopClassList: res.data.data
            })
          }
        })

        wx.showLoading({
          title: 'Loading',
        })
        //获取附近美食列表
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
            wx.hideLoading();
            that.setData({
              NearbyShopList: res.data.data
            })
          }
        })
      }else{
        wx.showToast({
          title: '获取位置失败，请检查网络...',
          icon:"none"
        })
      }
     
    }, 2000)

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
      url: 'https://www.qiyuchuhai.com/xcx/red_shop/queryNearbyShopList',
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