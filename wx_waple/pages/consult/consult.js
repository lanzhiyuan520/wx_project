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
            this.setData({
                success_model : false,
                offset : 100
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