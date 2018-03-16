// pages/exercise/exercise.js
var util = require('../../utils/utils.js');
import * as echarts from '../../ec-canvas/echarts';
const app = getApp();
const date = new Date();
var month = date.getMonth();
const day = date.getDate();

function initChart(canvas, width, height) {
  const chart = echarts.init(canvas, null, {
    width: width,
    height: height
  });
  canvas.setChart(chart);

  var option = {
    backgroundColor: "#fff",
    color: '#ff6f88',

    tooltip: {
      trigger: 'axis'
    },
    grid: {
      containLabel: true
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      splitLine:{
        show:true
      },
      data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
    },
    yAxis: {
      x: 'center',
      type: 'value',
      axisLabel:{
        show:false
      }
    },
    series: [{
      name: 'A商品',
      type: 'line',
      smooth: true,
      data: [18, 36, 65, 30, 78, 40, 33]
    }]
  };

  chart.setOption(option);
  return chart;
}

Page({

  /**
   * 页面的初始数据
   */
  data: {
      month:month,
      day:day,
      animationData: {},
      todayStep:9000,
      nornNum:8000,
      gap:2000,
      playStep:320,
      msg:"对于准妈妈来说，蛋白质的供给不仅要充足还要优质，每天在饮食中应摄取蛋白质60-80克，其中应包含来自于多种食物如鱼、肉、蛋、奶、豆制品等的优质蛋白质以保证受精卵的正常发育。",
      dates: [1488481383, 145510091, 1495296000],
      ec: {
        onInit: initChart
      }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    for (var i = 0; i < 3;i++){
      var fff = util.formatTime(this.data.dates[i], 'M月D日')
      console.log(fff)
    }
  },
  onShow: function () {
    var step = this.data.todayStep;
    this.isStandard(step)
    var animation = wx.createAnimation({
      transformOrigin: "50% 50%",
      duration: 5000,
      timingFunction: "ease",
      delay: 0
    });
    this.animation = animation;
    this.animation.left(this.data.playStep+"rpx").step({ duration: 1000 })
    this.setData({
      animationData: this.animation.export()
    })
   
  },
  // 判断运动量标准
  isStandard:function(norn){
    var nornNum = this.data.nornNum;
    var gap = this.data.gap;
    var step=150/gap;
    if (norn <= nornNum - gap) {
      console.log("偏少")
      if (norn < nornNum - 2*gap){
        return this.data.playStep=0;
      }else{
       return this.data.playStep = parseInt(step * (norn - (nornNum - 2 * gap)))-10;
      }
    } else if (norn > nornNum - gap && norn <= nornNum) {
      console.log("标准")
      return this.data.playStep = parseInt(step * (norn - (nornNum - gap)))+140;
    } else if (norn > nornNum && norn <= nornNum + gap) {
      console.log("过量")
      return this.data.playStep = parseInt(step * (norn - nornNum)) + 290;
    } if (norn > nornNum + gap) {
      console.log("超标")
      if (norn > nornNum + 2 * gap) {
        return this.data.playStep = 580;
      } else {
        return this.data.playStep = parseInt(step * (norn - (nornNum + gap)))+440;
      }
    }
  }
})