const app = getApp()

Page({
  data:{
    source:''
  },
  onLoad: function (options){
    this.setData({
      source: options.source
    })
  }
})