//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    hasLogin: app.globalData.hasLogin,
    hasWarn: false
  },

  onLoad: function () {
    if (!this.data.hasLogin){
      console.log(5)
      wx.setNavigationBarTitle({
        title: '绑定手机号'
      })
    }else{
      wx.setNavigationBarTitle({
        title: '个人中心'
      })
    }
  },
  // 拨打电话
  callPhone: function () {
    wx.makePhoneCall({
      phoneNumber: '400-6625-800'
    })
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
    app.globalData.hasLogin = true;
    wx.setNavigationBarTitle({
      title: '个人中心'
    })
    this.setData({
      hasLogin:true
    })
    //  登录成功后跳转到个人中心
    console.log(myreg.test(phone))
  },
  // 退出登录
  exitLogin:function(){
    this.setData({
      hasLogin: false
    })
    app.globalData.hasLogin = false;
    wx.setNavigationBarTitle({
      title: '绑定手机号'
    })
  }
})
