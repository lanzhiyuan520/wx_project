
const date = new Date()
const years = []
const months = []
const days = []
var yearVal=1;
var monthVal = 1;
var dayVal = 1;

for (let i = 2016; i <= 2115; i++) {
  years.push(i)
  if (i == date.getFullYear()){
      yearVal = i - 2016
  }
}

for (let i = 1; i <= 12; i++) {
  months.push(i)
  if (i == date.getMonth()+1) {
    monthVal = i-1
  }
}

for (let i = 1; i <= 31; i++) {
  days.push(i)
  if (i == date.getDate()) {
    dayVal = i-1
  }
}
const app = getApp()
var rsa = require('../utils/rsa')
var nowDate = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" +date.getDate();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    pregnancy:true,
    state:1,
    years: years,
    months: months,
    days: days,
    userInfo:{},
    value: [yearVal, monthVal, dayVal],
    date: nowDate
  },
  stateChange:function(){
    var that=this;
    this.setData({
      pregnancy: !that.data.pregnancy
    })
    if (this.data.pregnancy){
      this.setData({
        state:1
      })
    }else{
      this.setData({
        state: 2
      })
    }
  },
  bindChange: function (e) {
    const val = e.detail.value
    var year = this.data.years[val[0]];
    var month = this.data.months[val[1]];
    var day = this.data.days[val[2]];
    // 设置（2）或（4、6、9、11）月天数多余（28、29）或（30）天时选择器不能选中该天数
    if (month==2) {
      var selectDay= (year % 400 == 0 || (year % 100 != 0 && year % 4 == 0)) ? 29 : 28;
      if (day > selectDay){
        this.setData({
          value: [year-2016, 1, selectDay-1]
        })
        day = selectDay
      }
    }else if((month == 4) || (month == 6) || (month == 9) || (month == 11)){
      var selectDay = 30;
      if (day > selectDay){
        this.setData({
          value: [year - 2016, month - 1, selectDay - 1]
        })
        day = selectDay
      }
    }
    this.setData({
      date: year + "-" + month + "-" + day
    })
  },
  userInfoHandler: function (value){
    if (value.detail.errMsg =="getUserInfo:ok"){
      wx.setStorageSync('userInfo', value.detail.rawData)
      this.submitBtn()
    }else{
      wx.showToast({
        title: '授权不成功,无法进入页面',
        icon: 'none',
        duration: 2000
      }) 
    }
  },
  submitBtn:function(){
    var OpenId = wx.getStorageSync('openId');
    if (OpenId){
      var value = wx.getStorageSync('userInfo');
      value = JSON.parse(value)
      var img = value.avatarUrl;
      var name = value.nickName;
      var data = JSON.stringify({
        status: this.data.state,
        date: this.data.date,
        nickname: name,
        head_img: img,
        b_user_id: OpenId.openid
      })
      console.log(data)
      var encStr = rsa.sign(data)
      wx.request({
        url: 'http://test.weixin.api.ayi800.com/api/users',
        method: 'POST',
        data: { data: encStr },
        success: function (data) {
          console.log(55, data)
          try {
            wx.setStorageSync('stateInfo', data.data.data.addedValue)
          } catch (e) {
            console.log(e)
          }
        },
        fail: function (e) {
          console.log(e)
        }
      })
      wx.redirectTo({
        url: '../userinfo/userinfo',
      })
    }
  }
})

