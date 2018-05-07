//运动背景
function drawProgressbg() {
    // 使用 wx.createContext 获取绘图上下文 context
    var ctx = wx.createCanvasContext('canvasProgressbg')
    ctx.setLineWidth(4);// 设置圆环的宽度
    ctx.setStrokeStyle('#eee'); // 设置圆环的颜色
    ctx.setLineCap('butt') // 设置圆环端点的形状
    ctx.beginPath();//开始一个新的路径
    ctx.arc(80, 80, 74, 0, 2 * Math.PI, false);
    //设置一个原点(100,100)，半径为90的圆的路径到当前路径
    ctx.stroke();//对当前路径进行描边
    ctx.draw();
}
//运动彩色
function drawCircle(step,proposal_step) {
    var context = wx.createCanvasContext('canvasProgress');
    // 设置渐变
    var gradient = context.createLinearGradient(100, 100, 40, 10);
    gradient.addColorStop("0", "#ff8094");
    gradient.addColorStop("1", "#ffaba4");
    context.setLineWidth(5);
    context.setStrokeStyle(gradient);
    context.setLineCap('butt')
    context.beginPath();
    // 参数step 为绘制的圆环周长，从0到2为一周 。 -Math.PI / 2 将起始角设在12点钟位置 ，结束角 通过改变 step 的值确定
    context.arc(80, 80, 74, -Math.PI / 2, (step / proposal_step * 2) * Math.PI - Math.PI / 2, false);
    context.stroke();
    context.draw()

}
 function drawProgressbgW() {
    // 使用 wx.createContext 获取绘图上下文 context
    var ctx = wx.createCanvasContext('canvasProgressbg-weight')
    ctx.setLineWidth(4);// 设置圆环的宽度
    ctx.setStrokeStyle('#eee'); // 设置圆环的颜色
    ctx.setLineCap('butt') // 设置圆环端点的形状
    ctx.beginPath();//开始一个新的路径
    ctx.arc(80, 80, 74, 0, 2 * Math.PI, false);
    //设置一个原点(100,100)，半径为90的圆的路径到当前路径
    ctx.stroke();//对当前路径进行描边
    ctx.draw();
}
 function drawCircleW(weight,proposal_weight) {
    var context = wx.createCanvasContext('canvasProgress-weight');
    // 设置渐变
    var gradient = context.createLinearGradient(100, 100, 40, 10);
    gradient.addColorStop("0", "#ff8094");
    gradient.addColorStop("1", "#ffaba4");

    context.setLineWidth(5);
    context.setStrokeStyle(gradient);
    context.setLineCap('butt')
    context.beginPath();
    // 参数step 为绘制的圆环周长，从0到2为一周 。 -Math.PI / 2 将起始角设在12点钟位置 ，结束角 通过改变 step 的值确定
    context.arc(80, 80, 74, -Math.PI / 2, (weight / proposal_weight * 2) * Math.PI - Math.PI / 2, false);
    context.stroke();
    context.draw()
}
module.exports = {
    drawProgressbg,
    drawCircle,
    drawProgressbgW,
    drawCircleW
}