const app = getApp()
var URL = app.globalData.URL
var request = require('../common/request')
Page({
  data: {
    hasMargin: app.globalData.hasMargin,
    serverState:"",
    top:{},
    center:{},
    foot:{}
  },

  onLoad: function (options) {
    console.log('id', options.id)
    var userid = wx.getStorageSync('user_id');
    var url = `${URL}/users/${userid}?action_type=detail&action=myserverdetail&object_id=` + options.id;
    request.request(url, 'GET', {})
      .then((res) => {
        console.log('服务详情', res)
        if(res.data.code===1){
          var center = res.data.data.center;
          center.birday = center.birday.substr(0, 10)
          this.setData({
            top: res.data.data.top,
            center: center,
            foot: res.data.data.foot
          })
        }
         
      })
      .catch((error) => {
        console.log(error)
      })
  },
  // 拨打电话
  callPhone: function () {
    wx.makePhoneCall({
      phoneNumber: this.data.foot.manager.phone
    })
  },

})