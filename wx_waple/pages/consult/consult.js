var toast = require('../common/toast')
var request = require('../common/request')
var URL = 'http://test.weixin.api.ayi800.com/api/wap'
var rsa = require('../common/rsa')
Component({
    properties:{
        flag: {
            type: Boolean, // 类型（必填），目前接受的类型包括：String, Number, Boolean, Object, Array, null（表示任意类型）
            value: '', // 属性初始值（可选），如果未指定则会根据类型选择一个
        },
        waiter_info:{
            type: Object,
            value: ''
        },
        city : {
            type : String,
            value : ''
        },
        userInfo : {
            type : Object,
            value : ''
        }
    },
    data: {
        // 这里是一些组件内部数据
        time:'',
        name:'',
        phone:'',
        success_model:true,
        offset:100,
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
                this.setData({
                    name : ''
                })
                return false
            }else if (!this.data.phone.replace(/(^\s*)|(\s*$)/g, "")){
                toast.toast('请输入手机号','none')
                this.setData({
                    phone : ''
                })
                return false
            }
            if (!(/^1[3|4|5|8][0-9]\d{4,8}$/.test(this.data.phone))){
                toast.toast('手机号格式错误','none')
                return false
            }
            var id = wx.setStorageSync('user_id')
            var url = `${URL}/appointment`
            var data = JSON.stringify({
                user_id : id,
                object_id : this.data.waiter_info?this.data.waiter_info.nanny_id:null,
                city : 184,
                note : this.data.time,
                customer_name : this.data.name,
                customer_phone : this.data.phone,
                nanny_type : 0
            })
            var encStr = rsa.sign(data)
            console.log(JSON.parse(data))
            request.request(url,'POST',encStr)
                .then(res=>{
                    console.log(res)
                    if (res.data.code === 1){
                        this.setData({
                            success_model : false,
                            offset : 100,
                            time:'',
                            name:'',
                            phone:''
                        })
                    }
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
        },
        bindTimeChange:function(e){
            this.setData({
                time : e.detail.value
            })
        }
    }
})