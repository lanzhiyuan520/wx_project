const app = getApp()
var URL = app.globalData.URL
var request = require('../common/request')
Page({
  data: {
    hasMargin: app.globalData.hasMargin,
    payData:[],
    hasData:false
  },

  onLoad: function () {
    var userid = wx.getStorageSync('user_id');
    var url = `${URL}/users/${userid}?action_type=list&action=myorderlist`
    request.request(url, 'GET', {})
      .then((res) => {
        console.log('支付', res)
        if (res.data.code===1){
          if (res.data.data !== []) {
            this.setData({
              hasData: true,
              payData: res.data.data
            })
          }
        }
        
      })
      .catch((error) => {
        console.log(error)
      })
  }
})