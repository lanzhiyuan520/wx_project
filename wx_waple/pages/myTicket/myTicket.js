const app = getApp();
var URL = app.globalData.URL
var request = require('../common/request')
Page({
  data: {
    hasMargin: app.globalData.hasMargin,
    hasData:false,
    maskHide:false,
    tickes:[],
    pastTickes:[],
    phoneNum:'',
    manager:''
  },
  onLoad: function (options) {
    var userid = wx.getStorageSync('user_id');
    var url = `${URL}/users/${userid}?action_type=list&action=mycounplist`
    request.request(url, 'GET',{})
      .then((res) => {
        if(res.data.code===1){
          var result = res.data.data;
          var arr = [];
          var oldArr = [];
          for (var i = 0; i < result.length; i++) {
            if (result[i].is_expired == 1) {
              oldArr.push(result[i])
            } else {
              arr.push(result[i])
            }
          }
          this.setData({
            hasData: true,
            tickes: arr,
            pastTickes: oldArr,
            phoneNum: res.data.data[0].manager_phone,
            manager: res.data.data[0].manager_name
          })
        }
        
      })
      .catch((error) => {
        console.log(error)
      })
  },
  myCatchTouch: function () {
    console.log('stop user scroll it!');
    return;
  },
  // 遮罩的显示和隐藏
  maskShow: function () {
    this.setData({
      maskHide: true
    })
  },
  maskHide:function(){
    this.setData({
      maskHide: false
    })
  },
  // 拨打电话
  callPhone:function(){
    wx.makePhoneCall({
      phoneNumber: this.data.phoneNum
    })
  }
})