//index.js
//获取应用实例
const app = getApp()
var toast = require('../common/toast')
var URL = app.globalData.URL
var request = require('../common/request')
Page({
  data: {
    city_id : 184,
    page : 1,
    waiter_list:[],
    waiter_tags : [],
    refresh : false
  },
  waiter_list:function (page) {
     var url = `${URL}/nannys?city=${this.data.city_id}&page=${page}`
      console.log(page)
     request.request(url,'GET',{})
         .then(res=>{
             console.log('服务员列表',res)
            if (res.data.code === 1){
                var waiter_list = res.data.data
                waiter_list.map((item,index)=>{
                    var nanny_tag = item.nanny_tag.slice(0,3)
                    item.nanny_tag = nanny_tag
                })
                 if (page !== 1){
                     var waiter = this.data.waiter_list
                     waiter_list.map((item,index)=>{
                         waiter.push(item)
                     })
                     this.setData({
                         waiter_list : waiter
                     })
                 }else{
                     this.setData({
                         waiter_list : waiter_list
                     })
                     if (this.data.refresh){
                         toast.toast('刷新成功','none')
                         wx.stopPullDownRefresh()
                     }
                 }
                wx.hideLoading()
            }
         })
         .catch(e=>{
             this.error_msg(e)
         })
  },
    //错误信息
    error_msg:function (e) {
        if (e.errMsg==='request:fail timeout'){
            toast.toast('请求超时,请稍后重试','none')
        }
        wx.stopPullDownRefresh()
        wx.hideLoading()
        console.log('错误信息',e)
    },
  onLoad: function () {
      wx.showLoading({
          title : '加载中',
          mask : true
      })
    //服务员列表
    this.waiter_list(this.data.page)
  },
  onPullDownRefresh: function () {
      this.setData({
          page : 1,
          refresh : true
      })
      this.waiter_list(this.data.page)
  },
    //上拉加载
    onReachBottom:function(){
        wx.showLoading({
            title : '加载中',
            mask : true
        })
        this.setData({
            page : this.data.page + 1
        })
        this.waiter_list(this.data.page)
    },
})
