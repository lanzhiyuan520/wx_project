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
      page : 1
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
    onPullDownRefresh:function(){
        console.log('下拉刷新')
        setTimeout(()=>{
            toast.toast('刷新成功','none')
            wx.stopPullDownRefresh()

        },1500)
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
    user_comment:function(){
        wx.navigateTo({
            url : '../waiterDetail/waiterDetail'
        })
    },
    more:function(){
        wx.switchTab({
            url: '../waiter/waiter'
        })
    },
    onReachBottom:function () {
        var that = this
        this.setData({
            pull_text : '加载中...'
        })
        wx.showLoading({
            title : '加载中',
            mask : true
        })
        var arr = this.data.comment_list

        setTimeout(()=>{
            arr.push({
                name:'杨珍珠',
                time : '4月15日',
                content:'马东什么阿姨很不错，照顾新生儿很有经验照顾新生儿很有经验，烧的催乳汤巨好喝，符合口味很耐思，月子餐什么啊的',
                waiter_name:'什么梅',
                price:'9800/26天'
            })
            that.setData({
                comment_list : arr,
                pull_text : '上拉加载更多'
            })
            wx.hideLoading()
        },2000)
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
    waiterlist_recommend:function(){
        var that = this
        var url = `${URL}/nannys?city=${this.data.city_id}`
        request.request(url,'GET',{})
            .then(res=>{
                console.log('服务员列表推荐',res)
                if (res.data.code === 1){
                    that.setData({
                        waiter_list : res.data.data
                    })
                }
            })
            .catch(e=>{
                this.error_msg(e)
            })
    },
    comments_list:function () {
        var that = this
        var url = `${URL}/comments?city=${this.data.city_id}&page=${this.data.page}&current_page=index`
        request.request(url,'GET',{})
            .then(res=>{
                console.log('点评',res)   //comment_list
                if (res.data.code === 1){
                    that.setData({
                        comment_list : res.data.data
                    })
                }
            })
            .catch(e=>{
                this.error_msg(e)
            })
    },
    //错误信息
    error_msg:function (e) {
        console.log('错误信息',e)
    },
  onLoad: function () {
      //月嫂推荐list
      this.waiterlist_recommend()
      //获取用户点评
      this.comments_list()
      //月嫂详情
       //this.waiter_detail()
      //预约
      //this.yuyue()
  }
})
