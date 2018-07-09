//app.js
var request = require('./pages/common/request')
App({
  onLaunch: function () {
      wx.showLoading({
          title : '加载中',
          mask : true
      })
    var that = this
    var userInfo = wx.getStorageSync('userInfo')
    var openId = wx.getStorageSync('openId')
    var res = wx.getSystemInfoSync();
    if (res.model.indexOf('iPhone X') !== -1) {
      this.globalData.hasMargin=true;
    }
      wx.getSetting({
          success(res){
              that._session()
              if (res.authSetting['scope.userInfo']){
                  wx.switchTab({
                      url: '/pages/index/index'
                  })
                  console.log('授权了跳转首页')
              }else{
                  wx.hideLoading()
                  console.log('没有授权')
              }
          }
      })
  },
    _session:function(){
        var that = this
        wx.checkSession({
            success(res){
                console.log('session正常')
            },
            fail(){
                console.log('session失效')
                that.code()
            }
        })
    },
    code:function() {
        var that = this
        wx.login({
            success(res){
                var data= {
                    appid : 'wxe97b308db9edb9b4',
                    secret : '5d82799cf47df88e36fbb7293844b063',
                    js_code : res.code
                }
                wx.request({
                  url:`https://wx.youfumama.com/api/wap/jscode2session`,
                    method:'POST',
                    data:data,
                    success:function (res) {
                        console.log(res)
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
    appid: 'wxe97b308db9edb9b4',
    userInfo: null,
    hasLogin:false,
    hasMargin: false,
    openId : null,
    session_key : null,
    URL: 'http://test.weixin.api.ayi800.com/api/wap'
  }
})
