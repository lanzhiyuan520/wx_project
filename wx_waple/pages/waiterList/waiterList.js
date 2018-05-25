Component({
    properties: {
        waiter_list: { // 属性名
            type: Array, // 类型（必填），目前接受的类型包括：String, Number, Boolean, Object, Array, null（表示任意类型）
            value: '', // 属性初始值（可选），如果未指定则会根据类型选择一个
        },
    },
    data: {
        // 这里是一些组件内部数据

    },
    methods: {
        waiter_detailed:function(e){
            wx.navigateTo({
                url : '../waiterDetail/waiterDetail'
            })
        },
        // onPullDownRefresh: function () {
        //   console.log('下拉刷新')
        //   setTimeout(() => {
        //     toast.toast('刷新成功', 'none')
        //     wx.stopPullDownRefresh()

        //   }, 1500)
        // }
    }
})