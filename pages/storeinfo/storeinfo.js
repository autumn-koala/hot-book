// pages/storeinfo/storeinfo.js
const app = getApp();




Page({

  /**
   * 页面的初始数据
   */
  data: {
    shopNo:null,
    p:1
  },


  back:function(){
    wx.navigateBack({
      //
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      shopNo:options.shopNo,
      shopCity:options.shopCity,
      shopClass: options.shopClass
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
    //获取店铺详情
    wx.request({
      url: 'http://xcx-dev.qiyuchuhai.com//xcx/red_shop/queryShopDetail',
      method:"post",
      data:{
        "shopNo":this.data.shopNo,
        "userNo": app.globalData.userInfo.userNo
      },
      success:res=>{
        this.setData({
          ShopDetail:res.data.data
        })
      }
    })

    //获取可能喜欢列表
    wx.request({
      url: 'http://xcx-dev.qiyuchuhai.com//xcx/red_shop/queryShopList',
      method:"post",
      data:{
        "currentPage": this.data.p,
        "pageSize": "5",
        "userNo": app.globalData.userInfo.userNo,
        "shopCity":this.data.shopCity,
        "shopClass":this.data.shopClass,
        "shopNo":this.data.shopNo
      },
      success:res=>{
        wx.hideLoading();
        this.setData({
          mayLikeList:res.data.data
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
      wait: true
    })
    wx.request({
      url: 'http://xcx-dev.qiyuchuhai.com//xcx/red_shop/queryShopList',
      method: "post",
      data: {
        "currentPage": this.data.p,
        "pageSize": "6",
        "userNo": app.globalData.userInfo.userNo,
        "shopCity": this.data.shopCity,
        "shopClass": this.data.shopClass
      },
      success: res => {
        this.setData({
          mayLikeList: this.data.mayLikeList.concat(res.data.data)
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