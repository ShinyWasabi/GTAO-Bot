const misc = require('../util/misc.js');
const zones = require('../data/zones.json');

function get_madrazo_hit_location() {
    let loc = (misc.get_seed_value() % 15n);

    return loc;
}

function create_madrazo_hit_message() {
    let loc = get_madrazo_hit_location();
    let message = `- Possible Location: **#${Number(loc) + 1}**, **${zones.madrazo_hits[loc]}**`;

    return message;
}

module.exports = {
    create_madrazo_hit_message
};