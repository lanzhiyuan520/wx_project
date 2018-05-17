//app.js
App({
  onLaunch: function () {
    var res = wx.getSystemInfoSync();
    if (res.model.indexOf('iPhone X') !== -1) {
      this.globalData.hasMargin=true;
    }
    wx.login({
      success: res => {
          console.log(res)
      }
    })
  },
  globalData: {
    userInfo: null,
    hasLogin:false,
    hasMargin: false
  }
})