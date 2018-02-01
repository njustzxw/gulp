function last_time() {
    var now = new Date();
    var somedate = new Date("Jan 1. 2020");
    console.log(now);
    console.log(somedate);
    if (now < somedate) {
        var times = somedate - now;
        console.log(times);
        var seconds = parseInt(times / 1000 % 60, 10); //获取秒数
        var minutes = parseInt(times / 1000 / 60 % 60, 10); //获取分钟数
        var hours = parseInt(times / 1000 / 60 / 60 % 24, 10); //获取小时数
        var days = parseInt(times / 1000 / 60 / 60 / 24, 10); //获取天数
        var leftime = document.getElementById("times");
        leftime.innerHTML = days + "天" + hours + "小时" + minutes + "分" + seconds + "秒";
        fag = setTimeout(last_time, 1000) //zxw  一秒钟后继续执行本方法
    } else {
        alert("倒计时失败！");
        clearTimeout(aaa) //zxw   如果时间到了，则清除计时
    }
}