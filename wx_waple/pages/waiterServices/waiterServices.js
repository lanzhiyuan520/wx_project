const app = getApp()
var sideBarstart
var request = require('../common/request')
var Date = require('../common/Date')
var URL = app.globalData.URL
Page({
    onShareAppMessage: function () {
        return {
            title: '专业月嫂服务，上万家庭选择！',
            path: '/pages/waiterServices/waiterServices'
        }
    },
    data: {
        work_list:[
            {time:'06:00-07:00',text1:'月嫂起床洗漱，准备早餐',text2:'清理宝宝卫生、测体温、喂奶、拍嗝',text3:'与宝宝亲子互动',text4:'收拾厨房用具、产妇用具'},
            {time:'8:00-10:00',text1:'产妇恶露观察，伤口观察，做必要的清理消毒',text2:'根据产妇恢复情况，做轻微形体恢复训练',text3:'清理宝宝卫生、喂奶、拍嗝、给宝宝做脐带消毒',text4:'给产妇准备一次加餐'},
            {time:'10:00-12:00',text1:'给宝宝做早教',text2:'整理产妇和宝宝用具',text3:'清洗衣物',text4:'准备午餐'},
            {time:'12:00-13:00',text1:'清理宝宝卫生、喂奶、拍嗝',text2:'给宝宝做早教',text3:'给看黑白点卡，促进宝宝的发育',text4:'哄宝宝午睡'},
            {time:'13:00-15:00',text1:'清理宝宝卫生，喂奶、拍嗝、给宝宝做早教',text2:'产妇加餐',text3:'产妇恶露观察，乳房观察',text4:'伤口消毒，乳房护理等'},
            {time:'16:30-20:00',text1:'准备晚餐',text2:'换尿布、清洗、喂奶，拍嗝',text3:'收拾厨房及用具，打扫卫生',text4:'给宝宝洗澡、做抚触、按摩、做脐带消毒'},

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
    action:function(){
        var id = wx.getStorageSync('user_id')
        var url = `${URL}/actions`
        var data = {
            user_id : this.data.id,
            path : 'waiterServeices',
            page_type : 1,
            request_time : Date.time()
        }
        request.request(url,'POST',data)
            .then(res=>{
                console.log('用户行为',res)
            })
    },
    onLoad: function () {
        this.action()
    }
})