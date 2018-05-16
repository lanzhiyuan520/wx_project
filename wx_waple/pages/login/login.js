//index.js
//获取应用实例
const app = getApp()
Page({
  data: {
    hasWarn: false,
    hasMargin:false
  },
  onLoad: function () {
    var res = wx.getSystemInfoSync();
    if (res.model.indexOf('iPhone X')!==-1){
      this.setData({
        hasMargin: true
      })
    }
    console.log(res.model)
  },
  // 登录按钮
  searchBox: function (e) {
    console.log(e)
    var phone = e.detail.value.phone;
    var code = e.detail.value.code;
    var myreg = new RegExp("^1([358][0-9]|4[579]|66|7[0135678]|9[89])[0-9]{8}$");
    //  验证手机号
    //  if (!myreg.test(phone)){
    //     this.setData({
    //       hasWarn: true
    //     })
    //     return;
    //  }else{
    //    this.setData({
    //      hasWarn: false
    //    })
    //  }
    app.globalData.hasLogin=true;
    //  登录成功后跳转到个人中心
    wx.switchTab({
      url: '../my/my',
    })
    console.log(myreg.test(phone))
  },
    goIndex: function () {
    console.log(1)
    wx.switchTab({
      url: '../index/index',
    })
  },
  goWaiter: function () {
    console.log(2)
    wx.switchTab({
      url: '../waiter/waiter',
    })
  }
})
