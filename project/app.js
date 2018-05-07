//app.js
App({
  onLaunch: function () {
    var that = this
    var oppenId = wx.getStorageSync('openId')
    var userInfo = wx.getStorageSync('userInfo')
    console.log(userInfo)
    if (!oppenId || !userInfo){
        // // 登录
        wx.login({
            success: res => {
                // 发送 res.code 到后台换取 openId, sessionKey, unionId
                var data = {
                    appid:that.globalData.appId,
                    secret:that.globalData.AppSecret,
                    js_code:res.code
                }
                wx.request({
                    url:`https://weixin.youfumama.com/api/jscode2session`,
                    method:'POST',
                    data:data,
                    success:function (res) {
                         that.globalData.openId = res.data.openid
                         that.globalData.session_key = res.data.session_key
                         //将openid和session_key存储
                         wx.setStorageSync('openId',res.data)
                    }
                })
            }
        })
    }else{
        console.log('您已经获取到openid了')
        wx.redirectTo({
          url: './pages/userinfo/userinfo'
        })
    }

    this.deviceInfo = this.promise.getDeviceInfo();
  },
  promise: {
    getDeviceInfo: function () {//获取设备信息
      let promise = new Promise((resolve, reject) => {
        wx.getSystemInfo({
          success: function (res) {
            resolve(res)
          },
          fail: function () {
            reject()
          }
        })
      })
      return promise
    }
  },
  getGid: (function () {//全局唯一id
    let id = 0
    return function () {
      id++
      return id
    }
  })(),
  globalData: {
      userInfo: null,
      appId: 'wx8eb32572a3565b61',
      AppSecret: '5d61285d21821d4dae4813c1c87668a8',
      openId : null,
      session_key : null
  }
})


