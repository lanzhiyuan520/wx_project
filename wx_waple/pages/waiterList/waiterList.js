Component({
    properties: {
        waiter_list: { // 属性名
            type: Array, // 类型（必填），目前接受的类型包括：String, Number, Boolean, Object, Array, null（表示任意类型）
            value: '', // 属性初始值（可选），如果未指定则会根据类型选择一个
        },
    },
    data: {
       

    },
    methods: {
        waiter_detailed:function(e){
            var id = e.currentTarget.dataset.idx
            wx.navigateTo({
                url : `../waiterDetail/waiterDetail?id=${id}`
            })
        }
    }
})