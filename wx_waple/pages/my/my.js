//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    hasLogin:true
  },

  onLoad: function () {
    if (!app.globalData.hasLogin){
      wx.redirectTo({
        url: '../login/login',
      })
    }
  },

})
