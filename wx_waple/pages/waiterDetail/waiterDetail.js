const app = getApp()
var URL = app.globalData.URL
var request = require('../common/request')
var toast = require('../common/toast')
Page({
  data: {
    hasMask: false,
    indicatorDots: false,
    isFold: true,
    lableFold: true,
    work_img: [],
    label: [],
    lessLabel: [],
    index: 0,
    waiter_id: null,
    waiter_info: {},
    tags: [],
    page: 1,
    like_list: [],
    detail_comments: [],
    comments:[],
    less_content:'',
    active:null,
    show:false,
    reviewIndex:0
  },
  // 防止遮罩的穿透
  myCatchTouch: function () {
    console.log('stop user scroll it!');
    return;
  },
  // 图片展示的显示和隐藏
  picShow: function (e) {
    var index = e.currentTarget.dataset['index'];
    var source = e.currentTarget.dataset['source'];
    this.setData({
      hasMask: true,
      index: index,
      work_img: source
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
    this.setData({
      page: this.data.page+1
    })
    this.comments()
    wx.showLoading({
      title: '加载中'
    })
    
  },
    click:function(e){
        if (this.data.show){
            if (e.currentTarget.dataset.id == this.data.active){
                this.setData({
                    show : false,
                    active : null
                })
            }else{
                this.setData({
                    show : true,
                    active : e.currentTarget.dataset.id
                })
            }
        }else {
            this.setData({
                show : true,
                active : e.currentTarget.dataset.id
            })
        }

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
          var less_content = waiter.baseMessgae.self.substr(0,38);
          this.setData({
            waiter_info: waiter.baseMessgae,
            label: waiter.tags,
            lessLabel: lessLabel,
            less_content: less_content,
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
    request.request(url, 'GET', {})
      .then(res => {
        console.log('详情点评', res)
        if (res.data.data.length!==0) {
          this.data.comments.push(...res.data.data)
          this.setData({
            detail_comments: this.data.comments
          })
          wx.hideLoading()
        }else{
          // 隐藏
          setTimeout(function () {
            wx.hideLoading()
          }, 2000)
          toast.toast('没有更多数据了', 'none')
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
  }
})