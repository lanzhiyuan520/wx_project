//app.js
App({
  onLaunch: function () {
    var that = this
    var oppenId = wx.getStorageSync('openId')
    var userInfo = wx.getStorageSync('userInfo')
    if (!oppenId || !userInfo){
        // 登录
        wx.login({
            success: res => {
                // 发送 res.code 到后台换取 openId, sessionKey, unionId
                wx.request({
                    url:`https://api.weixin.qq.com/sns/jscode2session?appid=${this.globalData.appId}&secret=${this.globalData.AppSecret}&js_code=${res.code}&grant_type=authorization_code`,
                    success:function (res) {
                        that.globalData.openId = res.data.openid
                        that.globalData.session_key = res.data.session_key
                        //将openid和session_key存储
                        wx.setStorageSync('openId',JSON.stringify(res.data))
                        that.user()
                    }
                })
            }
        })
    }else{
        console.log('您已经获取到openid了')
    }

    this.deviceInfo = this.promise.getDeviceInfo();
  },
    user:function(){
      var that = this
        // 获取用户信息
        wx.getUserInfo({
            lang: 'zh_CN',
            success: res => {
                that.globalData.userInfo = res.userInfo
                wx.setStorageSync('userInfo',JSON.stringify(res.userInfo))
                console.log('获取用户信息成功')
            },
            //如果授权失败则提示用户再次授权
            fail:function(){
                wx.showModal({
                    title: '提示',
                    content: '您拒绝了授权,将获取不到个人信息，点击确定重新获取',
                    success: function (res) {
                        if (res.confirm) {
                            //如果用户点击确定则引导打开授权
                            wx.openSetting({
                                success : function (res) {
                                    if (!res.authSetting["scope.userInfo"]){
                                        //如果用户进入用户授权页面却没有授权，则再次弹出提示框
                                        that.user()
                                    }else{
                                        //如果用户授权了则获取用户信息
                                        that.user()
                                    }

                                }
                            })
                        } else if (res.cancel) {
                            //如果用户点击取消，则再次弹出提示框直到用户确定授权为止
                            that.user()
                            console.log('用户点击取消')
                        }
                    }

                })
            }
        })
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


