var toast = require('../common/toast')
var request = require('../common/request')
var rsa = require('../common/rsa')
var userinfo = wx.getStorageSync('userInfo')
const app = getApp()
var URL = app.globalData.URL
Page({
    data: {
        hidden : true
    },
    userInfoHandler:function(e){
        var that  = this
        console.log(e)
        if (e.detail.errMsg =="getUserInfo:ok"){
            var openId = wx.getStorageSync('openId')
            wx.setStorageSync('userInfo', e.detail.rawData)
            wx.setStorageSync('city',184)
            var data = {
                appid : app.globalData.appid,
                user_id : openId.openid,
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
                            url: '/pages/index/index'
                        })
                    }
                }
            })
        }else {
            toast.toast('您点击拒绝不能进入小程序','none')
        }
    },
    onLoad: function () {
        var that = this
        wx.getSetting({
            success(res){
                if (res.authSetting['scope.userInfo']){
                    wx.showLoading({
                        title : '加载中',
                        mask : true
                    })
                    that.setData({
                        hidden : true
                    })
                    wx.switchTab({
                        url: '/pages/index/index'
                    })
                }else{
                    console.log('没获取')
                    that.setData({
                        hidden : false
                    })
                }
            }
        })

    }
})