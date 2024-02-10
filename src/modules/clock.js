const tunables = require('../util/tunables.js');

const WEATHERS = {
    0: 'Partly Cloudy',
    4: 'Misty',
    7: 'Mostly Cloudy',
    11: 'Clear',
    14: 'Misty',
    16: 'Clear',
    28: 'Misty',
    31: 'Clear',
    41: 'Hazy',
    45: 'Partly Cloudy',
    52: 'Misty',
    55: 'Cloudy',
    62: 'Foggy',
    66: 'Cloudy',
    72: 'Partly Cloudy',
    78: 'Foggy',
    82: 'Cloudy',
    92: 'Mostly Clear',
    104: 'Partly Cloudy',
    105: 'Drizzling',
    108: 'Partly Cloudy',
    125: 'Misty',
    128: 'Partly Cloudy',
    131: 'Raining',
    134: 'Drizzling',
    137: 'Cloudy',
    148: 'Misty',
    151: 'Mostly Cloudy',
    155: 'Foggy',
    159: 'Clear',
    176: 'Mostly Clear',
    196: 'Foggy',
    201: 'Partly Cloudy',
    220: 'Misty',
    222: 'Mostly Clear',
    244: 'Misty',
    246: 'Mostly Clear',
    247: 'Raining',
    250: 'Drizzling',
    252: 'Partly Cloudy',
    268: 'Misty',
    270: 'Partly Cloudy',
    272: 'Cloudy',
    277: 'Partly Cloudy',
    292: 'Misty',
    295: 'Partly Cloudy',
    300: 'Mostly Cloudy',
    306: 'Partly Cloudy',
    318: 'Mostly Cloudy',
    330: 'Partly Cloudy',
    337: 'Clear',
    367: 'Partly Cloudy',
    369: 'Raining',
    376: 'Drizzling',
    377: 'Partly Cloudy'
}
const WEEKDAYS = {
    0: 'Sunday',
    1: 'Monday',
    2: 'Tuesday',
    3: 'Wednesday',
    4: 'Thursday',
    5: 'Friday',
    6: 'Saturday'
}

function get_weekday() {
    let timestamp = Math.floor(new Date() / 1000);
    let weekday_correction = Math.floor((timestamp) / (365 * 2880)) % 7;
    let weekday = WEEKDAYS[Math.floor(timestamp / 2880 + 2 - weekday_correction) % 7];

    return weekday;
}

function get_hour_and_minute() {
    let timestamp = Math.floor(new Date() / 1000);
    let hour = Math.floor(timestamp / 120) % 24;
    let minute = Math.floor(timestamp / 2) % 60;
    let formatted_hour = hour < 10 ? '0' + hour : hour.toString();
    let formatted_minute = minute < 10 ? '0' + minute : minute.toString();

    return formatted_hour + ':' + formatted_minute;
}

function get_weather() {
    let snow_tunable = tunables.get_tunable('TURN_SNOW_ON_OFF');
    if (snow_tunable !== 'invalid' && snow_tunable) {
        return 'Snowy';
    }

    let halloween_tunable = tunables.get_tunable('SSP2WEATHER');
    if (halloween_tunable !== 'invalid' && halloween_tunable) {
        return 'Halloween';
    }

    let timestamp = Math.floor(new Date() / 1000);
    let weather_period = timestamp / 120 % 384;
    let weather = WEATHERS[Object.keys(WEATHERS).filter(i => i <= weather_period).reverse()[0]];

    return weather;
}


module.exports = {
    get_weekday,
    get_hour_and_minute,
    get_weather
};