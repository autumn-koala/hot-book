// pages/storeinfo/storeinfo.js
const app = getApp();




Page({

  /**
   * 页面的初始数据
   */
  data: {
    shopNo: null,
    p: 1
  },
  //拨打电话
  tel:function(e){
    console.log(e);
    wx.makePhoneCall({
      
      phoneNumber: e.currentTarget.dataset.tel,
      success:function(){
        console.log('拨打电话成功！')
      },
      fail:function(){
        console.log('拨打电话失败！')
      }
    })
  },
  //店铺分享
  shopShare: function () {
    wx.request({
      url: 'https://www.qiyuchuhai.com/xcx/red_shop/shopShare',
      method: "post",
      data: {
        "shopNo": this.data.ShopDetail.shopNo,
        "userNo": app.globalData.userInfo.userNo
      },
      success: res => {
        //
      }
    })
  },

  //获取用户手机号
  // getPhoneNumber: function(e) {
  //   console.log(e.detail.errMsg)
  //   console.log(e.detail.iv)
  //   console.log(e.detail.encryptedData)
  //   if (e.detail.errMsg == 'getPhoneNumber:fail user deny') {
  //     wx.showModal({
  //       title: '提示',
  //       showCancel: false,
  //       content: '未授权',
  //       success: function(res) {}
  //     })
  //   } else {
  //     wx.showModal({
  //       title: '提示',
  //       showCancel: false,
  //       content: '同意授权',
  //       success: function(res) {
  //       }
  //     })
      
  //   }
  // },

  //跳转店铺详情
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

  back: function() {
    wx.navigateBack({
      //
    })
  },
  //获取地址
  getPosition: function(e) {
    this.setData({
      latitude: parseFloat(e.currentTarget.dataset.latitude),
      longitude: parseFloat(e.currentTarget.dataset.longitude),
    })
    wx.openLocation({
      latitude: this.data.latitude,
      longitude: this.data.longitude,
      name: this.data.ShopDetail.shopName,
      address: this.data.ShopDetail.shopAddress,
      scale: 14
    })
    // wx.getLocation({
    //   type: 'gcj02', 
    //   success: function(res) {

    //   },
    // })

  },

  //跳转到地图
  tomap:function(e){
    wx.navigateTo({
      url: '/pages/position/position?latitude=' + e.currentTarget.dataset.latitude + '&longitude=' + e.currentTarget.dataset.longitude,
    })
  },
  //店铺关注
  shopLike: function(e) {
    wx.request({
      url: 'https://www.qiyuchuhai.com/xcx/red_shop/shopFollow',
      method: "post",
      data: {
        "shopNo": this.data.shopNo,
        "followFlag": !this.data.ShopDetail.follow,
        "userNo": app.globalData.userInfo.userNo
      },
      success: res => {
        this.getShopDetail();
      }
    })
  },
  /**店铺签到 */
  shopAutograph: function(e) {
    let autograph = `ShopDetail.autograph`
    wx.request({
      url: 'https://www.qiyuchuhai.com/xcx/red_shop/shopAutograph',
      method: "post",
      data: {
        "shopNo": this.data.shopNo,
        "userNo": app.globalData.userInfo.userNo
      },
      success: res => {
        this.setData({
          [autograph]: true
        })
        this.getShopDetail();
      }
    })
  },

  //获取店铺详情
  getShopDetail: function() {
    wx.showLoading({
      title: 'Loading...',
    })
    wx.request({
      url: 'https://www.qiyuchuhai.com//xcx/red_shop/queryShopDetail',
      method: "post",
      data: {
        "shopNo": this.data.shopNo,
        "userNo": app.globalData.userInfo.userNo
      },
      success: res => {
        wx.hideLoading();
        this.setData({
          ShopDetail: res.data.data
        })
      }
    })
  },

  //获取可能喜欢列表
  getMayLikeList: function() {
    wx.showLoading({
      title: 'Loading...',
    })
    wx.request({
      url: 'https://www.qiyuchuhai.com//xcx/red_shop/queryShopList',
      method: "post",
      data: {
        "currentPage": this.data.p,
        "pageSize": "5",
        "userNo": app.globalData.userInfo.userNo,
        "shopCity": this.data.shopCity,
        "shopClass": this.data.shopClass,
        "shopNo": this.data.shopNo
      },
      success: res => {
        wx.hideLoading();
        this.setData({
          mayLikeList: res.data.data
        })
      }
    })
  },
  /**店铺关注(可能喜欢) */
  MayLikeListshopLike: function(e) {
    let index = e.currentTarget.dataset.index;
    let follow = `mayLikeList[${index}].follow`;
    let followCount = `mayLikeList[${index}].followCount`;
    wx.request({
      url: 'https://www.qiyuchuhai.com/xcx/red_shop/shopFollow',
      method: "post",
      data: {
        "shopNo": this.data.mayLikeList[index].shopNo,
        "followFlag": !this.data.mayLikeList[index].follow,
        "userNo": app.globalData.userInfo.userNo
      },
      success: res => {
        if (this.data.mayLikeList[index].follow) {
          this.setData({
            [follow]: !this.data.mayLikeList[index].follow,
            [followCount]: this.data.mayLikeList[index].followCount - 1
          })
        } else {
          this.setData({
            [follow]: !this.data.mayLikeList[index].follow,
            [followCount]: this.data.mayLikeList[index].followCount + 1
          })
        }
        // this.getShopListAll();
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      shopNo: options.shopNo,
      shopCity: options.shopCity,
      shopClass: options.shopClass
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
    this.getShopDetail();


    this.getMayLikeList();


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
      wait: true
    })
    wx.request({
      url: 'https://www.qiyuchuhai.com//xcx/red_shop/queryShopList',
      method: "post",
      data: {
        "currentPage": this.data.p,
        "pageSize": "6",
        "userNo": app.globalData.userInfo.userNo,
        "shopCity": this.data.shopCity,
        "shopClass": this.data.shopClass
      },
      success: res => {
        if (res.data.data) {
          this.setData({
            mayLikeList: this.data.mayLikeList.concat(res.data.data)
          })
        } else {
          wx.showToast({
            title: '没有更多了...',
            icon: "none"
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