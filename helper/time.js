const currentTime = () => {
    const now = new Date();
    
    let month = now.getMonth() + 1;
    month = month.toString().length == 1 ? '0' + month : month;

    let date = now.getDate();
    date = date.toString().length == 1 ? '0' + date : date;

    let hours = now.getHours();
    hours = hours.toString().length == 1 ? '0' + hours : hours;

    let minutes = now.getMinutes();
    minutes = minutes.toString().length == 1 ? '0' + minutes : minutes;

    let seconds = now.getSeconds();
    seconds = seconds.toString().length == 1 ? '0' + seconds : seconds;

    return `${now.getFullYear()}-${month}-${date} ${hours}:${minutes}:${seconds}`;
};

const expiredTime = (day) => {
    let now = new Date();
    let longExpaired = (1000 * 60 * 60 * 24) * day;
    now = now.getTime() + longExpaired;
    let expaired = new Date(now);

    let month = expaired.getMonth() + 1;
    month = month.toString().length == 1 ? '0' + month : month;

    let date = expaired.getDate();
    date = date.toString().length == 1 ? '0' + date : date;

    let hours = expaired.getHours();
    hours = hours.toString().length == 1 ? '0' + hours : hours;

    let minutes = expaired.getMinutes();
    minutes = minutes.toString().length == 1 ? '0' + minutes : minutes;

    let seconds = expaired.getSeconds();
    seconds = seconds.toString().length == 1 ? '0' + seconds : seconds;

    return `${expaired.getFullYear()}-${month}-${date} ${hours}:${minutes}:${seconds}`;    
};

const generateCodePayment = () => {
    let time = new Date();
    
    let month = time.getMonth() + 1;
    month = month.toString().length == 1 ? '0' + month : month;

    let date = time.getDate();
    date = date.toString().length == 1 ? '0' + date : date;

    let hours = time.getHours();
    hours = hours.toString().length == 1 ? '0' + hours : hours;

    let minutes = time.getMinutes();
    minutes = minutes.toString().length == 1 ? '0' + minutes : minutes;

    let seconds = time.getSeconds();
    seconds = seconds.toString().length == 1 ? '0' + seconds : seconds;

    return `${time.getFullYear()}${month}${date}${hours}${minutes}${seconds}`;
} 

checkExpiredTime = (expiredTime) => {
    let expiredIn = new Date(expiredTime);
    expiredIn = expiredIn.getTime();
    let now = new Date();
    now = now.getTime();
    return expiredIn > now ? true : false;
};

module.exports.currentTime = currentTime;
module.exports.expiredTime = expiredTime;
module.exports.generateCodePayment = generateCodePayment;
module.exports.checkExpiredTime = checkExpiredTime;