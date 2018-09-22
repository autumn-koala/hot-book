// pages/myfoucs/myfoucs.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    select: true,
    select1: false,
    cityShopList: [
      {
        "shopNo": 518,
        "shopName": "国贸",
        "shopBanner": "http://ci.xiaohongshu.com/3a62f857-e980-59e8-8d3b-0a1ea4c8948e",
        "shopClass": "自助餐",
        "shopCity": "北京",
        "shopAutographCount": 861
      },
      {
        "shopNo": 1003,
        "shopName": "奈雪の茶(西直门凯徳店)",
        "shopBanner": "http://ci.xiaohongshu.com/13a0bd25-060c-5e11-b279-ccafac1360db",
        "shopClass": "甜品饮品",
        "shopCity": "北京",
        "shopAutographCount": 618
      },
      {
        "shopNo": 1000,
        "shopName": "page one咖啡厅",
        "shopBanner": "http://ci.xiaohongshu.com/de9bf8cf-33d1-4b61-afee-3d08ca227551",
        "shopClass": "甜品饮品",
        "shopCity": "北京",
        "shopAutographCount": 933
      },
      {
        "shopNo": 1018,
        "shopName": "绿季法式甜品",
        "shopBanner": "http://ci.xiaohongshu.com/74890cf4-84dc-436f-a5b2-7cabe921c1bb",
        "shopClass": "甜品饮品",
        "shopCity": "北京",
        "shopAutographCount": 847
      },
      {
        "shopNo": 467,
        "shopName": "The Rug(三里屯店)",
        "shopBanner": "http://ci.xiaohongshu.com/3918ce04-8a0f-44a8-aa49-e5d6790fcb55",
        "shopClass": "西餐",
        "shopCity": "北京",
        "shopAutographCount": 738
      },
      {
        "shopNo": 939,
        "shopName": "伊豆野菜村(顺义店)",
        "shopBanner": "http://ci.xiaohongshu.com/771a7506-24f3-4ab5-9498-701ffe64d53e",
        "shopClass": "日本料理",
        "shopCity": "北京",
        "shopAutographCount": 1138
      },
      {
        "shopNo": 771,
        "shopName": "方糖",
        "shopBanner": "http://ci.xiaohongshu.com/f712f839-6bb8-4a5e-979a-edf659f5cff4",
        "shopClass": "甜品饮品",
        "shopCity": "北京",
        "shopAutographCount": 1274
      },
      {
        "shopNo": 484,
        "shopName": "俏凤凰",
        "shopBanner": "http://ci.xiaohongshu.com/ca2051b3-d221-5984-adb9-94133ce5b8ed",
        "shopClass": "云贵菜",
        "shopCity": "北京",
        "shopAutographCount": 877
      },
      {
        "shopNo": 483,
        "shopName": "火烧云傣家菜馆(京广桥店)",
        "shopBanner": "http://ci.xiaohongshu.com/3f572402-9ad0-4c7d-9035-1abf26f87a58",
        "shopClass": "云贵菜",
        "shopCity": "北京",
        "shopAutographCount": 1284
      },
      {
        "shopNo": 683,
        "shopName": "栗记仙豆糕",
        "shopBanner": "http://ci.xiaohongshu.com/ec2cd648-b6b7-445d-a466-cea187e20805",
        "shopClass": "甜品饮品",
        "shopCity": "北京",
        "shopAutographCount": 1201
      }
    ]
  },
  back: function () {
    wx.navigateBack({
      //
    })
  },

  toggleTable: function() {
    this.setData({
      select: !this.data.select,
      select1: !this.data.select1
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})