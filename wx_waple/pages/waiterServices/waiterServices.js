const app = getApp()
var sideBarstart
Page({
    data: {
        left:0,
        work_list:[
            {},
            {},
            {},
            {},
            {},
            {}
        ],
        active:0,
        current:0
    },
    pageTouchStartHandler:function(e){
        sideBarstart = e.changedTouches[0].pageX
    },
    //手指抬起判断是左滑还是右滑
    pageTouchEndHandler: function (e) {
        var touchend = e.changedTouches[0].pageX
        // slip left
        if (touchend - sideBarstart < -50) {
            if (this.data.active > this.data.work_list.length-1){
                return false
            }
           var offset_left = this.data.active * 520
            this.setData({
                active : this.data.active+1,
                left : -offset_left
            })
        }
        // slip right
        if (touchend - sideBarstart > 50) {
            if(this.data.active < 2){
                console.log(this.data.active)
                return false
            }
            var offset_right = this.data.left + 520

            this.setData({
                active : this.data.active-1,
                left : offset_right
            })
        }
    },
    change_c:function(e){
        this.setData({
            current : e.detail.current
        })
    },
    onLoad: function () {

    }
})