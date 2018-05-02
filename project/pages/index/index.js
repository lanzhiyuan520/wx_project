
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
var OpenId =  JSON.parse(wx.getStorageSync('openId'))
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pregnancy:true,
    years: years,
    months: months,
    days: days,
    value: [yearVal, monthVal, dayVal],
    date: date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate()
  },
  stateChange:function(){
    var that=this;
    this.setData({
      pregnancy: !that.data.pregnancy
    })
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
      var data = JSON.stringify({
          status : 2,
          date : '2018-01-01',
          head_img : '1111',
          nickname : 'test',
          b_user_id : OpenId.openid
      })
      // var encrypt_rsa = new RSA.RSAKey();
      // encrypt_rsa = RSA.KEYUTIL.getKey(key);
      // encStr = encrypt_rsa.encrypt(data)
      // encStr = RSA.hex2b64(encStr);
      // console.log("加密结果：" + encStr)
        console.log(OpenId)
      var encStr = encryption(data)
        wx.request({
            url:'http://dev.weixin.api.com:9090/api/users',
            method : 'POST',
            data:{data:encStr},
            success : function(data){
                console.log(data)
            },
            fail:function(e){
                console.log(e)
            }
    })
    wx.navigateTo({
      // url: '../exercise/exercise',
      url: '../userinfo/userinfo',
    })
  },
    onLoad:function () {
        //console.log(app.globalData)
    }
})
var key ='-----BEGIN PUBLIC KEY-----MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQC3//sR2tXw0wrC2DySx8vNGlqt3Y7ldU9+LBLI6e1KS5lfc5jlTGF7KBTSkCHBM3ouEHWqp1ZJ85iJe59aF5gIB2klBd6h4wrbbHA2XE1sq21ykja/Gqx7/IRia3zQfxGv/qEkyGOx+XALVoOlZqDwh76o2n1vP1D+tD3amHsK7QIDAQAB-----END PUBLIC KEY-----'

