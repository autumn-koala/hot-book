// pages/localCuisine/localCuisine.js
const app = getApp();
const util = require('../../utils/util.js')


Page({

  /**
   * 页面的初始数据
   */
  data: {
    p: 1,

  },
  back: function() {
    wx.navigateBack({
      //
    })
  },
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

  //城市美食关注
  cityFollow: function(e) {
    wx.request({
      url: 'https://www.qiyuchuhai.com/xcx/red_shop/cityFoodFollow',
      method: "post",
      data: {
        "cityName": this.data.CityFoodDetail.cityName,
        "followFlag": !this.data.CityFoodDetail.follow,
        "userNo": app.globalData.userInfo.userNo
      },
      success: res => {
        this.getCityFoodDetail();
      }
    })
  },
  //获取地方美食明细
  getCityFoodDetail: function() {
    wx.request({
      url: 'https://www.qiyuchuhai.com/xcx/red_shop/queryCityFoodDetail',
      method: "post",
      data: {
        "cityName": this.data.cityName,
        "currentPage": this.data.p,
        "pageSize": 4,
        "userNo": app.globalData.userInfo.userNo
      },
      success: res => {
        wx.hideLoading();
        // console.log(res.data);
        this.setData({
          CityFoodDetail: res.data.data
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

    var userNo = wx.getStorageSync("userInfo['userNo']"); //wx.getStorageSync(key)，获取本地缓存
    this.setData({
      userNo: userNo,
      cityName: options.cityName
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
    wx.showLoading({
      title: 'Loading',
    })
    //获取地方美食明细
    this.getCityFoodDetail();

    //获取地方相关餐厅列表
    wx.request({
      url: 'https://www.qiyuchuhai.com/xcx/red_shop/queryCityShopList',
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
      url: 'https://www.qiyuchuhai.com/xcx/red_shop/queryShopList',
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
  /**店铺关注 */
  shopLike: function(e) {
    let index = e.currentTarget.dataset.index;
    let follow = `ShopList[${index}].follow`;
    let followCount = `ShopList[${index}].followCount`;
    wx.request({
      url: 'https://www.qiyuchuhai.com/xcx/red_shop/shopFollow',
      method: "post",
      data: {
        "shopNo": this.data.ShopList[index].shopNo,
        "followFlag": !this.data.ShopList[index].follow,
        "userNo": app.globalData.userInfo.userNo
      },
      success: res => {
        if (this.data.ShopList[index].follow) {
          this.setData({
            [follow]: !this.data.ShopList[index].follow,
            [followCount]: this.data.ShopList[index].followCount - 1
          })
        } else {
          this.setData({
            [follow]: !this.data.ShopList[index].follow,
            [followCount]: this.data.ShopList[index].followCount + 1
          })
        }
        // this.getShopListAll();
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
      p: this.data.p + 1,
    })
    wx.request({
      url: 'https://www.qiyuchuhai.com/xcx/red_shop/queryShopList',
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
        if (res.data.data) {
          this.setData({
            ShopList: this.data.ShopList.concat(res.data.data)
          })
        } else {
          wx.showToast({
            title: '没有更多了...',
            icon: 'none'
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