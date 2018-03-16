var time = require('../utils/utils.js')
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    
  },
  skip_today : function () {
    wx.navigateTo({
      url: '../todayweb/todayweb?id=1'
    })
  },
  // drawCircle: function (step) {
  //   var context = wx.createCanvasContext('canvasProgress');
  //   // 设置渐变
  //   var gradient = context.createLinearGradient(0, 0, 70, 100);
  //   gradient.addColorStop("0", "#ffada5");
  //   gradient.addColorStop("0.5", "#ffada5");
  //   gradient.addColorStop("1.0", "#ff8395");

  //   context.setLineWidth(5);
  //   context.setStrokeStyle(gradient);
  //   context.setLineCap('round')
  //   context.beginPath();
  //   // 参数step 为绘制的圆环周长，从0到2为一周 。 -Math.PI / 2 将起始角设在12点钟位置 ，结束角 通过改变 step 的值确定
  //   context.arc(75, 75, 70, -Math.PI / 2, step * Math.PI - Math.PI / 2, false);
  //   context.stroke();
  //   context.draw()
  // },
  // onReady: function () {
  //   this.drawCircle(2);
  // },
  onLoad: function (options) {
    
  }, 
})