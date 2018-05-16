const app = getApp()

Page({
  data: {
    hasMask:false,
    indicatorDots: false
  },

  onLoad: function () {

  },
  myCatchTouch: function () {
    console.log('stop user scroll it!');
    return;
  },
  picShow:function(){
    this.setData({
      hasMask: true
    })
  },
  picHide:function(){
    this.setData({
      hasMask: false
    })
  }
})