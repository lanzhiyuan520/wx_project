var toast = require('../common/toast')
const app = getApp()

Page({
    data: {

    },
    userInfoHandler:function(e){
        console.log(e)
        if (e.detail.errMsg =="getUserInfo:ok"){
            wx.setStorageSync('userInfo', e.detail.rawData)
            wx.switchTab({
                url: '../index/index'
            })
        }else {
            toast.toast('您点击拒绝不能进入小程序','none')
        }
    },
    onLoad: function () {
        var userinfo = wx.getStorageSync('userInfo')
        if (userinfo){
            wx.switchTab({
                url: '../index/index'
            })
        }
    }
})