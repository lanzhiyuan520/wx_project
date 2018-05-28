function toast(title,icon,time){
    wx.showToast({
        title,
        icon,
        duration: time?time:1000,
        mask:true
    })
}
module.exports = {
    toast
}