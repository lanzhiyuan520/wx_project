const app = getApp()

Page({
  data: {

  },

  onLoad: function () {

  },
  goBack:function(){
    wx.switchTab({
      url: '../waiter/waiter',
    })
  }
})