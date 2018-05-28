const app = getApp()
var URL = app.globalData.URL
var request = require('../common/request')
Page({
  data: {
    hasMask: false,
    indicatorDots: false,
    isFold: true,
    lableFold: true,
    waiter_list: [
      { img: 'http://cdn.ayi800.com/image/1aedf6b47bda6cccda6602c4fd2de4b5.jpg', name: "马冬梅", price: '19200元/26天' },
      { img: 'http://cdn.ayi800.com/image/1aedf6b47bda6cccda6602c4fd2de4b5.jpg', name: "马冬梅", price: '19200元/26天' },
      { img: 'http://cdn.ayi800.com/image/1aedf6b47bda6cccda6602c4fd2de4b5.jpg', name: "马冬梅", price: '19200元/26天' },
      { img: 'http://cdn.ayi800.com/image/1aedf6b47bda6cccda6602c4fd2de4b5.jpg', name: "马冬梅", price: '19200元/26天' },
      { img: 'http://cdn.ayi800.com/image/1aedf6b47bda6cccda6602c4fd2de4b5.jpg', name: "马冬梅", price: '19200元/26天' }
    ],
    work_img: [],
    label: [],
    lessLabel: [],
    index: 0,
    waiter_id: null,
    waiter_info: {},
    tags: [],
    page: 1,
    like_list: [],
    detail_comments: []
  },
  // 防止遮罩的穿透
  myCatchTouch: function () {
    console.log('stop user scroll it!');
    return;
  },
  // 图片展示的显示和隐藏
  picShow: function (e) {
    var index = e.currentTarget.dataset['index'];
    this.setData({
      hasMask: true,
      index: index
    })
  },
  picHide: function () {
    this.setData({
      hasMask: false
    })
  },
  // 文字展开隐藏
  flodFn: function () {
    this.setData({
      isFold: !this.data.isFold
    })
  },
  // 印象标签显示隐藏
  lableShow: function () {
    this.setData({
      lableFold: !this.data.lableFold,
    })
  },
  // 展示加载更多
  extendMore: function () {
    wx.showLoading({
      title: '加载中'
    })
    // 隐藏
    setTimeout(function () {
      wx.hideLoading()
    }, 2000)
  },
  //服务员资料
  waiter_detail: function () {
    var url = `${URL}/detail/${this.data.waiter_id}`
    request.request(url, 'GET', {})
      .then((res) => {
        if (res.data.code === 1) {
          console.log('月嫂详情', res)
          var waiter = res.data.data
          var lessLabel = waiter.tags.slice(0, 6);
          var waiter_info = waiter.baseMessgae;
          waiter_info.self = waiter.baseMessgae.self.substr(0,40)
          this.setData({
            waiter_info: waiter.baseMessgae,
            label: waiter.tags,
            lessLabel: lessLabel,
            work_img: waiter.workImg,
            like_list: waiter.other
          })
        }

      })
      .catch((error) => {
        console.log(error)
      })
  },
  //用户点评
  comments: function () {
    var url = `${URL}/comments/${this.data.waiter_id}?current_page=detail&page=${this.data.page}`
    console.log(url)
    request.request(url, 'GET', {})
      .then(res => {
        console.log('详情点评', res)
        if (res.data.code === 1) {
          this.setData({
            detail_comments: res.data.data
          })
        }
      })
      .catch(e => {
        console.log(e)
      })
  },
  onLoad: function (res) {
    this.setData({
      waiter_id: res.id
    })
    
    //月嫂详情资料
    this.waiter_detail()
    //点评列表
    this.comments()
  },
})