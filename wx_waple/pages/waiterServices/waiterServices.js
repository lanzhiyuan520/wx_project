const app = getApp()
var sideBarstart
Page({
    data: {
        left:-520,
        work_list:[
            {},
            {},
            {},
            {},
            {},
        ],
        active:2
    },
    pageTouchStartHandler:function(e){
        sideBarstart = e.changedTouches[0].pageX
    },
    //手指抬起判断是左滑还是右滑
    pageTouchEndHandler: function (e) {
        var touchend = e.changedTouches[0].pageX
        // slip left
        if (touchend - sideBarstart < -50) {

           var offset_left = this.data.active * 520
            this.setData({
                active : this.data.active+1,
                left : -offset_left
            })
        }
        // slip right
        if (touchend - sideBarstart > 50) {
            if(this.data.active <= 1){
                console.log(this.data.active)
                this.setData({
                    active : 5,
                    left : -2080
                })
                return false
            }
            var offset_right = this.data.left + 520

            this.setData({
                active : this.data.active-1,
                left : offset_right
            })
        }
    },
    onLoad: function () {

    }
})