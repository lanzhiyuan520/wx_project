function time(){
    var date = new Date()
    var year = date.getFullYear()
    var month = date.getMonth()
    var day = date.getDate()
    var hours = date.getHours()
    var minute = date.getMinutes()
    var second = date.getSeconds()
    return year+'-'+month+'-'+ day
}
module.exports = {
    time
}