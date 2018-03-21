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
    console.log(this.data.date)
    wx.navigateTo({
      // url: '../exercise/exercise',
      url: '../weightAdvise/weightAdvise',
    })
  }
})