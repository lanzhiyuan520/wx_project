 function request(url,method,data){
    return new Promise((resolve,reject)=>{
        wx.request({
            url,
            method,
            data:{data},
            success:function(res){
                resolve(res)
            },
            fail:function(error){
                reject(error)
            }
        })
    })
}

module.exports = {
    request
}