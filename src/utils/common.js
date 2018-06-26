//滚动加载
export function scrollLoadMore(callback) {
    setTimeout(() => {
        window.addEventListener('scroll', () => {loadMore(callback)})
    }, 200)
}
//取消滚动监听
export function removeScrollListener() {
    window.removeEventListener('scroll',loadMore);
}
//滚动加载
function loadMore(callback) {
    const scrollPos = getScrollPos();
    if ((scrollPos + document.body.clientHeight) === document.body.scrollHeight) {
        callback && callback();
    }
}

//获取滚动位置
export function getScrollPos(){
    let scrollPos = 0;
    if (typeof window.pageYOffset !== 'undefined') {
        scrollPos = window.pageYOffset;
    }
    else if (typeof document.compatMode !== 'undefined' && document.compatMode !== 'BackCompat') {
        scrollPos = document.documentElement.scrollTop;
    }
    else if (typeof document.body !== 'undefined') {
        scrollPos = document.body.scrollTop;
    }
    return scrollPos;
}
//获取时间
export function getFormatTime(stampTime = (new Date()).getTime(),string = 'yyyy-MM-dd'){
    Date.prototype.Format = function (fmt) {
        var o = {
            "M+": this.getMonth() + 1,         //月份
            "d+": this.getDate(),          //日
            "h+": this.getHours(),          //小时
            "m+": this.getMinutes(),         //分
            "s+": this.getSeconds(),         //秒
            "q+": Math.floor((this.getMonth() + 3) / 3), //季度
            "S": this.getMilliseconds()       //毫秒
        };
        if (/(y+)/.test(fmt))
            fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (var k in o)
            if (new RegExp("(" + k + ")").test(fmt))
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1)
                    ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        return fmt;
    };
    return new Date(stampTime).Format(string);
}
//重建日期格式
export function reBuildDate(date){
    const year = date.slice(0,4);
    const month = date.slice(4,6);
    const day = date.slice(6,8);
    return `${year}-${month}-${day}`
}
//重建时间格式
export function reBuildTime(date){
    const hour = date.slice(0,2);
    const min = date.slice(2,4);
    const second = date.slice(4,6);
    return `${hour}:${min}:${second}`
}
