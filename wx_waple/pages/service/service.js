//index.js
//获取应用实例
const app = getApp()

Page({
    data: {
        service_list:[
            {img:'http://cdn.ayi800.com/image/png/wx_waple_service_item1icon1@2x.png',title:'严格筛选，质量把关',content:'月嫂和育儿嫂除三证齐全外，还需体检和背景调查，通过率仅为30%'},
            {img:'http://cdn.ayi800.com/image/png/wx_waple_service_item2icon2@2x.png',title:'价格透明，无中介费',content:'合格的服务应该有合理的价格，价格标准透明，没有任何中间费用'},
            {img:'http://cdn.ayi800.com/image/png/wx_waple_service_item3icon3@2x.png',title:'三大保障，全程护航',content:'试工、保险，更首创保证金制度多重手段保障您的权益不受侵害！'},
            {img:'http://cdn.ayi800.com/image/png/wx_waple_service_item4icon4@2x.png',title:'智能督导，确保无虞',content:'独创智能管控系统，全程监督，全程保证上户品质和突发问题处理。'}
        ]
    },
    onLoad: function () {

    }
})