// pages/searchResult/searchResult.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    searchContext: '',
    searchList: [],
    userNo: '',
    currentPage: 0,
    pageSize: 10,
    searchNone: false
  },
  /*获取搜索列表*/
  getSearchList : function () {
    wx.request({
      url: 'http://xcx-dev.qiyuchuhai.com/xcx/red_shop/searchShopList',
      method: 'post',
      data: {
        currentPage: this.data.currentPage,
        pageSize: this.data.pageSize,
        searchLabel: this.data.searchContext,
        userNo: this.data.userNo
      },
      success: res => {
        let list = this.data.searchList;
        res.data.data.searchShopList.map(item => {
          list.push(item)
        })
        this.setData({
          searchList: list
        })
        if (res.data.data.searchShopList.length == this.data.pageSize && this.data.searchList.length < res.data.data.shopCount) {
          this.setData({
            currentPage: this.data.currentPage + 1
          })
        } else {
          wx.showToast({
            title: '没有更多店铺了',
            icon: 'none'
          })
        }
        if (this.data.searchList.length === 0) {
          this.setData({
            searchNone: true
          })
        }
      },
      fail: res => {
        if (this.searchList.length === 0) {
          this.setData({
            searchNone: true
          })
        } else {
          this.setData({
            searchNone: false
          })
        }
        wx.showToast({
          title: '请检查网络',
          icon: 'none'
        })
      }
    })
  },
  /*输入框监控*/
  contextChange: function (e) {
    if (e.detail.value) {
      this.setData({
        searchContext: e.detail.value
      })
    }
  },
  /*回车搜索*/
  searchBtn: function (e) {
    if (this.data.searchContext) {
      this.getSearchList()
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      searchContext: options.searchContext,
    })
    this.setData({
      userNo: wx.getStorageSync('userInfo') ? wx.getStorageSync("userInfo").userNo : ''
    })
    this.getSearchList()
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
    this.getSearchList();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})