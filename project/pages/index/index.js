
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
var request = require('../utils/request');
var nowDate = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" +date.getDate();
const URL = 'https://weixin.youfumama.com/api/'
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
        title: '请尝试一下允许授权～',
        icon: 'none',
        duration: 2000
      }) 
    }
  },
  CompareDate:function(d1,d2){
    return ((new Date(d1.replace(/-/g, "\/"))) > (new Date(d2.replace(/-/g, "\/"))));
  },
  submitBtn:function(){
    if (this.data.state==1 && this.CompareDate(nowDate, this.data.date)){
      wx.showToast({
        title: '预产期不能小于当前日期',
        icon: 'none',
        duration: 2000
      })
      return;
    } if (this.data.state == 2 && this.CompareDate(this.data.date, nowDate)){
      wx.showToast({
        title: '宝宝生日不得大于当前日期',
        icon: 'none',
        duration: 2000
      })
      return;
    }
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
      var encStr = rsa.sign(data);
      var url = `${URL}users`;
      request.request(url, 'POST',encStr)
        .then((res) => {
            console.log(55,res)
            wx.setStorageSync('stateInfo', res.data.data.addedValue)
        })
        .catch((e) => {
          wx.showToast({
            title: '登录不成功',
            icon: 'none',
            duration: 2000
          })
        })
      wx.redirectTo({
        url: '../userinfo/userinfo',
      })
    }
  }
})

