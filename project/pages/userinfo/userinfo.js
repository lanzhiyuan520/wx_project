var time = require('../utils/utils.js')
const app = getApp()
var sideBarstart
var appid = app.globalData.appId
var rsa = require('../utils/rsa')
const integers = [];
const decimals = [];
const height_list = [];

for (let i = 40; i <= 200; i++) {
    integers.push(i)
}

for (let i = 1; i < 10; i++) {
    decimals.push(i / 10)
}

for (let i = 100; i < 200; i++) {
    height_list.push(i)
}
const URL = 'http://test.weixin.api.ayi800.com/api/'
var OpenId,userInfo
Page({
  /**
   * 页面的初始数据
   */
  data: {
      hidden : true,
      proposal_step : 0,
      step: 0,
      event: '',
      Today_know: [],
      count : 0,
      timer : null,
      userInfo:{},
      mask:false,
      show :false,
      decimals: decimals,
      integers: integers,
      height_list:height_list,
      weight:0,
      value : [0,0,0],
      height:0,
      weight_val:0,
      page:1,
      proposal_weight:100,
      refresh:false
  },
  //跳转到今日知识页面
  skip_today : function (e) {
    var id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: `../todayweb/todayweb?id=${id}`
    })
  },
  //页面滚动给最外层容器添加事件
  move : function (e) {
      this.setData({
        event: 'preventTouchMove'
      }) 
  },
    onShow:function(){
        if (this.data.refresh){
            console.log('刷新')
            this.drawProgressbgW();
            this.drawCircleW(this.data.weight_val);
            this.setData({
                refresh : false
            })
        }
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
    show_mask:function () {
        this.setData({
            mask: true,
            show: true,
            hidden:true
        })
    },
    hideMask:function(){
        this.setData({
            mask: false,
            show: false,
            hidden:false
        })
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
    context.arc(80, 80, 74, -Math.PI / 2, (step / this.data.proposal_step * 2) * Math.PI - Math.PI / 2, false);
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
    context.arc(80, 80, 74, -Math.PI / 2, (step / this.data.proposal_weight * 2) * Math.PI - Math.PI / 2, false);
    context.stroke();
    context.draw()
  },
  onReady: function () {
      
  },
    //体重
    bindChange:function(e){
        var val = e.detail.value[0]
        var weight = integers[val]
        this.setData({
            weight
        })
    },
    //身高
    bindheight:function(e){
        var height = height_list[e.detail.value[0]]
        this.setData({
            height
        })
    },
    //修改体重
    save:function(){
        var that = this
        var data = JSON.stringify({
            height : this.data.height,
            weight :this.data.weight ,
            status : 1
        })
        var encStr = rsa.sign(data)
        wx.request({
            url:`${URL}users/1`,
            method:'PUT',
            data:{data:encStr},
            success:function(res){
                if (res.data.data.result){
                    var weight_val = res.data.data.addedValue.weight
                    wx.setStorageSync('stateInfo', res.data.data.addedValue)
                    that.setData({
                        weight_val
                    })
                    that.drawProgressbgW();
                    that.drawCircleW(that.data.weight_val);
                }
            }
        })
    },
    onReachBottom:function () {
        var that = this
        wx.showLoading({
            title: '加载中',
            mask:true,
        })
        that.setData({
            page : that.data.page+1
        })
        wx.request({
            url:`${URL}articles?status=2&page=${that.data.page}`,
            success:function(res){
                if (res.data.data.result){
                    wx.hideLoading()
                    var Today_know = that.data.Today_know
                    var Today_list = res.data.data.addedValue
                    Today_list.map((item,index)=>{
                        Today_know.push(item)
                    })
                    that.setData({
                        Today_know
                    })
                }else{
                    wx.showToast({
                        title: '没有更多了',
                        icon:'none',
                        duration: 2000
                    })
                    wx.hideLoading()
                }
            }
        })
    },
    today:function(){
        var that = this
        var url = `${URL}articles?status=2&page=${that.data.page}`
        wx.request({
            url:url,
            success:function(res){ //Today_know
                if (res.data.data.result){
                    var Today_know = res.data.data.addedValue
                    that.setData({
                        Today_know
                    })
                }
            }
        })
    },
    run_sports:function(){
      var that = this
        wx.getWeRunData({
            success(res) {
                var data = JSON.stringify({
                    appid,
                    sessionKey : OpenId.session_key,
                    encryptedData:res.encryptedData,
                    iv : res.iv
                })
                var encStr = rsa.sign(data)
                console.log('请求运动的数据',data)
                console.log(encStr)
                wx.request({
                    url : `${URL}run/1`,
                    method:'POST',
                    data:{data:encStr},
                    success:function(res){
                        console.log('请求回来的运动数据',res)
                        var addedValue = res.data.data.addedValue
                        var date = new Date().getTime()
                        addedValue.time = date
                        if (res.data.data.result){
                            wx.setStorageSync('run_step',res.data.data.addedValue)
                            that.setData({
                                proposal_step:addedValue.proposal,
                                step : addedValue.num
                            })
                            that.drawProgressbg();
                            that.drawCircle(that.data.step);
                            wx.hideLoading()
                        }else{
                            that.drawProgressbg();
                            wx.hideLoading()
                        }
                    },
                    fail:function(){
                        that.drawProgressbg();
                        wx.hideLoading()
                    }
                })
            },
            fail:function(){
                wx.showModal({
                    title: '提示',
                    content: '您拒绝了授权,将获取不到运动步数，点击确定重新获取',
                    success: function (res) {
                        if (res.confirm) {
                            //如果用户点击确定则引导打开授权
                            wx.openSetting({
                                success : function (res) {
                                    if (!res.authSetting["scope.werun"]){
                                        //如果用户进入用户授权页面却没有授权，则再次弹出提示框
                                        that.run_step()
                                    }else{
                                        //如果用户授权了则获取用户信息
                                        that.run_step()
                                    }

                                }
                            })
                        } else if (res.cancel) {
                            //如果用户点击取消，则再次弹出提示框直到用户确定授权为止
                            that.run_step()
                            console.log('用户点击取消')
                        }
                    }

                })
            }
        })
    },
    run_step:function(){
        var that = this
        var p_date = new Date()
        var run_step = wx.getStorageSync('run_step')
        var time = run_step.time
        var minutes = Math.floor((p_date-time)/(60*1000))
        console.log(minutes)
        if (!run_step){
            that.run_sports()
        }else{
            if (minutes >= 1){
                console.log('大于十分钟')
                that.run_sports()
            }else{
                that.setData({
                    proposal_step : run_step.proposal,
                    step : run_step.num
                })
                console.log('小于十分钟')
                that.drawProgressbg();
                that.drawCircle(that.data.step);
                wx.hideLoading()
            }
        }
    },
  onLoad: function (options) {
      wx.showLoading({
          title: '加载中',
          mask:true,
      })
       OpenId =  wx.getStorageSync('openId')
       userInfo = JSON.parse(wx.getStorageSync('userInfo'))
      console.log('用户信息',userInfo)
      var stateInfo = wx.getStorageSync('stateInfo')
      console.log('用户状态',stateInfo)
      console.log('OpenId',OpenId)
      this.setData({
          userInfo,
          weight_val:stateInfo.weight
      })
      this.run_step()
      this.today()
      if (stateInfo.weight === 0){
          this.drawProgressbgW();
      }else{
          this.drawProgressbgW();
          this.drawCircleW(this.data.weight_val);
      }

  }
})