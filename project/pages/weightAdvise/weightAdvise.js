// pages/exercise/exercise.js
var util = require('../../utils/utils.js');
import chartWrap from '../canvas/chartWrap';
import getConfig from './getConfig';
var request = require('../utils/request');
const date = new Date();
var month = date.getMonth();
const day = date.getDate();
var app = getApp()
const integers = [];
const decimals = [];

for (let i = 40; i <= 200; i++) {
  integers.push(i)
}

for (let i = 1; i < 10; i++) {
  decimals.push(i / 10)
}
var rsa = require('../utils/rsa')
//const URL = 'http://test.weixin.api.ayi800.com/api/'
const URL = app.globalData.url;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    month: month,
    day: day,
    animationData: {},
    weight: 66,
    nornNum: 150,
    gap: 30,
    progress: false,
    playStep: 320,
    arrowAnimation: {},
    mask: false,
    decimals: decimals,
    integers: integers,
    value: [1, 1, 1],
    newWeight:41.2,
    userId:null,
    msg: "对于准妈妈来说，蛋白质的供给不仅要充足还要优质，每天在饮食中应摄取蛋白质60-80克，其中应包含来自于多种食物如鱼、肉、蛋、奶、豆制品等的优质蛋白质以保证受精卵的正常发育。",
    dates: [1488481383, 145510091, 1495296000]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var value = wx.getStorageSync('stateInfo');
    var index = integers.indexOf(value.weight);
    if (value) {
      this.setData({
        userId: value.id,
        weight: value.weight,
        value: [index, 1, 1],
      })
    }
   for (var i = 0; i < 3; i++) {
      var fff = util.formatTime(this.data.dates[i], 'M月D日')
    }
  },
  dotMove:function(){
    var weight = this.data.weight * 2;
    this.isStandard(weight)
    var animation = wx.createAnimation({
      transformOrigin: "50% 50%",
      duration: 3000,
      timingFunction: "ease",
      delay: 0
    });
    this.animation = animation;
    this.animation.left(0).step();
    this.setData({
      animationData: this.animation.export()
    });
    setTimeout(function () {
      animation.left(this.data.playStep + "rpx").step()
      this.setData({
        animationData: animation.export()
      })
    }.bind(this), 300)
  },
  // 获取体重曲线数据
  getWeightData:function(){
    var that = this;
    var url = `${URL}weight/` + this.data.userId;
    request.request(url, 'GET')
      .then((res) => {
        if (that.data.pullrefresh) {
          wx.stopPullDownRefresh()
          that.setData({ pullrefresh: false })
          wx.showToast({
            title: '刷新成功',
            icon: 'none',
            duration: 1000
          })
        }
        var dataArr = [];
        var labelArr = [];
        var addedValue = res.data.data.addedValue;
        for (var i in addedValue) {
          dataArr.push(addedValue[i]);
          labelArr.push(i + '周')
        }
        that.graph(labelArr, dataArr)
    })
    .catch((e) => {
      wx.showToast({
        title: '尝试下拉刷新试试～',
        icon: 'none',
        duration: 2000
      })
    })
  },
  //下拉刷新
  onPullDownRefresh: function () {
    console.log('下拉刷新');
    this.setData({ pullrefresh: true })
    this.getWeightData();
  },
  onShow: function () {
    this.dotMove();
    this.getWeightData();
  },
  graph: function (label,datas) {
    console.log('data',datas)
    // 曲线
    let pageThis = this
    app.deviceInfo.then(function (deviceInfo) {
      console.log('设备信息', deviceInfo)
      let labels = label
      let data = datas
      let width = Math.floor(deviceInfo.windowWidth * 0.8)//canvas宽度
      let height = Math.floor(width / 1.6)//这个项目canvas的width/height为1.6
      let canvasId = 'myCanvas'
      let canvasConfig = {
        width: width,
        height: height,
        id: canvasId
      }
      let config = getConfig(canvasConfig, labels, data)
      chartWrap.bind(pageThis)(config)
    })
  },
  // 判断运动量标准
  isStandard: function (norn) {
    var nornNum = this.data.nornNum;
    var gap = this.data.gap;
    var step = 150 / gap;
    if (norn <= nornNum - gap) {
      console.log("偏少")
      if (norn < nornNum - 2 * gap) {
        return this.data.playStep = 0;
      } else {
        return this.data.playStep = parseInt(step * (norn - (nornNum - 2 * gap))) - 10;
      }
    } else if (norn > nornNum - gap && norn <= nornNum) {
      console.log("标准")
      return this.data.playStep = parseInt(step * (norn - (nornNum - gap))) + 140;
    } else if (norn > nornNum && norn <= nornNum + gap) {
      console.log("过量")
      return this.data.playStep = parseInt(step * (norn - nornNum)) + 290;
    } if (norn > nornNum + gap) {
      console.log("超标")
      if (norn > nornNum + 2 * gap) {
        return this.data.playStep = 580;
      } else {
        return this.data.playStep = parseInt(step * (norn - (nornNum + gap))) + 440;
      }
    }
  },
  hideNorm: function () {
    this.setData({
      progress: !this.data.progress
    })

    var animation = wx.createAnimation({
      transformOrigin: "50% 50%",
      duration: 500,
      timingFunction: "ease",
      delay: 0
    });
    this.animation = animation;
    if (!this.data.progress) {
      this.animation.rotate(0).step({ duration: 500 })
    } else {
      this.animation.rotate(-180).step({ duration: 500 })
    }
    this.setData({
      arrowAnimation: this.animation.export()
    })
  },
  maskShow: function () {
    this.setData({
      mask: true,
      show: true
    })
  },
  preventD: function () {
    console.log("遮罩出现时禁止穿透")
  },
  hideMask: function () {
    this.setData({
      mask: false,
      show: false
    })
  },
  bindChange: function (e) {
    const val = e.detail.value
    console.log(55,val)
    var bigNum = integers[val[0]];
    var smallNum = decimals[val[1]];
    console.log(bigNum, smallNum)
    var weight = bigNum + smallNum
    this.setData({
      newWeight: weight
    })
  },
  save:function(){
      var pages = getCurrentPages();
    var that=this;
    console.log(this.data.newWeight)
      var data = JSON.stringify({
          height : 0,
          weight :this.data.newWeight ,
          status : 1
      })
      var encStr = rsa.sign(data)
      wx.request({
        url: `${URL}users/`+that.data.userId,
          method:'PUT',
          data:{data:encStr},
          success:function(res){
             var prev = pages[pages.length - 2]
              prev.setData({
                  weight_val : res.data.data.addedValue.weight,
                  refresh : true
              })
            wx.setStorageSync('stateInfo', res.data.data.addedValue)
            that.setData({
              weight: res.data.data.addedValue.weight
            })
            that.dotMove();
          }
      })
  }
})