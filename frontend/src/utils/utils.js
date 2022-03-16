const GetTimeDifference = (time) => {
    time = new Date(time)
    var userTimezoneOffset = time.getTimezoneOffset() * 60000;
    let difference = new Date(time.getTime() + userTimezoneOffset) - new Date();
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

export default GetTimeDifference;