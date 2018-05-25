//index.js
//获取应用实例
const app = getApp()
var toast = require('../common/toast')
var URL = `http://dev.weixin.api.com:9090/api/wap`
var request = require('../common/request')
Page({
  data: {

  },

  onLoad: function () {

  },
  onPullDownRefresh: function () {
    console.log('下拉刷新')
    setTimeout(() => {
      toast.toast('刷新成功', 'none')
      wx.stopPullDownRefresh()

    }, 1500)
  }
})
