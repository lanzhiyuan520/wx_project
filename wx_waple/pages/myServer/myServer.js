const app = getApp()
var URL = app.globalData.URL
var request = require('../common/request')
Page({
  data: {
    hasMargin: app.globalData.hasMargin,
    hasData: false,
    serverData:[]
  },

  onLoad: function () {
    var url = `${URL}/users/45126?action_type=list&action=myserverlist`
    request.request(url, 'GET', {})
      .then((res) => {
        console.log('服务', res)
        var result = res.data.data;
        if (result.length!==0){
          for (var i = 0; i < result.length; i++) {
            result[i].created_at = result[i].created_at.substr(0, 10)
          }
          this.setData({
            hasData: true,
            serverData: result
          })
        }
        
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