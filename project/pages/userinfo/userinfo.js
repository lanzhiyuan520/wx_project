var time = require('../utils/utils.js')
const app = getApp()
var sideBarstart
Page({
  /**
   * 页面的初始数据
   */
  data: {
      hidden : true,
      step : 8000,
      n: 2000,
      event: '',
      Today_know: [{ img: 'http://www.moepan.net/uploads/2018031510134448716611.png', text: '孕妇运动的最佳时间是什么时候？孕妇做什么运动对胎儿好', learner_n: 1966 }, { img: 'http://www.moepan.net/uploads/2018031510134448716611.png', text: '孕妇运动的最佳时间是什么时候？孕妇做什么运动对胎儿好', learner_n: 1966 }]
  },
  //跳转到今日知识页面
  skip_today : function () {
    wx.navigateTo({
      url: '../todayweb/todayweb?id=1'
    })
  },
  //页面滚动给最外层容器添加事件
  move : function (e) {
      this.setData({
        event: 'preventTouchMove'
      }) 
  },
  //获取滑动的触发点
  pageTouchStartHandler: function (e) {
    sideBarstart = e.changedTouches[0].pageX
  },
  //手指抬起判断是左滑还是右滑
  pageTouchEndHandler: function (e) {
    var touchend = e.changedTouches[0].pageX
    // slip left  
    if (touchend - sideBarstart < -50) {
      this.setData({
          hidden : false,
      })
    }
    // slip right  
    if (touchend - sideBarstart > 50) {
        this.setData({
          hidden : true,
        })
    }
    //手指抬起移除外层容器事件
    this.setData({
      event : ''
    })
  },
  //空函数不要删,控制外边容器禁止上下滑动
  preventTouchMove : function () {

  },
  //运动
  drawProgressbg: function () {
    // 使用 wx.createContext 获取绘图上下文 context
    var ctx = wx.createCanvasContext('canvasProgressbg')
    ctx.setLineWidth(4);// 设置圆环的宽度
    ctx.setStrokeStyle('#eee'); // 设置圆环的颜色
    ctx.setLineCap('round') // 设置圆环端点的形状
    ctx.beginPath();//开始一个新的路径
    ctx.arc(80, 80, 74, 0, 2 * Math.PI, false);
    //设置一个原点(100,100)，半径为90的圆的路径到当前路径
    ctx.stroke();//对当前路径进行描边
    ctx.draw();
  },
  drawCircle: function (step) {
    var context = wx.createCanvasContext('canvasProgress');
    // 设置渐变
    var gradient = context.createLinearGradient(100, 100, 40, 10);
    gradient.addColorStop("0", "#ff8094");
    gradient.addColorStop("1", "#ffaba4");
    context.setLineWidth(5);
    context.setStrokeStyle(gradient);
    context.setLineCap('round')
    context.beginPath();
    // 参数step 为绘制的圆环周长，从0到2为一周 。 -Math.PI / 2 将起始角设在12点钟位置 ，结束角 通过改变 step 的值确定
    context.arc(80, 80, 74, -Math.PI / 2, (step / this.data.step * 2) * Math.PI - Math.PI / 2, false);
    context.stroke();
    context.draw()
  },

//体重
  drawProgressbgW: function () {
    // 使用 wx.createContext 获取绘图上下文 context
    var ctx = wx.createCanvasContext('canvasProgressbg-weight')
    ctx.setLineWidth(4);// 设置圆环的宽度
    ctx.setStrokeStyle('#eee'); // 设置圆环的颜色
    ctx.setLineCap('round') // 设置圆环端点的形状
    ctx.beginPath();//开始一个新的路径
    ctx.arc(80, 80, 74, 0, 2 * Math.PI, false);
    //设置一个原点(100,100)，半径为90的圆的路径到当前路径
    ctx.stroke();//对当前路径进行描边
    ctx.draw();
  },
  drawCircleW: function (step) {
    var context = wx.createCanvasContext('canvasProgress-weight');
    // 设置渐变
    var gradient = context.createLinearGradient(100, 100, 40, 10);
    gradient.addColorStop("0", "#ff8094");
    gradient.addColorStop("1", "#ffaba4");

    context.setLineWidth(5);
    context.setStrokeStyle(gradient);
    context.setLineCap('round')
    context.beginPath();
    // 参数step 为绘制的圆环周长，从0到2为一周 。 -Math.PI / 2 将起始角设在12点钟位置 ，结束角 通过改变 step 的值确定
    context.arc(80, 80, 74, -Math.PI / 2, (step / this.data.step * 2) * Math.PI - Math.PI / 2, false);
    context.stroke();
    context.draw()
  },
  onReady: function () {
      
  },
  onLoad: function (options) {
      this.drawProgressbg();
      this.drawCircle(this.data.n)
      this.drawProgressbgW();
      this.drawCircleW(this.data.n)
  }, 
})