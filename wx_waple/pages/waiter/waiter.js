//index.js
//获取应用实例
const app = getApp()
var toast = require('../common/toast')
var URL = app.globalData.URL
var request = require('../common/request')
Page({
  data: {
    city_id : 184,
    page : 1
  },
  waiter_list:function () {
     var url = `${URL}/nannys?city=${this.data.city_id}&page=${this.data.page}`
     request.request(url,'GET',{})
         .then(res=>{
           console.log(res)
         })
  },
  onLoad: function () {
    //服务员列表
    this.waiter_list()
  },
  onPullDownRefresh: function () {
    console.log('下拉刷新')
    setTimeout(() => {
      toast.toast('刷新成功', 'none')
      wx.stopPullDownRefresh()

    }, 1500)
  }
})
