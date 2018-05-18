const app = getApp()

Page({
  data: {
    hasMargin: app.globalData.hasMargin,
    serverState:3
  },

  onLoad: function () {

  },
  // 拨打电话
  callPhone: function () {
    wx.makePhoneCall({
      phoneNumber: '13457888642'
    })
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