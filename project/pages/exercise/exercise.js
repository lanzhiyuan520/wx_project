// pages/exercise/exercise.js
var util = require('../../utils/utils.js');
// var RdWXBizDataCrypt = require('../../utils/RdWXBizDataCrypt.js');
import chartWrap from '../canvas/chartWrap';
import getConfig from './getConfig';
const date = new Date();
var month = date.getMonth();
const day = date.getDate();
var app = getApp()
var rsa = require('../utils/rsa')
const URL = 'http://test.weixin.api.ayi800.com/api/'
Page({

  /**
   * 页面的初始数据
   */
  data: {
      month:month,
      day:day,
      animationData: {},
      todayStep:9856,
      nornNum:8000,
      gap:2000,
      playStep:320,
      progress:false,
      labels:[],
      datas:[],
      code: "",
      encryptedData: "",
      iv: "",
      month:"",
      day:"",
      arrowAnimation: {},
      msg:"对于准妈妈来说，蛋白质的供给不仅要充足还要优质，每天在饮食中应摄取蛋白质60-80克，其中应包含来自于多种食物如鱼、肉、蛋、奶、豆制品等的优质蛋白质以保证受精卵的正常发育。",
      dates: [1488481383, 145510091, 1495296000]
  },
    run:function(){
      var that=this;
        wx.request({
            url:`${URL}run/1`,
            success:function(res){
                var addedValue = res.data.data.addedValue;
                var step = [];
                var date = [];
                for (var i = 0; i < addedValue.length;i++ ){
                  step.push(addedValue[i].step)
                  date.push(addedValue[i].created_at.substring(5,10))
                }
                that.lineChart(date, step)
            }
        })
    },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    this.run()
  },
  onShow: function () {
    var step = this.data.todayStep;
    this.isStandard(step)
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
  lineChart: function (labels, step) {
    let pageThis = this
    var arr = labels
    app.deviceInfo.then(function (deviceInfo) {
      let labels =arr
      let data = step
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
  }
})