// pages/localCuisine/localCuisine.js
const app = getApp();
const util = require('../../utils/util.js')


Page({

  /**
   * 页面的初始数据
   */
  data: {
    p:1,

  },
  back: function () {
    wx.navigateBack({
      //
    })
  },
  tostoreinfo:function(){
    wx.navigateTo({
      url: '../storeinfo/storeinfo',
    })
  },

  //城市美食关注
  shopLike: function (e) {
    console.log(1);
    let cityName = e.currentTarget.dataset.cityName;
    let follow = this.data.ShopDetail.follow;
    let followCount = this.data.ShopDetail.followCount;
    wx.request({
      url: 'http://xcx-dev.qiyuchuhai.com/xcx/red_shop/shopFollow',
      method: "post",
      data: {
        "cityName": this.data.cityName,
        "userNo": app.globalData.userInfo.userNo
      },
      success: res => {
        
        // if (this.data.ShopDetail.follow) {
        //   this.setData({
        //     [follow]: !this.data.ShopDetail.follow,
        //     [followCount]: this.data.ShopDetail.followCount - 1
        //   })
        // } else {
        //   this.setData({
        //     [follow]: !this.data.ShopDetail.follow,
        //     [followCount]: this.data.ShopDetail.followCount + 1
        //   })
        // }
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    var userNo = wx.getStorageSync("userInfo['userNo']"); //wx.getStorageSync(key)，获取本地缓存
    this.setData({
      userNo:userNo,
      cityName: options.cityName
    })
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
    wx.showLoading({
      title: 'Loading',
    })
    //获取地方美食明细
    wx.request({
      url: 'http://xcx-dev.qiyuchuhai.com/xcx/red_shop/queryCityFoodDetail',
      method: "post",
      data: {
        "cityName": this.data.cityName,
        "currentPage": this.data.p,
        "pageSize": 4,
        "userNo": app.globalData.userInfo.userNo
      },
      success: res => {
        wx.hideLoading();
        console.log(res.data);
        this.setData({
          CityFoodDetail: res.data.data
        })
      }
    })

    //获取地方相关餐厅列表
    wx.request({
      url: 'http://xcx-dev.qiyuchuhai.com/xcx/red_shop/queryCityShopList',
      method: "post",
      data: {
        "cityName": this.data.cityName,
        "currentPage": this.data.p,
        "pageSize": 4,
        "userNo": app.globalData.userInfo.userNo
      },
      success: res => {
        wx.hideLoading();
        console.log(res.data);
        this.setData({
          cityShopList: res.data.data
        })
      }
    })

    //获取地方全部美食店铺列表
    wx.request({
      url: 'http://xcx-dev.qiyuchuhai.com/xcx/red_shop/queryShopList',
      method: "post",
      data: {
        "cityName": this.data.cityName,
        "currentPage": this.data.p,
        "pageSize": 4,
        "userNo": app.globalData.userInfo.userNo,
        "shopCity": this.data.cityName
      },
      success: res => {
        wx.hideLoading();
        console.log(res.data);
        this.setData({
          ShopList: res.data.data
        })
      }
    })
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
    this.setData({
      p: this.data.p + 1,
    })
    wx.request({
      url: 'http://xcx-dev.qiyuchuhai.com/xcx/red_shop/queryShopList',
      method: "post",
      data: {
        "cityName": this.data.cityName,
        "currentPage": this.data.p,
        "pageSize": 6,
        "userNo": app.globalData.userInfo.userNo,
        "shopCity": this.data.cityName
      },
      success: res => {
        wx.hideLoading();
        console.log(res.data);
        this.setData({
          ShopList: this.data.ShopList.concat(res.data.data)
        })
      }
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})