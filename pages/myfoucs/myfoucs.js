// pages/myfoucs/myfoucs.js
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    select: true,
    select1: false,
    cityShopList: [],
    cityFoodList: [],
    pageSize: 10,
    currentPage: 1,
    isEmpty: false,
    noMore: false
  },
  back: function () {
    wx.navigateBack({
      //
    })
  },

//跳转地方美食
toLocalCuisine:function(e){
  wx.navigateTo({
    url: '/pages/localCuisine/localCuisine?cityName='+e.currentTarget.dataset.cityname,
  })
},

  toggleTable: function () {
    this.setData({
      select: !this.data.select,
      select1: !this.data.select1,
      currentPage: 1,
      noMore: false,
      cityShopList: [],
      cityFoodList: []
    })
    this.data.select && this.getMyFocusShop();
    this.data.select1 && this.getMyFocusFood();
  },
  /*获取店铺关注列表*/
  getMyFocusShop: function () {
    if (this.data.noMore) {
      return;
    }
    wx.showLoading({
      title: 'Loading...',
    })
    wx.request({
      url: 'http://xcx-dev.qiyuchuhai.com/xcx/red_shop/queryShopFollowList',
      method: 'post',
      data: {
        currentPage: this.data.currentPage,
        pageSize: this.data.pageSize,
        userNo: app.globalData.userInfo.userNo
      },
      success: res => {
        wx.hideLoading();
        let list = this.data.cityShopList;
        if (res.data.data) {
          res.data.data.map(item => {
            list.push(item)
          })
          this.setData({
            cityShopList: res.data.data
          })
          this.setData({
            currentPage: this.data.currentPage + 1
          })
        } else if (list.length > 0) {
          wx.showToast({
            title: '没有更多店铺了',
            icon: 'none'
          })
          this.setData({
            noMore: true
          })
        } else {
          this.setData({
            isEmpty: true,
          })
        }
      },
      fail: res => {
        if (this.data.cityShopList.length === 0) {
          this.setData({
            isEmpty: true
          })
        } else {
          this.setData({
            isEmpty: false
          })
        }
        wx.showToast({
          title: '请检查网络',
          icon: 'none'
        })
      }
    })
  },
  /*获取美食关注列表*/
  getMyFocusFood: function () {
    if (this.data.noMore) {
      return;
    }
    wx.showLoading({
      title: 'Loading...',
    })
    wx.request({
      url: 'http://xcx-dev.qiyuchuhai.com/xcx/red_shop/queryCityFoodFollowList',
      method: 'post',
      data: {
        currentPage: this.data.currentPage,
        pageSize: this.data.pageSize,
        userNo: app.globalData.userInfo.userNo
      },
      success: res => {
        wx.hideLoading();
        let list = this.data.cityFoodList;
        if (res.data.data) {
          res.data.data.map(item => {
            list.push(item)
          })
          this.setData({
            cityFoodList: list
          })
          this.setData({
            currentPage: this.data.currentPage + 1
          })
        } else if (list.length > 0) {
          wx.showToast({
            title: '没有更多美食了',
            icon: 'none'
          })
        } else {
          this.setData({
            isEmpty: true
          })
        }
      },
      fail: res => {
        if (this.data.cityFoodList.length === 0) {
          this.setData({
            isEmpty: true
          })
        } else {
          this.setData({
            isEmpty: false
          })
        }
        wx.showToast({
          title: '请检查网络',
          icon: 'none'
        })
      }
    })
  },
  /*跳转店铺详情*/
  toShop: function (e) {
    wx.redirectTo({
      url: '/pages/storeinfo/storeinfo?shopNo=' + e.currentTarget.dataset.id,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getMyFocusShop();
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
    this.data.select && this.getMyFocusShop()
    this.data.select1 && this.getMyFocusFood()
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