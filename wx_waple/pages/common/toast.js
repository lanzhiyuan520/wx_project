function toast(title,icon){
    wx.showToast({
        title,
        icon,
        duration: 1000,
        mask:true
    })
}
module.exports = {
    toast
}