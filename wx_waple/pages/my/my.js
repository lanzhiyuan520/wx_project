//index.js
//获取应用实例
const app = getApp()
var URL = app.globalData.URL
var request = require('../common/request')
var toast = require('../common/toast')
Page({
  data: {
    hasLogin: app.globalData.hasLogin,
    hasWarn: false,
    personal:[],
    headPic:"",
    phone:'',
    code_test:'验证码',
    focus: false,
    again:false,
    phoneNum:''
  },

  onLoad: function () {
    var value= wx.getStorageSync('login');
    var useInfo = JSON.parse(wx.getStorageSync('userInfo'));
    if (!value.login){
      wx.setNavigationBarTitle({
        title: '绑定手机号'
      })
    }else{
      wx.setNavigationBarTitle({
        title: '个人中心'
      })
      this.setData({
        hasLogin: true,
        headPic: useInfo.avatarUrl,
        phoneNum: value.phone
      })
    }
    var userid = wx.getStorageSync('user_id');
    var url = `${URL}/users/` + userid +`?action_type=list&action=index`
    request.request(url, 'GET', {})
      .then((res) => {
        console.log('个人', res)
        this.setData({
          personal:res.data.data
        })
      })
      .catch((error) => {
        console.log(error)
      })
  },
  voteTitle: function (e) {
    this.data.phone = e.detail.value;
    console.log(this.data.phone)
  }, 
  codeBtn: function () {
    var that = this;
    this.testPhone(this.data.phone)
    console.log(this.data.hasWarn)
    if (!this.data.hasWarn){
      var url = `${URL}/qrcode`
      var params_data = {
        type: 1,
        phone: this.data.phone,
        code_length: 4
      }
      wx.request({
        url: url,
        method: 'POST',
        data: params_data,
        success: function (res) {
          console.log('res',res)
          if(res.data.code===200){
            var i = 61;
            var timer = setInterval(function () {
              if (i > 0) {
                i--;
                that.setData({
                  again: false,
                  code_test: i + '(s)',
                  focus: true
                })
              } else {
                that.setData({
                  again: true,
                  focus: false
                })
                clearInterval(timer);
              }
            }, 1000)
          }else{
            toast.toast('验证码发送失败，请尝试换手机号', 'none')
          }
        }
      })
    }
    
  },
  // 验证手机号
  testPhone: function (phone){
    var myreg = new RegExp("^1([358][0-9]|4[579]|66|7[0135678]|9[89])[0-9]{8}$");
    //  验证手机号
    if (!myreg.test(phone)) {
      this.setData({
        hasWarn: true
      })
      return;
    } else {
      this.setData({
        hasWarn: false
      })
    }
  },
  // 拨打电话
  callPhone: function () {
    wx.makePhoneCall({
      phoneNumber: '400-6625-800'
    })
  },
  // 登录按钮
  searchBox: function (e) {
    var phone = e.detail.value.phone;
    var code = e.detail.value.code;
    var useInfo = JSON.parse(wx.getStorageSync('userInfo'));
    this.testPhone(phone)
    var that=this;
    var url = `${URL}/login`
    var params_data = {
      phone: phone,
      verify: code,
      nanny_type: 0
    }
    wx.request({
      url: url,
      method: 'POST',
      data: params_data,
      success: function (res) {
        if (res.data.code===1){
          app.globalData.hasLogin = true;
          wx.setNavigationBarTitle({
            title: '个人中心'
          })
          that.setData({
            hasLogin: true,
            headPic: useInfo.avatarUrl,
            phoneNum: phone
          })
          var login={
            login:true,
            phone:phone
          }
          console.log('login',login)
          wx.setStorageSync('login', login)
        }else{
          toast.toast(res.msg, 'none')
        }
      }
    })
  },
  // 退出登录
  exitLogin:function(){
    this.setData({
      hasLogin: false
    })
    var login = {
      login: false,
      phone: ''
    }
    wx.setStorageSync('login', login)
    app.globalData.hasLogin = false;
    wx.setNavigationBarTitle({
      title: '绑定手机号'
    })
  }
})
