const app = getApp()

Page({
  data: {
    hasMask:false,
    indicatorDots: false,
    isFold:true,
    lableFold:true,
    waiter_list: [
      { img: 'http://cdn.ayi800.com/image/1aedf6b47bda6cccda6602c4fd2de4b5.jpg', name: "马冬梅", price: '19200元/26天' },
      { img: 'http://cdn.ayi800.com/image/1aedf6b47bda6cccda6602c4fd2de4b5.jpg', name: "马冬梅", price: '19200元/26天' },
      { img: 'http://cdn.ayi800.com/image/1aedf6b47bda6cccda6602c4fd2de4b5.jpg', name: "马冬梅", price: '19200元/26天' },
      { img: 'http://cdn.ayi800.com/image/1aedf6b47bda6cccda6602c4fd2de4b5.jpg', name: "马冬梅", price: '19200元/26天' },
      { img: 'http://cdn.ayi800.com/image/1aedf6b47bda6cccda6602c4fd2de4b5.jpg', name: "马冬梅", price: '19200元/26天' }
    ],
    arr: [1, 2, 3, 4, 5],
    label: ["催乳好 1", "月子餐很棒 4", "干净 2", "儿歌歌神 4", "月子餐很棒 4", "干净 2", "儿歌歌神 4", "干净 2","月子餐很棒 4", "干净 2","催乳好 1", "月子餐很棒 4"],
    lessLabel:[],
    index:0
  },

  onLoad: function () {
    this.setData({
      lessLabel: this.data.label.slice(0,6)
    })
  },
  // 防止遮罩的穿透
  myCatchTouch: function () {
    console.log('stop user scroll it!');
    return;
  },
  // 图片展示的显示和隐藏
  picShow:function(e){
    var index = e.currentTarget.dataset['index'];
    this.setData({
      hasMask: true,
      index:index
    })
  },
  picHide:function(){
    this.setData({
      hasMask: false
    })
  },
  // 文字展开隐藏
  flodFn:function(){
    this.setData({
      isFold: !this.data.isFold
    })
  },
  // 印象标签显示隐藏
  lableShow:function(){
    
    this.setData({
      lableFold: !this.data.lableFold,
    })
  },
  // 展示加载更多
  extendMore:function(){
    wx.showLoading({
      title: '加载中'
    })
    // 隐藏
    setTimeout(function () {
      wx.hideLoading()
    }, 2000)
  }
})