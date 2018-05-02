const app = getApp()
var rsa = require('../utils/rsa')
Page({

  /**
   * 页面的初始数据
   */
  data: {
   
  },
  /**
   * 生命周期函数--监听页面加载
   */
  nice:function(){
      var data = JSON.stringify({
          action : 1,   //1是喜欢2是不喜欢
          user_id : 1
      })
      var encStr = rsa.sign(data)
      wx.request({
          url:`http://dev.weixin.api.com:9090/api/articles/203`,
          method:'PUT',
          data:{data:encStr},
          success:function(res){
            console.log(res)
          }
      })
  },
    difference:function(){
        var data = JSON.stringify({
            action : 2,   //1是喜欢2是不喜欢
            user_id : 1
        })
        var encStr = rsa.sign(data)
        wx.request({
            url:`http://dev.weixin.api.com:9090/api/articles/203`,
            method:'PUT',
            data:{data:encStr},
            success:function(res){
                console.log(res)
            }
        })
    },
  onLoad: function (options) {
    
  },
 
})