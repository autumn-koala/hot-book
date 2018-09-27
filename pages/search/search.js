// pages/search/search.js

const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    searchContext: '',
    historyList: [],
    hotSearchList: [],
    firstHot: ''
  },
  back:function(){
    wx.navigateBack({
      //
    })
  },
  /*输入框监控*/
  contextChange : function (e) {
    if (e.detail.value) {
      this.setData({
        searchContext: e.detail.value
      })
    }
  },
  /*回车搜索*/
  searchBtn : function (e) {
    if (this.data.searchContext) {
      this.doSearch(this.data.searchContext)
    }
  },
  /*按钮搜索*/
  searchIcon : function (e) {
    const item = e.currentTarget.dataset.name;
    this.doSearch(item)
  },
  /*搜索*/
  doSearch : function (item) {
    this.setHistory(item)
    wx.navigateTo({
      url: '/pages/searchResult/searchResult?searchContext=' + item,
    })
  },
  /*更新历史搜索*/
  setHistory: function (item) {
    let history = this.data.historyList;
    if (history.length >= 8) {
      history.pop();
    }
    history.unshift(item)
    history = [...new Set(history)]
    wx.setStorage({
      key: 'history',
      data: history
    })
  },
  /*清除历史记录*/
  clearHistory : function (e) {
    this.setData({
      historyList: []
    })
    wx.setStorage({
      key: 'history',
      data: [],
    })
  },
  /*获取热门搜索*/
  getHotList: function (e) {
    wx.request({
      url: 'https://www.qiyuchuhai.com/xcx/red_shop/querySearchRecommend',
      method: 'get',
      data: {},
      success: res => {
        if (res.data.respCode === '200' && res.data.data) {
          this.setData({
            hotSearchList: res.data.data
          })
        }
      },
      fail: res => {
        this.setData({
          hotSearchList: []
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getHotList();
    let list = [];
    list = wx.getStorageSync('history') || [];
    this.setData({
      historyList: list
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