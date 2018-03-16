//格式化时间戳
function formatTime (date) {
  var times = []
  for (var i = 0; i < date.length; i++) {
    var time = new Date(parseInt(date[i]) * 1000)
    var d = time.getDate();
    times.push({
      time: d + '日',
    })
  }
  return times
}
module.exports = {
  formatTime
}