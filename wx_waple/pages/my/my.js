//index.js
//获取应用实例
const app = getApp()
var URL = app.globalData.URL
var request = require('../common/request')
var toast = require('../common/toast')
var rsa = require('../common/rsa')
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
      this.getInfo();
    }
    
  },
  getInfo:function(){
    var userid = wx.getStorageSync('user_id');
    var url = `${URL}/users/${userid}?action_type=list&action=index`
    request.request(url, 'GET', {})
      .then((res) => {
        console.log(res)
        if (res.data.code===1){
          this.setData({
            personal: res.data.data
          })
        }
      })
      .catch((error) => {
        console.log(error)
      })
  },
  voteTitle: function (e) {
    this.data.phone = e.detail.value;
  }, 
  codeBtn: function () {
    var that = this;
    this.testPhone(this.data.phone)
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
    var city=wx.getStorageSync('city')
    var userid = wx.getStorageSync('user_id');
    var url = `${URL}/login`
    var params_data = {
      phone: phone,
      verify: code,
      nanny_type: 0,
      city: city,
      user_id: userid
    }
    if (code !== "" && phone !== ""){
      wx.request({
        url: url,
        method: 'POST',
        data: params_data,
        success: function (res) {
          if (res.data.code === 1) {
            app.globalData.hasLogin = true;
            wx.setNavigationBarTitle({
              title: '个人中心'
            })
            that.setData({
              hasLogin: true,
              headPic: useInfo.avatarUrl,
              phoneNum: phone
            })
            var login = {
              login: true,
              phone: phone
            }
            that.getInfo();
            wx.setStorageSync('login', login)
          } else {
            toast.toast(res.data.msg, 'none')
          }
        }
      })
    }
   
  },
  // 退出登录
  exitLogin:function(){
      var that = this
      wx.showModal({
          title : '提示',
          content : '您确定要退出登录吗?',
          cancelText : '取消',
          confirmText : '确定',
          success : function(res){
              if (res.confirm){
                  that.setData({
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
              }else if (res.cancel){
                  console.log('用户点击了取消')
              }

          }
      })

  },
    //手机号登录
    getPhoneNumber:function(res){
       if (res.detail.errMsg === "getPhoneNumber:ok"){
           wx.showLoading({
               title : '登录中',
               mask : true
           })
          var that = this
          var appid = app.globalData.appid
          var openId = wx.getStorageSync('openId')
          var userid = wx.getStorageSync('user_id')
          var city = wx.getStorageSync('city')
          var useInfo = JSON.parse(wx.getStorageSync('userInfo'));
          var data = JSON.stringify({
               appid,
               sessionKey : openId.session_key,
               encryptedData:res.detail.encryptedData,
               iv : res.detail.iv
           })
           console.log(data)
           var encStr = rsa.sign(data)
           wx.request({
               url : `http://test.weixin.api.ayi800.com/api/wap/login?login_type=Authlogin`,
               method : 'POST',
               data : {
                   data : encStr,
                   user_id : userid,
                   nanny_type : 0,
                   city : city,
               },
               success:function(res){
                   console.log('登录',res)
                   wx.hideLoading()
                   if (res.data.code === 1){
                       app.globalData.hasLogin = true;
                       wx.setNavigationBarTitle({
                           title: '个人中心'
                       })
                       that.setData({
                           hasLogin: true,
                           headPic: useInfo.avatarUrl,
                           phoneNum: res.data.msg.phone
                       })
                       var login = {
                           login: true,
                           phone: res.data.msg.phone
                       }
                       that.getInfo();
                       wx.setStorageSync('login', login)
                   }else {
                       toast.toast('登录失败，请稍后重试', 'none')
                   }
               }
           })
       }else{
          toast.toast('取消授权无法登录，请重新授权','none')
       }
    }
})
