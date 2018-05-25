const app = getApp()
var URL = `http://dev.weixin.api.com:9090/api/wap`
var request = require('../common/request')
Page({
  data: {
    hasMargin: app.globalData.hasMargin
  },

  onLoad: function () {
    var url = `${URL}/users/45126?action_type=list&action=myorderlist`
    request.request(url, 'GET', {})
      .then((res) => {
        console.log('支付', res)
      })
      .catch((error) => {
        console.log(error)
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