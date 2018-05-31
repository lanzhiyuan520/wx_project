//index.js
//获取应用实例
var toast = require('../common/toast')
var request = require('../common/request')
var rsa = require('../common/rsa')
var Date = require('../common/Date')
const app = getApp()
var URL = app.globalData.URL
var openId,userInfo,city,id

Page({
    onShareAppMessage: function () {
        return {
            title: '专业月嫂服务，上万家庭选择！',
            path: '/pages/index/index'
        }
    },
  data: {
      server_list:[
          {img:'http://cdn.ayi800.com/image/png/wx_waple_server_list1%E6%9C%88%E5%AB%82@2x.png', text:'月嫂服务'},
          {img:'http://cdn.ayi800.com/image/png/wx_waple_server_list2%E7%A6%8F%E5%AE%A0@2x.png', text:'福宠套餐'},
          {img:'http://cdn.ayi800.com/image/png/wx_waple_server_list3%E6%9C%8D%E5%8A%A1@2x.png', text:'服务保障'},
      ],
      waiter_list:[],
      comment_list:[],
      city_list:[{name:'北京',id:184},{name:'广州',id:100049},{name:'深圳',id:100047 }],
      city_list_height:true,
      city_name:'',
      pull_text:'上拉加载更多',
      city_id:'',
      page : 1,
      refresh : false,
      waiter_list_refresh : false,
      comment_list_refresh : false,
      id : null
  },
    //跳转功能页
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
    //修改城市
    change_city:function(e){
        var {name} = e.currentTarget.dataset
        var {id} = e.currentTarget.dataset
        if (name == this.data.city_name){
            return false
        }else{
            wx.showLoading({
                title : '加载中',
                mask : true
            })
            this.setData({
                city_name : name,
                city_id : id,
                page : 1,
                pull_text:'上拉加载更多',
                comments_list:[]
            })
            wx.setStorageSync('city',id)
            this.waiterlist_recommend()
            this.comments_list(this.data.page)
        }

    },
    //跳转服务员详情
    user_comment:function(e){
        var id = e.currentTarget.dataset.id
        wx.navigateTo({
            url : `../waiterDetail/waiterDetail?id=${id}`
        })
    },
    //跳转服务员列表页
    more:function(){
        wx.switchTab({
            url: '../waiter/waiter'
        })
    },
    //上拉加载
    onReachBottom:function () {
        if (this.data.pull_text == '没有更多了'){
            return false
        }
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
    //月嫂推荐列表
    waiterlist_recommend:function(){
        var that = this
        var url = `${URL}/nannys?city=${this.data.city_id}`
        request.request(url,'GET',{})
            .then(res=>{
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
    //用户点评列表
    comments_list:function (page) {
        var that = this
        var url = `${URL}/comments?city=${this.data.city_id}&page=${page}&current_page=index`
        request.request(url,'GET',{})
            .then(res=>{
                if (res.data.code === 1){
                    wx.hideLoading()
                    if (page != 1){
                        if (res.data.data.length == 0){
                            this.setData({
                                pull_text : '没有更多了',
                            })
                            return false
                        }
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
    //用户行为
  action:function(){
      var url = `${URL}/actions`
      var data = {
          user_id : this.data.id,
          path : 'index',
          page_type : 3,
          request_time : Date.time()
      }
      request.request(url,'POST',data)
          .then(res=>{
          })
  },
    //首页加载城市
    city_name:function(city){
        if (city === 184){
            this.setData({
                city_name : '北京',
                city_id : 184
            })
        }else if (city === 100047){
            this.setData({
                city_name : '深圳',
                city_id : 100047
            })
        }else if (city === 100049){
            this.setData({
                city_name : '广州',
                city_id : 100049
            })
        }
    },
    getUserId:function(){
        var that = this
        var data = {
            appid : app.globalData.appid,
            user_id : openId.openid,
            nickname : userInfo.nickName,
            picture :  userInfo.avatarUrl
        }
        console.log(data)
        var url = `${URL}/users`
        wx.request({
            url : url,
            method:'POST',
            data:data,
            success:function(res){
                if (res.data.code === 1){
                    wx.setStorageSync('user_id', res.data.data.id)
                    that.setData({
                        id : res.data.data.id
                    })
                    console.log(that.data)
                }
            }
        })
    },
  onLoad: function () {
       id = wx.getStorageSync('user_id')
       city = wx.getStorageSync('city')
       userInfo = JSON.parse(wx.getStorageSync('userInfo'))
       openId = wx.getStorageSync('openId')
      this.setData({
          id,
          city_id : city
      })
      if (!id){
           console.log('id获取失败，从新获取id')
           this.getUserId()
      }
      this.city_name(city)
      //用户行为
      this.action()
      wx.showLoading({
          title : '加载中',
          mask : true
      })
      //月嫂推荐list
      this.waiterlist_recommend()
      //获取用户点评
      this.comments_list(this.data.page)

  }
})
