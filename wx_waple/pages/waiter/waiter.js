//index.js
//获取应用实例
const app = getApp()
var toast = require('../common/toast')
var URL = app.globalData.URL
var Date = require('../common/Date')
var request = require('../common/request')
Page({
    onShareAppMessage: function (e) {
        console.log(e)
        return {
            title: '月嫂资料列表',
            path: '/pages/waiter/waiter'
        }
    },
  data: {
    city_id : '',
    page : 1,
    waiter_list:[],
    waiter_tags : [],
    refresh : false,
    more_text : false
  },
  waiter_list:function (page) {
     var url = `${URL}/nannys?city=${this.data.city_id}&page=${page}`
     request.request(url,'GET',{})
         .then(res=>{
            if (res.data.code === 1){
                var waiter_list = res.data.data
                waiter_list.map((item,index)=>{
                    var nanny_tag = item.nanny_tag.slice(0,3)
                    item.nanny_tag = nanny_tag
                })
                 if (page !== 1){
                     var waiter = this.data.waiter_list
                     console.log(res)
                     if (res.data.data.length == 0){
                         console.log('没有了')
                         this.setData({
                             more_text : true
                         })
                     }
                     waiter_list.map((item,index)=>{
                         waiter.push(item)
                     })
                     this.setData({
                         waiter_list : waiter,

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
    //判断城市是否更改，更改重新请求数据
    onShow:function(){
        var city = wx.getStorageSync('city')
        if (city !== this.data.city_id){
            this.setData({
                page : 1,
                city_id : city,
                more_text : false
            })
            this.waiter_list(this.data.page)
        }
    },
  onLoad: function () {
      var city = wx.getStorageSync('city')
      this.setData({
          city_id : city
      })
      wx.showLoading({
          title : '加载中',
          mask : true
      })
    //服务员列表
    this.waiter_list(this.data.page)
      this.action()
  },
  onPullDownRefresh: function () {
      this.setData({
          page : 1,
          refresh : true,
          more_text : false
      })
      this.waiter_list(this.data.page)
  },
    action:function(){
        var id = wx.getStorageSync('user_id')
        var url = `${URL}/actions`
        var data = {
            user_id : id,
            path : 'waiter',
            page_type : 3,
            request_time : Date.time()
        }
        request.request(url,'POST',data)
            .then(res=>{
            })
    },
    //上拉加载
    onReachBottom:function(){
        if (this.data.more_text){
            toast.toast('没有更多了','none')
            return false
        }
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
