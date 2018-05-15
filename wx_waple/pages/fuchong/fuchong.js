const app = getApp()

Page({
    data: {
        server_five_list:[
            {img:'http://cdn.ayi800.com/image/png/wx_waple_service_five_item1%E7%A6%8F%E5%AE%A0%E5%A5%97%E9%A4%90_03.png',text:'营养师指导'},
            {img:'http://cdn.ayi800.com/image/png/wx_waple_service_five_item3%E6%9C%88%E5%AD%90%E6%9C%8D%E5%8A%A12@2x.png',text:'护士上门'},
            {img:'http://cdn.ayi800.com/image/png/wx_waple_service_five_item4%E6%9C%88%E5%AD%90%E6%9C%8D%E5%8A%A13@2x.png',text:'中医调理'},
            {img:'http://cdn.ayi800.com/image/png/wx_waple_service_five_item5%E6%9C%88%E5%AD%90%E6%9C%8D%E5%8A%A14@2x.png',text:'母乳指导'},
            {img:'http://cdn.ayi800.com/image/png/wx_waple_service_five_item6%E6%9C%88%E5%AD%90%E6%9C%8D%E5%8A%A15@2x.png',text:'母婴护理'}
        ],
        service_list:[
            {title:'营养师在线指导',content:'营养师在线电话指导，帮助妈妈和宝宝解决产前产后健康饮食',img_list:[{img:'http://cdn.ayi800.com/image/png/wx_waple_service_five_item2%E7%A6%8F%E5%AE%A0%E5%A5%97%E9%A4%90_03.png',text:'孕期营养指导'},{img:'http://cdn.ayi800.com/image/png/wx_waple_service_five_1_1%E8%90%A5%E5%85%BB%E5%B8%882@2x.png',text:'孕期体重管理'},{img:'http://cdn.ayi800.com/image/png/wx_waple_service_five_1_3%E8%90%A5%E5%85%BB%E5%B8%883@2x.png',text:'新生儿发育指导'},{img:'http://cdn.ayi800.com/image/png/wx_waple_service_five_1_4%E8%90%A5%E5%85%BB%E5%B8%884@2x.png',text:'产后妈妈恢复指导'}]},
            {title:'护士上门服务',content:'专业护士团队定期三次产前产后上门服务和在线指导，全程护佑妈妈和宝宝的健康',img_list:[{img:'http://cdn.ayi800.com/image/png/wx_waple_service_five_2_1%E6%8A%A4%E5%A3%AB%E4%B8%8A%E9%97%A81@2x.png',text:'母婴房环境消毒'},{img:'http://cdn.ayi800.com/image/png/wx_waple_service_five_2_2%E6%8A%A4%E5%A3%AB%E4%B8%8A%E9%97%A82@2x.png',text:'宝宝黄疸检测'},{img:'http://cdn.ayi800.com/image/png/wx_waple_service_five_2_3%E6%8A%A4%E5%A3%AB%E4%B8%8A%E9%97%A83@2x.png',text:'母婴健康筛查'},{img:'http://cdn.ayi800.com/image/png/wx_waple_service_five_2_4%E6%8A%A4%E5%A3%AB%E4%B8%8A%E9%97%A84@2x.png',text:'母婴护理代教'}]},
            {title:'中医体质调养',content:'有福妈妈和雷允上结合传统中医养生理念和现代医学技术，根据新妈妈的体质制定的中医调养方案',img_list:[{img:'http://cdn.ayi800.com/image/png/wx_waple_service_five_3_1%E4%B8%AD%E5%8C%BB%E4%BD%93%E8%B4%A81@2x.png',text:'百年中医品牌'},{img:'http://cdn.ayi800.com/image/png/wx_waple_service_five_3_2%E4%B8%AD%E5%8C%BB%E4%BD%93%E8%B4%A82@2x.png',text:'中医体质辨识'},{img:'http://cdn.ayi800.com/image/png/wx_waple_service_five_3_3%E4%B8%AD%E5%8C%BB%E4%BD%93%E8%B4%A83@2x.png',text:'四维膳食调养'},{img:'http://cdn.ayi800.com/image/png/wx_waple_service_five_3_4%E4%B8%AD%E5%8C%BB%E4%BD%93%E8%B4%A84@2x.png',text:'中医调理恢复'}]},
            {title:'母乳喂养指导',content:'IBCLC国际认证国际泌乳顾问两次上门服务帮助新手妈妈解决母乳喂养问题',img_list:[{img:'http://cdn.ayi800.com/image/png/wx_waple_service_five_4_1%E6%AF%8D%E4%B9%B3%E5%96%82%E5%85%BB1@2x.png',text:'母乳喂养',text2:'评估指导'},{img:'http://cdn.ayi800.com/image/png/wx_waple_service_five_4_2%E6%AF%8D%E4%B9%B3%E5%96%82%E5%85%BB2@2x.png',text:'宝宝出生',text2:'哺乳策略'},{img:'http://cdn.ayi800.com/image/png/wx_waple_service_five_4_3%E6%AF%8D%E4%B9%B3%E5%96%82%E5%85%BB3@2x.png',text:'乳头疼痛',text2:'创伤处理'},{img:'http://cdn.ayi800.com/image/png/wx_waple_service_five_4_4%E6%AF%8D%E4%B9%B3%E5%96%82%E5%85%BB4@2x.png',text:'奶多/奶少',text2:'应对策略'}]},
            {title:'月嫂24h贴心服务',content:'严格考核，持证上岗，仅30%录取率的母婴护理师，照顾妈妈和宝宝的月子',img_list:[{img:'http://cdn.ayi800.com/image/png/wx_waple_service_five_5_1%E8%B4%B4%E5%BF%83%E6%9C%8D%E5%8A%A11@2x.png',text:'42天住家服务'},{img:'http://cdn.ayi800.com/image/png/wx_waple_service_five_5_2%E8%B4%B4%E5%BF%83%E6%9C%8D%E5%8A%A12@2x.png',text:'营养月子餐制作'},{img:'http://cdn.ayi800.com/image/png/wx_waple_service_five_5_3%E8%B4%B4%E5%BF%83%E6%9C%8D%E5%8A%A13@2x.png',text:'日常母婴护理'},{img:'http://cdn.ayi800.com/image/png/wx_waple_service_five_5_4%E8%B4%B4%E5%BF%83%E6%9C%8D%E5%8A%A14@2x.png',text:'在线智能督导'}]},
        ]
    },
    onLoad: function () {

    }
})