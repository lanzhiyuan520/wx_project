const app = getApp()
var sideBarstart
Page({
    data: {
        work_list:[
            {},
            {},
            {},
            {},
            {},
            {}
        ],
        active:0,
        current:0,
        server_flow:[
            {img:'http://cdn.ayi800.com/image/png/wx_waple_service_flow1%E7%94%B5%E8%AF%9D@2x.png',text:'电话沟通',arrow:'http://cdn.ayi800.com/image/png/wx_waple_service_arrow1%E6%9C%88%E5%AB%82%E6%9C%8D%E5%8A%A1_03.png'},
            {img:'http://cdn.ayi800.com/image/png/wx_waple_service_flow2%E8%81%94%E7%B3%BB%E4%BA%BA@2x.png',text:'育儿嫂面试',arrow:'http://cdn.ayi800.com/image/png/wx_waple_service_arrow1%E6%9C%88%E5%AB%82%E6%9C%8D%E5%8A%A1_03.png'},
            {img:'http://cdn.ayi800.com/ERP_%E5%90%88%E5%90%8C%E5%8F%B7@2x.png',text:'签订合同',arrow:'http://cdn.ayi800.com/image/png/wx_waple_service_arrow1%E6%9C%88%E5%AB%82%E6%9C%8D%E5%8A%A1_03.png'},
            {img:'http://cdn.ayi800.com/image/png/wx_waple_service_flow4%E4%B8%8A%E9%97%A8%E6%9C%8D%E5%8A%A1-%E7%BA%BF@2x.png',text:'上门服务',arrow:'http://cdn.ayi800.com/image/png/wx_waple_service_arrow1%E6%9C%88%E5%AB%82%E6%9C%8D%E5%8A%A1_03.png'},
            {img:'http://cdn.ayi800.com/image/png/wx_waple_service_flow3%E5%A5%BD%E8%AF%84@2x.png',text:'服务评价'}
        ],
        service_list:[
            {img:'http://cdn.ayi800.com/image/png/wx_waple_service_item1icon1@2x.png',title:'严格筛选，质量把关',content:'月嫂和育儿嫂除三证齐全外，还需体检和背景调查，通过率仅为30%'},
            {img:'http://cdn.ayi800.com/image/png/wx_waple_service_item2icon2@2x.png',title:'价格透明，无中介费',content:'合格的服务应该有合理的价格，价格标准透明，没有任何中间费用'},
            {img:'http://cdn.ayi800.com/image/png/wx_waple_service_item3icon3@2x.png',title:'三大保障，全程护航',content:'试工、保险，更首创保证金制度多重手段保障您的权益不受侵害！'},
            {img:'http://cdn.ayi800.com/image/png/wx_waple_service_item4icon4@2x.png',title:'智能督导，确保无虞',content:'独创智能管控系统，全程监督，全程保证上户品质和突发问题处理。'}
        ]
    },
    change_c:function(e){
        this.setData({
            current : e.detail.current
        })
    },
    onLoad: function () {

    }
})