// pages/my/my.js
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    isShowBox:false
  },

  //是否显示盒子
  isShowBox:function(){
    wx.request({
      url: 'https://www.qiyuchuhai.com/xcx/box/isShowBox',
      method:"post",
      data:{
        "productCode": "600009"
      },
      success:res=>{
        if(res.data.data == '0'){
          this.setData({
            isShowBox:false
          })
        } else if(res.data.data == '1'){
          this.setData({
            isShowBox: true
          })
        }
      }
    })
  },
  //盒子列表
  getBoxList: function () {
    wx.request({
      url: 'https://www.qiyuchuhai.com/xcx/box/queryBoxList',
      method: "post",
      data: {
        "productCode": "600009"
      },
      success: res => {
        
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.isShowBox();
    this.setData({
      avatarUrl: app.globalData.userInfo.avatarUrl,
      nickName: app.globalData.userInfo.nickName
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

  }
})