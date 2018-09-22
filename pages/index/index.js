// pages/index/index.js

const util = require('../../utils/util.js');
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    autoplay: true,
    preMargin: 30,
    nextMargin: 30,
    Banner: [],
    CityClassifyList: [],
    ShopList: [],
    p: 1,
    ShopIndex: 0,
    userNo: null
  },




  tosearch: function() {
    setTimeout(() => {
      wx.navigateTo({
        url: '../search/search',
      })
    }, 150)

  },
  // tolocalCuisine: function(e) {
  //   console.log(e);
  //   this.setData({
  //     cityName: e.currentTarget.dataset.cityName
  //   })
  //   setTimeout(() => {
  //     wx.navigateTo({
  //       url: '../localCuisine/localCuisine?cityName='+this.data.cityName,
  //     })
  //   }, 150)
  // },

  tostoreinfo: function() {
    setTimeout(() => {
      wx.navigateTo({
        url: '../storeinfo/storeinfo',
      })
    }, 150)
  },


  /**店铺关注 */
  shopLike: function(e) {
    
  },

  /**分享 */
  toshareShop: function(e) {
    wx.request({
      url: 'http://xcx-dev.qiyuchuhai.com/xcx/red_shop/shopShare',
      method: "post",
      data: {
        "shopNo": e.currentTarget.dataset.shopNo,
        "userNo": this.data.userNo
      },
      success: res => {
        this.setData({

        })
      }
    })
  },








  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    var userNo = wx.getStorageSync("userInfo['userNo']"); //wx.getStorageSync(key)，获取本地缓存
    this.setData({
      userNo: userNo
    })

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  getHomePage: function() {
    //获取首页全部店铺列表
    wx.showLoading({
      title: 'Loading',
      mask:true
    })
    wx.request({
      url: 'http://xcx-dev.qiyuchuhai.com/xcx/red_shop/queryShopList',
      method: "post",
      data: {
        "currentPage": this.data.p,
        "pageSize": "2",
        "userNo": app.globalData.userInfo.userNo
      },
      success: res => {
        wx.hideLoading(this),
          this.setData({
            ShopList: res.data.data
          })
      }
    })
    //获取首页轮播图
    wx.request({
      url: 'http://xcx-dev.qiyuchuhai.com/xcx/red_shop/queryPageHomeBanner',
      success: res => {
        // wx.hideLoading();
        this.setData({
          Banner: res.data.data
        })
      }
    })
    //获取首页城市分类
    // wx.showLoading({
    //   title: 'Loading',
    // })
    wx.request({
      url: 'http://xcx-dev.qiyuchuhai.com/xcx/red_shop/queryCityClassifyList',
      success: res => {
        // wx.hideLoading();
        this.setData({
          CityClassifyList: res.data.data
        })
      }
    })
    
  },


  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    // wx.showLoading({
    //   title: 'Loading',
    // })
    this.getHomePage();
    // wx.hideLoading();
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
    this.getHomePage();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    this.setData({
      p: this.data.p + 1,
      wait: true
    })
    util.showLoading(this),
      wx.request({
        url: 'http://xcx-dev.qiyuchuhai.com/xcx/red_shop/queryShopList',
        method: "post",
        header: {

        },
        data: {
          "currentPage": this.data.p,
          "pageSize": "3",
          "userNo": app.globalData.userInfo.userNo
        },
        success: res => {
          this.setData({
            wait: false,
            ShopList: this.data.ShopList.concat(res.data.data)
          })

        }
      })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})