Component({
    data: {
        // 这里是一些组件内部数据
        time:'',
        name:'',
        phone:'',
        hidden_input_model:true
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

        },
        order:function(){
            this.setData({
                hidden_input_model : false
            })
        },
        close:function(){
            this.setData({
                hidden_input_model : true
            })
        }
    }
})