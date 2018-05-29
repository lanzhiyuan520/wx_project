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
        if (e.detail.errMsg =="getUserInfo:ok"){
            wx.setStorageSync('userInfo', e.detail.rawData)
            wx.setStorageSync('city',184)
            var data = {
                appid : app.globalData.appid,
                user_id : app.globalData.openId,
                nickname : e.detail.userInfo.nickName,
                picture :  e.detail.userInfo.avatarUrl
            }
            var url = `${URL}/users`
            wx.request({
                url : url,
                method:'POST',
                data:data,
                success:function(res){
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
    onLoad: function () {
        if (userinfo && oppenId){
            wx.switchTab({
                url: '../index/index'
            })
        }
    }
})