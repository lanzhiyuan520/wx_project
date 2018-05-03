// pages/exercise/exercise.js
var util = require('../../utils/utils.js');
var RdWXBizDataCrypt = require('../../utils/RdWXBizDataCrypt.js');
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
        wx.request({
            url:`${URL}run/1`,
            success:function(res){
                console.log(res)
            }
        })
    },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    this.run()
    for (var i = 0; i < 3;i++){
      var fff = util.formatTime(this.data.dates[i], 'M月D日')
    }
    var that = this;
    wx.login({
      success: function (res) {
        that.setData({
          code: res.code
        });
        if (res.code) {
          wx.request({
            url: 'https://api.weixin.qq.com/sns/jscode2session?appid=' + app.globalData.appId + '&secret=' + app.globalData.AppSecret + '&js_code=' + res.code + '&grant_type=authorization_code',
            header: {
              'content-type': 'json'
            },
            success: function (res) {
              var session_key = res.data.session_key;
              that.getData(app.globalData.appId, session_key);
            }
          })
        }
      }
    }) 
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
  getData: function (appid, session_key) {
    let that = this
    wx.getSetting({
      success: function (res) {
        wx.getWeRunData({
          success: function (res) {
            var pc = new RdWXBizDataCrypt(appid, session_key)
            var data = pc.decryptData(res.encryptedData, res.iv)
            var categories = [];
            var step = [];
            var date = new Date();
            var day = date.getDate();
            var month = date.getMonth();
            var year = date.getFullYear();
            var days = 0;
            for (var i = 0; i < 31; i++) {
              step.push(data.stepInfoList[i].step);
            }
            if (day >= 7) {
              var arr = [];
              for (var i = 5; i >= 0; i--) {
                arr.push(day - i + "日")
              }
              var categories = [ (day - 6) + "日", ...arr]
            } else {
              if (month == 2) {
                if (year % 4 == 0 && year % 100 != 0 || year % 400 == 0) {
                  days = 29;
                } else {
                  days = 28;
                }
              } else {
                if ((month == 4) || (month == 6) || (month == 9) || (month == 11)) {
                  days = 30;
                } else {
                  days = 31;
                }
              }
              var arr = [];
              var newArr = [];
              for (var i = day - 1; i >= 0; i--) {
                arr.push(day - i + "日")
              }
              for (var i = days + (day - 6); i <= days; i++) {
                newArr.push(i + "日")
              } 
              var categories = [...newArr, ...arr]
            }
            var steps = step.slice(24)
            var windowWidth = 320;
            try {
              var res = wx.getSystemInfoSync();
              windowWidth = res.windowWidth;
            } catch (e) {
              console.error('getSystemInfoSync failed!');
            }
            
            that.setData({
              month: month+1,
              day: day
            })
            // console.log(that.data.todayStep)
            that.lineChart(categories, steps)
          },
          fail: function (res) {
            wx.showModal({
              title: '提示',
              content: '开发者未开通微信运动，请关注“微信运动”公众号后重试',
              showCancel: false,
              confirmText: '知道了'
            })
          }
        })
      }
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