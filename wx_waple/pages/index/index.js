//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
      server_list:[
          {img:'http://cdn.ayi800.com/image/png/wx_waple_server_list1%E6%9C%88%E5%AB%82@2x.png', text:'月嫂服务'},
          {img:'http://cdn.ayi800.com/image/png/wx_waple_server_list2%E7%A6%8F%E5%AE%A0@2x.png', text:'福宠套餐'},
          {img:'http://cdn.ayi800.com/image/png/wx_waple_server_list3%E6%9C%8D%E5%8A%A1@2x.png', text:'服务保障'},
      ],
      waiter_list:[
          {img:'http://cdn.ayi800.com/image/1aedf6b47bda6cccda6602c4fd2de4b5.jpg',name:"马冬梅",price:'19200元/26天'},
          {img:'http://cdn.ayi800.com/image/1aedf6b47bda6cccda6602c4fd2de4b5.jpg',name:"马冬梅",price:'19200元/26天'},
          {img:'http://cdn.ayi800.com/image/1aedf6b47bda6cccda6602c4fd2de4b5.jpg',name:"马冬梅",price:'19200元/26天'},
          {img:'http://cdn.ayi800.com/image/1aedf6b47bda6cccda6602c4fd2de4b5.jpg',name:"马冬梅",price:'19200元/26天'},
          {img:'http://cdn.ayi800.com/image/1aedf6b47bda6cccda6602c4fd2de4b5.jpg',name:"马冬梅",price:'19200元/26天'}
      ],
      comment_list:[
          {
              name:'杨珍珠',
              time : '4月15日',
              content:'马东什么阿姨很不错，照顾新生儿很有经验照顾新生儿很有经验，烧的催乳汤巨好喝，符合口味很耐思，月子餐什么啊的',
              waiter_name:'什么梅',
              price:'9800/26天'
          },
          {
              name:'杨珍珠',
              time : '4月15日',
              content:'马东什么阿姨很不错，照顾新生儿很有经验照顾新生儿很有经验，烧的催乳汤巨好喝，符合口味很耐思，月子餐什么啊的',
              waiter_name:'什么梅',
              price:'9800/26天'
          },
          {
              name:'杨珍珠',
              time : '4月15日',
              content:'马东什么阿姨很不错，照顾新生儿很有经验照顾新生儿很有经验，烧的催乳汤巨好喝，符合口味很耐思，月子餐什么啊的',
              waiter_name:'什么梅',
              price:'9800/26天'
          }
      ],
      city_list:[{name:'北京'},{name:'广州'},{name:'深圳'}],
      city_list_height:true,
      city_name:'北京',
      pull_text:'上拉加载更多'
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
    city_model:function(){
        this.setData({
            city_list_height : !this.data.city_list_height
        })
    },
    change_city:function(e){
        this.setData({
            city_name : e.currentTarget.dataset.name
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
  onLoad: function () {

  }
})
