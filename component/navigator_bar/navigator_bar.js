// component/navigator_bar/navigator_bar.js
const app = getApp();
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    visible:Boolean,
    title: {
      type: String,
      value: '',
      observer: function (res) {
        this.setData({
          title: res
        })
        console.log("debug" + res)
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    statusBar_height: app.globalData.statubar_height,
    title: '',
  },

  /**
   * 组件的方法列表
   */
  methods: {
    back: function (e) {
      wx.navigateBack({
        //
      })
    }
  }
})
