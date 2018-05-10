const app = getApp()
var rsa = require('../utils/rsa')
var WxParse = require('../wxParse/wxParse.js');
var request = require('../utils/request')
var toast = require('../utils/toast')
const URL = app.globalData.url;
Page({

  /**
   * 页面的初始数据
   */
  data: {
      id : 0,
      article_detailed:{},
      nice_active:true,
      difference_active:true,
      active:true,
      nice_img:'http://cdn.ayi800.com/image/png/weixin_niceshang@2x.png',
      difference_img:'http://cdn.ayi800.com/image/png/xiaochengxu-cha%E7%BA%BF%E6%8F%8F%E7%AE%AD%E5%A4%B4@2x.png',
      nice_num:0,
      difference_num:0
  },
  article:function(){
      wx.showLoading({title: '加载中', mask:true,})
      var that = this
      var url = `${URL}articles/${this.data.id}`
      request.request(url,'GET',{})
          .then((res)=>{
              if (res.data.data.result){
                  var article = res.data.data.addedValue.content;
                  that.setData({
                      article_detailed : res.data.data.addedValue,
                      nice_num:res.data.data.addedValue.better_num,
                      difference_num:res.data.data.addedValue.unbetter_num
                  })
                  WxParse.wxParse('article', 'html', article, that,0);
                  wx.hideLoading()
              }
          })
          .catch((e)=>{
              toast.toast('请求超时','none')
          })
  },
  nice:function(){
      var that = this
      var url = `${URL}articles/${this.data.id}`
      var data = JSON.stringify({
          action : 1,   //1是喜欢2是不喜欢
          user_id : this.data.id
      })
      var encStr = rsa.sign(data)
        request.request(url,'PUT',encStr)
            .then((res)=>{
                if (res.data.message === 'success' && res.data.code === 1){
                    that.setData({
                        nice_active : false,  //better_num  better_num unbetter_num
                        nice_img : 'http://cdn.ayi800.com/image/png/xiaochengxu-nice%E5%AE%9E%E5%BF%83%E7%AE%AD%E5%A4%B4@2x.png',
                        difference_active:true,
                        difference_img:'http://cdn.ayi800.com/image/png/xiaochengxu-cha%E7%BA%BF%E6%8F%8F%E7%AE%AD%E5%A4%B4@2x.png',
                        nice_num:res.data.data.addedValue.better_num,
                        difference_num:res.data.data.addedValue.unbetter_num
                    })
                    toast.toast('点赞成功','success')
                }else{
                    if (res.data.code === 2 && res.data.message==='不能重复点赞'){
                        toast.toast('不能重复点赞','none')
                        }
                    }
            })
            .catch((e)=>{
                toast.toast('请求超时','none')
            })
  },
    difference:function(){
        var that = this
        var data = JSON.stringify({
            action : 2,   //1是喜欢2是不喜欢
            user_id : this.data.id
        })
        var url = `${URL}articles/${this.data.id}`
        var encStr = rsa.sign(data)
        request.request(url,'PUT',encStr)
            .then((res)=>{
                if (res.data.message === 'success' && res.data.code === 1){
                    that.setData({
                        difference_active : false,
                        difference_img : 'http://cdn.ayi800.com/image/png/weixin_difference21@2x.png',
                        nice_active:true,
                        nice_img:'http://cdn.ayi800.com/image/png/weixin_niceshang@2x.png',
                        nice_num:res.data.data.addedValue.better_num,
                        difference_num:res.data.data.addedValue.unbetter_num
                    })
                    toast.toast('踩成功','success')
                }else{
                    if (res.data.code === 2 && res.data.message==='不能重复踩'){
                            toast.toast('不能重复踩','none')
                        }
                    }
            })
            .catch((e)=>{
                toast.toast('请求超时','none')
            })
    },
  onLoad: function (options) {
          this.setData({
              id : options.id
          })
          this.article()
  },
 
})