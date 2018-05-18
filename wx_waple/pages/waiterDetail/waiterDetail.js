const app = getApp()

Page({
  data: {
    hasMask:false,
    indicatorDots: false,
    waiter_list: [
      { img: 'http://cdn.ayi800.com/image/1aedf6b47bda6cccda6602c4fd2de4b5.jpg', name: "马冬梅", price: '19200元/26天' },
      { img: 'http://cdn.ayi800.com/image/1aedf6b47bda6cccda6602c4fd2de4b5.jpg', name: "马冬梅", price: '19200元/26天' },
      { img: 'http://cdn.ayi800.com/image/1aedf6b47bda6cccda6602c4fd2de4b5.jpg', name: "马冬梅", price: '19200元/26天' },
      { img: 'http://cdn.ayi800.com/image/1aedf6b47bda6cccda6602c4fd2de4b5.jpg', name: "马冬梅", price: '19200元/26天' },
      { img: 'http://cdn.ayi800.com/image/1aedf6b47bda6cccda6602c4fd2de4b5.jpg', name: "马冬梅", price: '19200元/26天' }
    ],
  },

  onLoad: function () {

  },
  myCatchTouch: function () {
    console.log('stop user scroll it!');
    return;
  },
  picShow:function(){
    this.setData({
      hasMask: true
    })
  },
  picHide:function(){
    this.setData({
      hasMask: false
    })
  }
})