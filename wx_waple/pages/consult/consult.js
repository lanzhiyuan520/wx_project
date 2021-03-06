var toast = require('../common/toast')
var request = require('../common/request')
var URL = 'https://wx.youfumama.com/api/wap'
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
        },
        order_type:{
            type : String,
            value : ''
        },
        order_text:{
            type : String,
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
        msg:''
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
            var myreg = new RegExp("^1([358][0-9]|4[579]|66|7[0135678]|9[89])[0-9]{8}$");
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
            if (!myreg.test(this.data.phone)){
                toast.toast('手机号格式错误','none')
                return false
            }
            var id = wx.getStorageSync('user_id')
            var city = wx.getStorageSync('city')
            var url = `${URL}/appointment`
            var data = JSON.stringify({
                user_id : id,
                object_id : this.data.waiter_info?this.data.waiter_info.nanny_id:null,
                city,
                note : this.data.time,
                customer_name : this.data.name,
                customer_phone : this.data.phone,
                nanny_type : this.data.order_type
            })
            var encStr = rsa.sign(data)
            request.request(url,'POST',encStr)
                .then(res=>{
                    if (res.data.code === 1){
                        this.setData({
                            success_model : false,
                            offset : 100,
                            time:'',
                            name:'',
                            phone:'',
                            msg : res.data.message
                        })
                    }else{
                        this.setData({
                            offset : 100,
                            time:'',
                            name:'',
                            phone:''
                        })
                        toast.toast(res.data.message,'none',2000)
                    }
                })
        },
        order:function(){
            var login = wx.getStorageSync('login')
            if (login){
                this.setData({
                    phone : login.phone
                })
            }
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