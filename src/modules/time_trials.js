const misc = require('../util/misc.js');
const zones = require('../data/zones.json');

function get_rc_time_trial_location() {
    let index = (misc.get_seed_value() % 14n);

    switch (index) {
        case 0n:
            return 0;
        case 1n:
            return 9;
        case 2n:
            return 11;
        case 3n:
            return 12;
        case 4n:
            return 3;
        case 5n:
            return 7;
        case 6n:
            return 4;
        case 7n:
            return 1;
        case 8n:
            return 10;
        case 9n:
            return 13;
        case 10n:
            return 6;
        case 11n:
            return 5;
        case 12n:
            return 8;
        case 13n:
            return 2;
    }

    return -1;
}

function get_bike_time_trial_location() {
    let index = (misc.get_seed_value() % 14n);

    switch (index) {
        case 0n:
            return 6;
        case 1n:
            return 0;
        case 2n:
            return 5;
        case 3n:
            return 2;
        case 4n:
            return 3;
        case 5n:
            return 12;
        case 6n:
            return 8;
        case 7n:
            return 13;
        case 8n:
            return 1;
        case 9n:
            return 11;
        case 10n:
            return 10;
        case 11n:
            return 4;
        case 12n:
            return 7;
        case 13n:
            return 9;
    }

    return -1;
}

function create_rc_time_trial_message() {
    let loc = get_rc_time_trial_location();
    let message = `- Location: **#${loc + 1}, ${zones.rc_time_trial[loc]}**`;

    return message;
}

function create_bike_time_trial_message() {
    let loc = get_bike_time_trial_location();
    let message = `- Location: **#${loc + 1}, ${zones.bike_time_trial[loc]}**`;

    return message;
}

module.exports = {
    create_rc_time_trial_message,
    create_bike_time_trial_message
};