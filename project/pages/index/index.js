
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
import {encryption} from '../../utils/encryption'
const app = getApp()
var OpenId =  wx.getStorageSync('openId')
var userInfo =  wx.getStorageSync('userInfo')
var MD5 = require('../utils/md5.js')
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
  onLoad: function () {
    try {
      var value = wx.getStorageSync('userInfo')
      if (value) {
        // Do something with return value
        this.setData({
          userInfo:value
        })
      }
    } catch (e) {
      // Do something when catch error
      console.log(e)
    }
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
  submitBtn:function(){
      var img = this.data.userInfo.avatarUrl;
      var name = this.data.userInfo.nickName;
      console.log(this.data.date)
      var data = JSON.stringify({
          status: this.data.state,
          date: this.data.date,        
          nickname: name,
          head_img: img,
          b_user_id : OpenId.openid
      })
      var encStr = rsa.sign(data)
        wx.request({
          url:'http://test.weixin.api.ayi800.com/api/users',
            method : 'POST',
            data: { data: encStr},
            success : function(data){
                console.log(55,data)
                try {
                  wx.setStorageSync('stateInfo', data.data.data.addedValue)
                } catch (e) {
                  console.log(e)
                }
            },
            fail:function(e){
              console.log(e)
            }
    })
    wx.navigateTo({
      // url: '../exercise/exercise',
      url: '../userinfo/userinfo',
    })
  }
})

