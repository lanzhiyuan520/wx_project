//app.js
var request = require('./pages/common/request')
var url = `http://dev.weixin.api.com:9090/api/wap`
App({
  onLaunch: function () {
    var userInfo = wx.getStorageSync('userInfo')
    var oppenId = wx.getStorageSync('openId')
    var res = wx.getSystemInfoSync();
    if (res.model.indexOf('iPhone X') !== -1) {
      this.globalData.hasMargin=true;
    }
    if (!oppenId || !userInfo){
        this.code()
    }else{
        console.log('获取到openid和用户信息了，跳转首页')
    }
  },
    code:function() {
        var that = this
        wx.login({
            success(res){
                var data= {
                    appid : 'wx8eb32572a3565b61',
                    secret : '5d61285d21821d4dae4813c1c87668a8',
                    js_code : res.code
                }
                wx.request({
                    url:`https://api.weixin.qq.com/sns/jscode2session?appid=wx8eb32572a3565b61&secret=5d61285d21821d4dae4813c1c87668a8&js_code=${res.code}&grant_type=authorization_code`,
                    success:function (res) {
                        that.globalData.openId = res.data.openid
                        that.globalData.session_key = res.data.session_key
                        //将openid和session_key存储
                        wx.setStorageSync('openId',res.data)
                        console.log('openid',res)
                    }
                })
            }
        })
    },
  globalData: {
    appid: 'wx8eb32572a3565b61',
    userInfo: null,
    hasLogin:false,
    hasMargin: false,
    openId : null,
    session_key : null
  }
})