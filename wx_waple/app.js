//app.js
App({
  onLaunch: function () {
    wx.login({
      success: res => {
          console.log(res)
      }
    })
  },
  globalData: {
    userInfo: null,
    hasLogin:false
  }
})