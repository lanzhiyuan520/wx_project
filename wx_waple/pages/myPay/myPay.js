const app = getApp()

Page({
  data: {
    hasMargin: app.globalData.hasMargin
  },

  onLoad: function () {
  
  },
  //底部跳转 
  goIndex: function () {
    wx.switchTab({
      url: '../index/index',
    })
  },
  goWaiter: function () {
    wx.switchTab({
      url: '../waiter/waiter',
    })
  }
})