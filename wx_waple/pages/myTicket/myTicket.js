const app = getApp();
Page({
  data: {
    hasMargin: app.globalData.hasMargin,
    hasData:true,
    maskHide:false,
    array:[200,500,300]
  },
  onLoad: function (options) {
    
  },
  myCatchTouch: function () {
    console.log('stop user scroll it!');
    return;
  },
  // 遮罩的显示和隐藏
  maskShow: function () {
    this.setData({
      maskHide: true
    })
  },
  maskHide:function(){
    this.setData({
      maskHide: false
    })
  },
  // 拨打电话
  callPhone:function(){
    wx.makePhoneCall({
      phoneNumber: '15867887677'
    })
  },
  //底部跳转 
  goIndex: function () {
    wx.switchTab({
      url: '../index/index',
    })
  },
  goWaiter: function () {
    wx.switchTab({
      url: '../waiter/waiter',
    })
  }
})