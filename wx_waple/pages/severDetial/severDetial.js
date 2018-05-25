const app = getApp()
var URL = app.globalData.URL
var request = require('../common/request')
Page({
  data: {
    hasMargin: app.globalData.hasMargin,
    serverState:1,
    top:{},
    center:{},
    foot:{}
  },

  onLoad: function (options) {
    console.log('id', options.id)
    var url = `${URL}/users/45126?action_type=detail&action=myserverdetail&object_id=` + options.id;
    request.request(url, 'GET', {})
      .then((res) => {
        console.log('服务详情', res)
        this.setData({
          top: res.data.data.top,
          center: res.data.data.center,
          foot: res.data.foot
        })
      })
      .catch((error) => {
        console.log(error)
      })
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