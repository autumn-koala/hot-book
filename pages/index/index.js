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

  //获取用户位置信息
  // getPosition: function() {
  //   var that = this;
  //   wx.getLocation({
  //     success: function(res) {
  //       console.log(res)
  //       that.setData({
  //         latitude: res.latitude,
  //         longitude: res.longitude
  //       })
  //     },
  //   })
  // },



  tosearch: function() {
    setTimeout(() => {
      wx.navigateTo({
        url: '../search/search',
      })
    }, 150)

  },
//跳店铺详情页
  tostoreinfo: function(e) {
    wx.navigateTo({
      url: '../storeinfo/storeinfo?shopNo=' + e.currentTarget.dataset.shopno + '&shopCity=' + e.currentTarget.dataset.shopcity + '&shopClass=' + e.currentTarget.dataset.shopclass,
    })
  },

  //轮播图跳店铺详情页
  tostoreinfo1: function (e) {
    wx.navigateTo({
      url: '../storeinfo/storeinfo?shopNo=' + e.currentTarget.dataset.shopno,
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
        "followFlag":!this.data.ShopList[index].follow,
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

//店铺分享
  shopShare:function(e){
    let index = e.currentTarget.dataset.index;
    wx.request({
      url: 'https://www.qiyuchuhai.com/xcx/red_shop/shopShare',
      method:"post",
      data:{
        "shopNo": this.data.ShopList[index].shopNo,
        "userNo": app.globalData.userInfo.userNo
      },
      success:res=>{
        //
      }
    })
  },


  //保存用户信息
  saveUserInfo: function() {
    util.request('/comm/saveUserInfo', {
        "city": app.globalData.userInfo.city,
        "country": app.globalData.userInfo.country,
        "nickname": app.globalData.userInfo.nickName,
        "productCode": "600009",
        "province": app.globalData.userInfo.province,
        "userAvatarUrl": app.globalData.userInfo.avatarUrl,
        "userNo": app.globalData.userInfo.userNo,
        "userSex": app.globalData.userInfo.gender,
        "wxOpenId": app.globalData.userInfo.openId
      },
      function(res) {
        //
      })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // this.getHomePage();
    // this.saveUserInfo();
    // this.setData({
    //   userNo: app.globalData.userInfo.userNo
    // })
    // this.getPosition();
    // wx.request({
    //   url: '',
    // })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  //获取首页全部店铺列表
  getShopListAll: function() {
    wx.request({
      url: 'https://www.qiyuchuhai.com/xcx/red_shop/queryShopList',
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
  },
  //获取首页轮播图
  getPageHomeBanner: function() {
    wx.request({
      url: 'https://www.qiyuchuhai.com/xcx/red_shop/queryPageHomeBanner',
      success: res => {
        // wx.hideLoading();
        this.setData({
          Banner: res.data.data
        })
      }
    })
  },
  //获取首页城市分类
  getCityClassifyList: function() {
    wx.request({
      url: 'https://www.qiyuchuhai.com/xcx/red_shop/queryCityClassifyList',
      success: res => {
        // wx.hideLoading();
        this.setData({
          CityClassifyList: res.data.data
        })
      }
    })
  },

  getHomePage:function(){
    this.getShopListAll();

    this.getPageHomeBanner();

    this.getCityClassifyList();
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    // this.getShopListAll();

    // this.getPageHomeBanner();

    // this.getCityClassifyList();
    this.getHomePage();
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
    // this.getHomePage();
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
        url: 'https://www.qiyuchuhai.com/xcx/red_shop/queryShopList',
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
  onShareAppMessage: function(res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: '打卡美食店，签到我的美食'
    }
  }
})