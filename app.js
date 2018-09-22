//app.js
const util = require('/utils/util.js')


App({
  onLaunch: function() {
    // 展示本地存储能力
    /*var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)*/
    var userInfo = wx.getStorageSync('userInfo');
    var that = this;

    if (userInfo) {
      console.log(userInfo);
      this.globalData.userInfo = userInfo
    } else {
      this.login();
    }

  },
  login: function() {
    var that = this;
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        // console.log(res.code);

        util.request('/login', {wxCode: res.code}, function(res1) {
          console.log(res1);

          // 获取用户信息
          wx.getSetting({
            success: res => {
              if (res.authSetting['scope.userInfo']) {
                // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
                wx.getUserInfo({
                  success: res => {
                    // 可以将 res 发送给后台解码出 unionId
                    that.globalData.userInfo = res.userInfo;
                    that.globalData.userInfo['userNo'] = res1.userNo;
                    that.globalData.userInfo['openId'] = res1.openId;
                    that.globalData.userInfo['splashVideo'] = res1.homePageVideoUrl;

                    wx.setStorage({
                      key: 'userInfo',
                      data: that.globalData.userInfo,
                    })
                    console.log(that.globalData.userInfo.userNo)

                    // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
                    // 所以此处加入 callback 以防止这种情况
                    if (that.userInfoReadyCallback) {
                      that.globalData.userInfo = res.userInfo
                      that.globalData.userInfo['userNo'] = res1.userNo
                      that.globalData.userInfo['openId'] = res1.openId
                      that.globalData.userInfo['splashVideo'] = res1.homePageVideoUrl
                      that.userInfoReadyCallback(res)
                    }
                  }
                })
              }
            }
          })
        })

      }
    })
  },
  globalData: {
    userInfo: null
  }
})