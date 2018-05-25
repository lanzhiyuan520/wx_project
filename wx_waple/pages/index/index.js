//index.js
//获取应用实例
var toast = require('../common/toast')
var request = require('../common/request')
var rsa = require('../common/rsa')
const app = getApp()
var URL = app.globalData.URL

    Page({
  data: {
      server_list:[
          {img:'http://cdn.ayi800.com/image/png/wx_waple_server_list1%E6%9C%88%E5%AB%82@2x.png', text:'月嫂服务'},
          {img:'http://cdn.ayi800.com/image/png/wx_waple_server_list2%E7%A6%8F%E5%AE%A0@2x.png', text:'福宠套餐'},
          {img:'http://cdn.ayi800.com/image/png/wx_waple_server_list3%E6%9C%8D%E5%8A%A1@2x.png', text:'服务保障'},
      ],
      waiter_list:[],
      comment_list:[],
      city_list:[{name:'北京'},{name:'广州'},{name:'深圳'}],
      city_list_height:true,
      city_name:'北京',
      pull_text:'上拉加载更多',
      city_id:184,
      page : 1,
      refresh : false,
      waiter_list_refresh : false,
      comment_list_refresh : false,
  },
    service:function(e){
      if (e.currentTarget.dataset.idx == 0){
          wx.navigateTo({
              url: '../waiterServices/waiterServices'
          })
      }else if (e.currentTarget.dataset.idx == 1){
          wx.navigateTo({
              url: '../fuchong/fuchong'
          })
      }else if (e.currentTarget.dataset.idx == 2){
          wx.navigateTo({
              url: '../service/service'
          })
      }
    },
    //下拉刷新
    onPullDownRefresh:function(){
        console.log('下拉刷新')
        this.setData({
            page : 1,
            refresh : true
        })
        this.comments_list(this.data.page)
        this.waiterlist_recommend()
    },
    city_model:function(){
        this.setData({
            city_list_height : !this.data.city_list_height
        })
    },
    change_city:function(e){
        var {name} = e.currentTarget.dataset
        console.log(name)
        if (name == this.data.city_name){
            console.log('一样')
            return false
        }else{
            console.log('不一样')
        }
        this.setData({
            city_name : name
        })
    },
    user_comment:function(e){
        var id = e.currentTarget.dataset.id
        console.log(e)
        wx.navigateTo({
            url : `../waiterDetail/waiterDetail?id=${id}`
        })
    },
    more:function(){
        wx.switchTab({
            url: '../waiter/waiter'
        })
    },
    //上拉加载
    onReachBottom:function () {
        var that = this
        this.setData({
            pull_text : '加载中...',
            page : this.data.page + 1
        })
        wx.showLoading({
            title : '加载中',
            mask : true
        })
        this.comments_list(this.data.page)
    },
    waiter_detail:function(){
      var url = `${URL}/detail/100005`
        request.request(url,'GET',{})
            .then((res)=>{
                console.log('月嫂详情',res)
            })
            .catch((error)=>{
                console.log(error)
            })
    },
    yuyue:function(){
      var data = JSON.stringify({
          user_id : 1,
          object_id : 100005,
          city : 184,
          note : '2018-05-05',
          customer_name : 'test',
          customer_phone : '18310737476',
          nanny_type : 0
      })
      var url = `${URL}/appointment`
        var encStr = rsa.sign(data)
        request.request(url,'POST',encStr)
            .then(res=>{
                console.log('预约',res)
            })
            .catch((e)=>{
                console.log(e)
            })
    },
    //刷新成功函数
    refresh_success : function(){
        if (this.data.waiter_list_refresh && this.data.comment_list_refresh){
            wx.stopPullDownRefresh()
            toast.toast('刷新成功','none')
            this.setData({
                refresh : false,
                waiter_list_refresh : false,
                comment_list_refresh : false
            })
        }
    } ,
    waiterlist_recommend:function(){
        var that = this
        var url = `${URL}/nannys?city=${this.data.city_id}`
        request.request(url,'GET',{})
            .then(res=>{
                console.log('服务员列表推荐',res)
                if (res.data.code === 1){
                    if (this.data.refresh){
                        this.setData({
                            waiter_list_refresh : true
                        })
                        this.refresh_success()
                    }
                    that.setData({
                        waiter_list : res.data.data
                    })
                }
            })
            .catch(e=>{
                this.error_msg(e)
            })
    },
    comments_list:function (page) {
        var that = this
        var url = `${URL}/comments?city=${this.data.city_id}&page=${page}&current_page=index`
        request.request(url,'GET',{})
            .then(res=>{
                console.log('点评',res)
                if (res.data.code === 1){
                    wx.hideLoading()
                    if (page != 1){
                        console.log('上拉加载',res)
                        var comment_list = that.data.comment_list
                        res.data.data.map((item,index)=>{
                            comment_list.push(item)
                        })
                        that.setData({
                            comment_list
                        })
                    }else{
                        if (that.data.refresh){
                            this.setData({
                                comment_list_refresh : true
                            })
                            this.refresh_success()
                        }
                        that.setData({
                            comment_list : res.data.data
                        })
                    }
                }
            })
            .catch(e=>{
                this.error_msg(e)
            })
    },
    //错误信息
    error_msg:function (e) {
        if (e.errMsg==='request:fail timeout'){
            toast.toast('请求超时,请稍后重试','none')
        }
        wx.stopPullDownRefresh()
        wx.hideLoading()
        console.log('错误信息',e)
    },
  onLoad: function () {
      wx.showLoading({
          title : '加载中',
          mask : true
      })
      //月嫂推荐list
      this.waiterlist_recommend()
      //获取用户点评
      this.comments_list(this.data.page)
      //月嫂详情
       //this.waiter_detail()
      //预约
      //this.yuyue()
  }
})
