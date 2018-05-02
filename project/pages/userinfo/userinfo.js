var time = require('../utils/utils.js')
const app = getApp()
var sideBarstart
import {encryption} from '../../utils/encryption'
var appid = app.globalData.appId
var sessionKey  = app.globalData.session_key
var OpenId =  JSON.parse(wx.getStorageSync('openId'))
Page({
  /**
   * 页面的初始数据
   */
  data: {
      hidden : true,
      step : 10000,
      n: 7500,
      event: '',
      Today_know: [{ img: 'http://cdn.ayi800.com/image/png/xiaochengxu_wenzhangwenzhang_07.png', text: '孕妇运动的最佳时间是什么时候？孕妇做什么运动对胎儿好', learner_n: 1966 },{ img: 'http://cdn.ayi800.com/image/png/xiaochengxu_wenzhangwenzhang_07.png', text: '孕妇运动的最佳时间是什么时候？孕妇做什么运动对胎儿好', learner_n: 1966 },{ img: 'http://cdn.ayi800.com/image/png/xiaochengxu_wenzhangwenzhang_07.png', text: '孕妇运动的最佳时间是什么时候？孕妇做什么运动对胎儿好', learner_n: 1966 },{ img: 'http://cdn.ayi800.com/image/png/xiaochengxu_wenzhangwenzhang_07.png', text: '孕妇运动的最佳时间是什么时候？孕妇做什么运动对胎儿好', learner_n: 1966 }, { img: 'http://cdn.ayi800.com/image/png/xiaochengxu_wenzhangwenzhang_07.png', text: '孕妇运动的最佳时间是什么时候？孕妇做什么运动对胎儿好', learner_n: 1966 }],
      count : 0,
      timer : null
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
    onReachBottom:function () {
        console.log('上拉加载')
    },
    /*time : function () {
        var that = this
        var n = this.data.n
        var c = n/10
        this.data.timer = setInterval(function () {
            if (that.data.count < that.data.n){
                that.setData({
                    count : that.data.count + c
                })
                if (that.data.count <= that.data.n){
                    that.drawCircle(that.data.count)
                }
            }else {
                that.setData({
                    timer : null
                })
            }
        },100)
    },*/
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
    ctx.setLineCap('butt') // 设置圆环端点的形状
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
    context.setLineCap('butt')
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
    ctx.setLineCap('butt') // 设置圆环端点的形状
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
    context.setLineCap('butt')
    context.beginPath();
    // 参数step 为绘制的圆环周长，从0到2为一周 。 -Math.PI / 2 将起始角设在12点钟位置 ，结束角 通过改变 step 的值确定
    context.arc(80, 80, 74, -Math.PI / 2, (step / this.data.step * 2) * Math.PI - Math.PI / 2, false);
    context.stroke();
    context.draw()
  },
  onReady: function () {
      
  },
    today:function(){
        var url = `http://dev.weixin.api.com:9090/api/articles/1/2/1`
        console.log(url)
        wx.request({
            url:url,
            success:function(data){
              wx.request({
                  url : `http://dev.weixin.api.com:9090/api/articles/203`,
                  success:function(data){

                  }
              })
            }
        })
    },
    run_step:function(){
        wx.getWeRunData({
            success(res) {
              console.log(res)
              var data = {
                  appid,
                  sessionKey : OpenId.session_key,
                  encryptedData:res.encryptedData,
                  iv : res.iv
              }
                //var encrypt_rsa = new RSA.RSAKey();

              // console.log(OpenId)
              //  var D = RSA.hex2b64(data);
              //  var encStr = encryption(D)

               console.log(data)
               wx.request({
                  url : `http://dev.weixin.api.com:9090/api/run/1`,
                   method:'POST',
                   data:data,
                   success:function(data){
                      console.log(data)
                   }
               })
            }
        })
    },
  onLoad: function (options) {
      this.run_step()
      this.today()
      this.drawProgressbg();
      this.drawCircle(this.data.n);
      //this.time()
      this.drawProgressbgW();
      this.drawCircleW(this.data.n);
  }, 
})