var toast = require('../common/toast')
var request = require('../common/request')
var rsa = require('../common/rsa')
var URL = `http://dev.weixin.api.com:9090/api/wap`
const app = getApp()

Page({
    data: {

    },
    userInfoHandler:function(e){
        var that  = this
        console.log(e)
        if (e.detail.errMsg =="getUserInfo:ok"){
            wx.setStorageSync('userInfo', e.detail.rawData)
            var data = {
                appid : app.globalData.appid,
                user_id : app.globalData.openId,
                nickname : e.detail.userInfo.nickName
            }
            var url = `${URL}/users`
            wx.request({
                url : url,
                method:'POST',
                data:data,
                success:function(res){
                    console.log(res)    //221558

                    //that.put()
                }
            })

            wx.switchTab({
                url: '../index/index'
            })
        }else {
            toast.toast('您点击拒绝不能进入小程序','none')
        }
    },
    //更新接口
    put : function(){
        var url = `${URL}/users`
        var data = JSON.stringify({
            id: 221558,
            nickname : '2222'
        })
        var encStr = rsa.sign(data)
        wx.request({
            url,
            method:'PUT',
            data : {encStr},
            success:function(res){
                console.log('put',res)
            }
        })
    },
    onLoad: function () {
        var userinfo = wx.getStorageSync('userInfo')
        if (userinfo){

        }
    }
})