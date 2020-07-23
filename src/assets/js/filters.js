function addZero(n){
    return n<10?'0'+n:''+n
}
/**
 * 时间格式化
 */
export let dateFilter = (timv,type) => {
    if (!timv){
        return '';
    }
    var time=new Date(Number(timv*1000));
    var   year=time.getFullYear();
    //year=year.substring(1);
    var   month=addZero(time.getMonth()+1);
    var   date=addZero(time.getDate());
    var   hour=addZero(time.getHours());
    var   minute=addZero(time.getMinutes());
    var   second=addZero(time.getSeconds());
    var result='';
    switch (type){
        case 0: // 01-05
            result = month+'-'+date;
            break
        case 1: // 11:12
            result = minute+'-'+second;
            break
        case 2: // 2015 - 01 - 05
            result = year+' - '+month+' - '+date;
            break
        case 3: // 2015-01-05 11:12
            result = year+'-'+month+'-'+date+' '+hour+':'+minute;
            break
        case 4:// 2015-01-05 11:12:06
            result = year+'-'+month+'-'+date+' '+hour+':'+minute+':'+second;
            break
        case 5:// 01-05 11:12:06
            result = month+'-'+date+' '+hour+':'+minute;
            break
        case 6: // 2015-01-05
            result = year+'-'+month+'-'+date;
            break
    }

    return  result;

}
export let dateFilter2 = (timv) => {
    var time2=Number(timv*1000);
    var tim1=new Date();
    var time=Number(tim1)-time2;
    var d = Math.floor(time/86400000);
    time %= 86400000;
    var h = Math.floor(time/3600000);
    time %= 3600000;
    var m = Math.floor(time/60000);
    time %= 60000;
    var s = Math.floor(time/1000);
    var ruslt='';
    if(d>0){
        ruslt=d+'天';
    }
    if(d==0 && h>0){
        ruslt=h+'小时';
    }
    if(d==0&& h==0&&m>0){
        ruslt=m+'分钟';
    }
    if(d==0&& h==0&&m==0&&s>0){
        ruslt=s+'秒';
    }
    return  ruslt;

}

export let formatSeconds=(value) => {
    var theTime = parseInt(value);// 秒
    var theTime1 = 0;// 分
    var theTime2 = 0;// 小时
    if(theTime > 60) {
        theTime1 = parseInt(theTime/60);
        theTime = parseInt(theTime%60);
        if(theTime1 > 60) {
            theTime2 = parseInt(theTime1/60);
            theTime1 = parseInt(theTime1%60);
        }
    }
    var result = "00:"+addZero(parseInt(theTime));
    if(theTime1 > 0) {
        result = addZero(parseInt(theTime1))+":"+addZero(parseInt(theTime));
    }
    if(theTime2 > 0) {
        result = parseInt(theTime2)+":"+addZero(parseInt(theTime1))+":"+addZero(parseInt(theTime));
    }
    return result;
}

export let sou= (va) => {
    var result='';
    if(va>9999){
        result=9999;
    }
    if(va<9999){
        result=va;
    }
    return result;
}

export let formatSeconda=(value) => {
    var theTime = parseInt(value);// 秒
    var theTime1 = 0;// 分
    var theTime2 = 0;// 小时
    if(theTime > 60) {
        theTime1 = parseInt(theTime/60);
        theTime = parseInt(theTime%60);
        if(theTime1 > 60) {
            theTime2 = parseInt(theTime1/60);
            theTime1 = parseInt(theTime1%60);
        }
    }
    var result = "已结束";
    if(theTime1 > 0) {
        result = '00:'+addZero(parseInt(theTime1));
    }
    if(theTime2 > 0) {
        result = addZero(parseInt(theTime2))+":"+addZero(parseInt(theTime1));
    }
    return result;
}
