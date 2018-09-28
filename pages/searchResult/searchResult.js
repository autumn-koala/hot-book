// pages/searchResult/searchResult.js

const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    searchContext: '',
    searchList: [],
    historyList: [],
    currentPage: 1,
    pageSize: 10,
    searchNone: false
  },
  back: function () {
    wx.navigateBack({
      //
    })
  },
//店铺关注
  shopLike: function (e) {
    let index = e.currentTarget.dataset.index;
    let follow = `searchList[${index}].follow`;
    let followCount = `searchList[${index}].followCount`;
    wx.request({
      url: 'https://www.qiyuchuhai.com/xcx/red_shop/shopFollow',
      method: "post",
      data: {
        "shopNo": this.data.searchList[index].shopNo,
        "followFlag": !this.data.searchList[index].follow,
        "userNo": app.globalData.userInfo.userNo
      },
      success: res => {
        if (this.data.searchList[index].follow) {
          this.setData({
            [follow]: !this.data.searchList[index].follow,
            [followCount]: this.data.searchList[index].followCount - 1
          })
        } else {
          this.setData({
            [follow]: !this.data.searchList[index].follow,
            [followCount]: this.data.searchList[index].followCount + 1
          })
        }
        // this.getShopListAll();
      }
    })
  },


  /*获取搜索列表*/
  getSearchList : function () {
    wx.request({
      url: 'https://www.qiyuchuhai.com/xcx/red_shop/searchShopList',
      method: 'post',
      data: {
        currentPage: this.data.currentPage,
        pageSize: this.data.pageSize,
        searchLabel: this.data.searchContext,
        userNo: app.globalData.userInfo.userNo
      },
      success: res => {
        if (res.data.data) {
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
    this.setData({
      searchList: []
    })
    this.setData({
      currentPage: 0
    })
    if (this.data.searchContext) {
      this.setHistory(this.data.searchContext);
      this.getSearchList();
    }
  },
  /*更新历史搜索*/
  setHistory: function (item) {
    let history = this.data.historyList;
    if (history.length >= 8) {
      history.pop();
    }
    history.unshift(item)
    history = [...new Set(history)]
    // this.setData({
    //   historyList: history
    // })
    wx.setStorage({
      key: 'history',
      data: history
    })
  },
  /*清除搜索条件*/
  clearSearch : function () {
    this.setData({
      searchContext: '',
      searchList:null,
      // searchNone:true
    })
    wx.navigateBack({
      
    })
  },
  /*跳转店铺详情*/
  toShop: function (e) {
    wx.navigateTo({
      url: '/pages/storeinfo/storeinfo?shopNo=' + e.currentTarget.dataset.id,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    this.setData({
      searchContext: options.searchContext,
    })
    this.getSearchList();
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
    this.getSearchList();
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