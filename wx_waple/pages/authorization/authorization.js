var toast = require('../common/toast')
var request = require('../common/request')
var rsa = require('../common/rsa')

var userinfo = wx.getStorageSync('userInfo')
var oppenId = wx.getStorageSync('openId')
const app = getApp()
var URL = app.globalData.URL
Page({
    data: {

    },
    userInfoHandler:function(e){
        var that  = this
        console.log(e)
        if (e.detail.errMsg =="getUserInfo:ok"){
            wx.setStorageSync('userInfo', e.detail.rawData)
            wx.setStorageSync('city',184)
            var data = {
                appid : app.globalData.appid,
                user_id : app.globalData.openId,
                nickname : e.detail.userInfo.nickName,
                picture :  e.detail.userInfo.avatarUrl
            }
            console.log(data)
            var url = `${URL}/users`
            wx.request({
                url : url,
                method:'POST',
                data:data,
                success:function(res){
                    console.log(res)    //221558
                    if (res.data.code === 1){
                        wx.setStorageSync('user_id', res.data.data.id)
                        wx.switchTab({
                            url: '../index/index'
                        })
                    }
                }
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
        request.request(url,'PUT',encStr)
            .then(res=>{
                console.log('put',res)
            })
            .catch(error=>{
                console.log(error)
            })
    },
    onLoad: function () {
        //this.put()
        if (userinfo && oppenId){
            wx.switchTab({
                url: '../index/index'
            })
        }else{

        }
    }
})