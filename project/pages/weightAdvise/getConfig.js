/**
 * Created by xiabingwu on 2016/11/21.
 */
import Chart from '../canvas/chart'
export default function(canvasConfig,labels,data){
    var chartConfig = {
        type: 'line',
        offset:false,
        data: {
            labels: labels,
            datasets: [{
                label: "",
                backgroundColor: "#fee9e1",
                borderColor: "#ff6478",
                pointBackgroundColor:'#ffffff',
                pointHitRadius: 10,
                pointRadius:0,
                borderWidth: 2,
                data: data
            }]
        },
        options: {
            legend: {//
                displayFixed: false//如果隐藏legend请使用自定义的displayFixed: false，而不是display: false
            },
            layout:{
                padding:{
                  left: 0,
                  right: 25,
                  top: 0,
                  bottom: 20
                }
            },
            scaleBeginAtZero: true,
            responsive: true,//自适应设置为false
            title: {
                display: false,
                text: ''
            },
            animation: {
              onComplete: function () {
                var ctx = this.chart.ctx;
                console.log(ctx.fillText)
                ctx.font ="30px Verdana";
                ctx.fillText("hello",100,10)
                console.log(ctx)
              }
            },
            tooltips: {
                displayColors:true,//不显示小方框
                mode:'nearest',
                titleMarginBottom:15,
                callbacks: {
                    title:function(tooltipItem){
                        //return tooltipItem[0].xLabel+':'+tooltipItem[0].yLabel;
                        return tooltipItem[0].yLabel+"步";
                    },
                    label: function(tooltipItem) {
                        console.log(tooltipItem)
                        //return tooltipItem.yLabel+'';
                        return '';
                    }
                }
            },
            scales: {
                xAxes: [{
                    display: true,
                    gridLines: {
                      offsetGridLines:true,
                        //display:false,
                        //hideX:true,//这是自定义参数 业务需要添加隐藏X轴
                    },
                    scaleLabel: {
                      display: false,
                        labelString: ''
                    },
                    ticks: {
                        maxTicksLimit:7,
                        fontColor:'#9E9E9E',
                        fontSize: 6
                        // beginAtZero:false
                    }
                }],
                yAxes: [{
                    gridLines: {
                      drawBorder: false,
                        // display:true,
                        // hideY:false,//这是自定义参数 业务需要添加隐藏y轴
                    },
                    ticks: {
                        maxTicksLimit: 4,
                        fontColor:'#9E9E9E',
                        fontSize:8,
                        beginAtZero:true,
                        display:false
                    },
                    scaleLabel: {
                        display: true,
                        labelString: ''
                    }
                }]
            }
        }
    }
    return {
      chartConfig: chartConfig,
      canvasConfig: canvasConfig
    }
}