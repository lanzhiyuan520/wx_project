var toast = require('../common/toast')
Component({
    data: {
        // 这里是一些组件内部数据
        time:'',
        name:'',
        phone:'',
        success_model:true,
        offset:100
    },
    methods: {
        // 这里是一个自定义方法
        time: function(e){
            this.setData({
                time : e.detail.value
            })
        },
        name:function(e){
            this.setData({
                name : e.detail.value
            })
        },
        phone:function(e){
            this.setData({
                phone : e.detail.value
            })
        },
        submit:function(){
            if (!this.data.time.replace(/(^\s*)|(\s*$)/g, "")){
                toast.toast('请输入预约时间','none')
                return false
            }else if (!this.data.name.replace(/(^\s*)|(\s*$)/g, "")){
                toast.toast('请输入名字','none')
                return false
            }else if (!this.data.phone.replace(/(^\s*)|(\s*$)/g, "")){
                toast.toast('请输入手机号','none')
                return false
            }
            if (!(/^1[3|4|5|8][0-9]\d{4,8}$/.test(this.data.phone))){
                toast.toast('手机号格式错误','none')
                return false
            }
            this.setData({
                success_model : false,
                offset : 100,
                time:'',
                name:'',
                phone:''
            })
        },
        order:function(){
            this.setData({
                offset : 0
            })
        },
        close:function(){
            this.setData({
                offset : 100
            })
        },
        close_success_model:function(){
            this.setData({
                success_model : true,
                offset : 100
            })
        }
    }
})