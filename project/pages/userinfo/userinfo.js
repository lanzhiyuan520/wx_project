var time = require('../utils/utils.js')
var canvas = require('../utils/canvas')
var request = require('../utils/request')
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

for (let i = 100; i < 300; i++) {
    height_list.push(i)
}
//const URL = 'http://test.weixin.api.ayi800.com/api/'
const URL = 'https://weixin.youfumama.com/api/'
var OpenId,userInfo
Page({
  /**
   * 页面的初始数据
   */
  data: {
      hidden : true,
      hidden_s : false,
      hidden_empty : true,
      proposal_step : 0,
      step: 0,
      event: '',
      Today_know: [],
      userInfo:{},
      mask:false,
      show :false,
      decimals: decimals,
      integers: integers,
      height_list:height_list,
      weight:0,
      value : [10],
      height:0,
      weight_val:0,
      page:1,
      proposal_weight:100,
      refresh:false,
      stateInfo:{},
      userId:null,
      state_text:'',
      pullrefresh:false
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
    //判断goback之前是否修改了体重
    onShow:function(){
        if (this.data.refresh){
            var {weight_val,proposal_weight} = this.data
            canvas.drawProgressbgW();
            canvas.drawCircleW(weight_val,proposal_weight);
            this.setData({
                refresh : false
            })
            this.change_weight_val()
        }
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
          hidden_s : true,
      })
    }
    // slip right  
    if (touchend - sideBarstart > 50) {
        this.setData({
          hidden : true,
          hidden_s : false,
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
    //显示提示框
    show_mask:function () {
        this.setData({mask: true, show: true, hidden:true,hidden_s:true,hidden_empty:false,event:'preventTouchMove'})
    },
    //隐藏提示框
    hideMask:function(){
        this.setData({mask: false, show: false, hidden:false,hidden_s:true,hidden_empty:true,event:''})
    },
    //体重
    bindChange:function(e){
        var val = e.detail.value[0]
        var weight = integers[val]
        this.setData({weight})
    },
    //身高
    bindheight:function(e){
        var height = height_list[e.detail.value[0]]
        this.setData({height})
    },
    //修改体重
    save:function(){
        var that = this
        var url  = `${URL}users/${that.data.userId}`
        var data = JSON.stringify({
            height : this.data.height,
            weight :this.data.weight ,
            status : 1
        })
        var {weight_val,proposal_weight} = that.data
        var encStr = rsa.sign(data)
        request.request(url,'PUT',encStr)
            .then((res)=>{
                if (res.data.data.result){
                    wx.showToast({
                        title: '修改成功',
                        icon: 'success',
                        duration: 2000
                    })
                    var weight_val = res.data.data.addedValue.weight
                    wx.setStorageSync('stateInfo', res.data.data.addedValue)
                    that.setData({weight_val})
                    canvas.drawProgressbgW()
                    canvas.drawCircleW(weight_val,proposal_weight)
                    that.change_weight_val()
                }
            })
            .catch((e)=>{
                wx.showToast({
                    title: '修改失败',
                    icon: 'none',
                    duration: 2000
                })
            })
    },
    //上拉加载
    onReachBottom:function () {
        var that = this
        var url = `${URL}articles?status=${that.data.stateInfo.status}&page=${that.data.page}`
        wx.showLoading({
            title: '加载中',
            mask:true,
        })
        that.setData({page : that.data.page+1})
        request.request(url,'GET',{})
            .then((res)=>{
                if (res.data.data.result){
                    wx.hideLoading()
                    var Today_know = that.data.Today_know
                    var Today_list = res.data.data.addedValue
                    Today_list.map((item,index)=>{
                        Today_know.push(item)
                    })
                    that.setData({Today_know})
                }else{
                    wx.showToast({
                        title: '没有更多了',
                        icon:'none',
                        duration: 2000
                    })
                    wx.hideLoading()
                }
            })
            .catch((e)=>{

            })
    },
    //下拉刷新
    onPullDownRefresh:function(){
        console.log('下拉刷新')
        this.setData({pullrefresh:true,page:1})
        this.getdata()
        this.run_step()
        this.today()
    },
    //今日知识
    today:function(){
        console.log(this.data.page)
        var that = this
        var url = `${URL}articles?status=${that.data.stateInfo.status}&page=${that.data.page}`
        request.request(url,'GET',{})
            .then((res)=>{
                if (res.data.data.result){
                    var Today_know = res.data.data.addedValue
                    if (that.data.pullrefresh){
                        wx.stopPullDownRefresh()
                        that.setData({pullrefresh:false})
                        wx.showToast({
                            title: '刷新成功',
                            icon:'none',
                            duration: 1000
                        })
                    }
                    that.setData({Today_know})
                }
            })
            .catch((e)=>{
                console.log(e)
            })
    },
    //获取运动步数
    run_sports:function(){
      var that = this
        wx.getWeRunData({
            success(res) {
                var url = `${URL}run/` + that.data.userId
                var data = JSON.stringify({
                    appid,
                    sessionKey : OpenId.session_key,
                    encryptedData:res.encryptedData,
                    iv : res.iv
                })
                var encStr = rsa.sign(data)
                request.request(url,'POST',encStr)
                    .then((res)=>{
                        console.log(res)
                        var addedValue = res.data.data.addedValue
                        var date = new Date().getTime()
                        addedValue.time = date
                        if (res.data.data.result){
                            wx.setStorageSync('run_step',res.data.data.addedValue)
                            that.setData({
                                proposal_step:addedValue.proposal,
                                step : addedValue.num
                            })
                            canvas.drawProgressbg()
                            canvas.drawCircle(that.data.step,that.data.proposal_step)
                            wx.hideLoading()
                        }else{
                            canvas.drawProgressbg()
                            wx.hideLoading()
                        }
                    })
                    .catch((e)=>{
                        canvas.drawProgressbg()
                        wx.hideLoading()
                    })
            },
            fail:function(){
                wx.hideLoading()
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
                                        //如果用户授权了则获取运动步数
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
    //判断第二次进入页面是否大于十分钟 大于的话重新获取运动步数
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
                canvas.drawProgressbg()
                canvas.drawCircle(that.data.step,that.data.proposal_step)
                wx.hideLoading()
            }
        }
    },
    //获取用户信息、状态、openid等
    getdata:function(){
        OpenId =  wx.getStorageSync('openId')
        userInfo = JSON.parse(wx.getStorageSync('userInfo'))
        console.log('用户信息',userInfo)
        var stateInfo = wx.getStorageSync('stateInfo')
        console.log('用户状态',stateInfo)
        console.log('OpenId',OpenId)
        this.setData({
            userInfo,
            weight_val:stateInfo.weight,
            stateInfo,
            userId: stateInfo.id
        })
        this.change_weight_val()
        if (stateInfo.status === 1){
            this.setData({
                state_text:'今天距宝宝出生大约'
            })
        }else if (stateInfo.status === 2 || stateInfo.status === 3){
            this.setData({
                state_text:'今天宝宝已出生'
            })
        }
        if (stateInfo.weight === 0){
            canvas.drawProgressbgW()
        }else{
            canvas.drawProgressbgW()
            canvas.drawCircleW(this.data.weight_val,this.data.proposal_weight)
        }
    },
    //更改当前体重值
    change_weight_val:function(){
        var value = []
        var val = integers.indexOf(this.data.weight_val)
        value[0] = val
        this.setData({
            value
        })
    },
  onLoad: function (options) {
      wx.showLoading({
          title: '加载中',
          mask:true,
      })
      this.getdata()
      this.run_step()
      this.today()
  }
})