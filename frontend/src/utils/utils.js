const GetTimeLeft = (endTime) => {
    endTime = new Date(endTime)
    var userTimezoneOffset = endTime.getTimezoneOffset() * 60000;
    let difference = new Date(endTime.getTime() + userTimezoneOffset) - new Date();
    console.log(new Date());
    console.log(new Date(endTime.getTime() + userTimezoneOffset));
    let timeLeft = {};

    if (difference <= 0) {
        return timeLeft
    }

    timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60)
    };

    return timeLeft;
}

export default GetTimeLeft;