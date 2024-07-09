const collectables_data = require('../util/collectables_data.js');
const zones = require('../data/zones.json');

function get_treasure_chest_location(treasure_index) {
    let locations = collectables_data.get_daily_collectible_locations();

    return locations.treasure_chests[treasure_index];
}

function get_hidden_cache_location(cache_index) {
    let locations = collectables_data.get_daily_collectible_locations();

    return locations.hidden_caches[cache_index];
}

function get_shipwrecked_location() {
    let locations = collectables_data.get_daily_collectible_locations();

    return locations.shipwrecked;
}

function get_buried_stash_location(stash_index) {
    let locations = collectables_data.get_daily_collectible_locations();

    return locations.buried_stashes[stash_index];
}

function get_skydive_location(skydive_index) {
    let locations = collectables_data.get_daily_collectible_locations();

    return locations.skydives[skydive_index];
}

function get_ls_tag_location(tag_index) {
    let locations = collectables_data.get_daily_collectible_locations();

    return locations.ls_tags[tag_index];
}

function create_treasure_chest_message() {
    let message = ``;

    for (let i = 0; i <= 1; i++) {
        let loc = get_treasure_chest_location(i);
        message += `- Treasure Chest ${i + 1}: **#${loc + 1}, ${zones.treasure_chests[loc]}**\n`;
    }

    return message;
}

function create_hidden_cache_message() {
    let message = ``;

    for (let i = 0; i <= 9; i++) {
        let loc = get_hidden_cache_location(i);
        message += `- Hidden Cache ${i + 1}: **#${loc + 1}**, **${zones.hidden_caches[loc]}**\n`;
    }

    return message;
}

function create_shipwrecked_message() {
    let loc = get_shipwrecked_location();
    let message = `- Location: **#${loc + 1}**, **${zones.shipwrecked[loc]}**`;

    return message;
}

function create_buried_stash_message() {
    let message = ``;

    for (let i = 0; i <= 1; i++) {
        let loc = get_buried_stash_location(i);
        message += `- Buried Stash ${i + 1}: **#${loc + 1}**, **${zones.buried_stashes[loc]}**\n`;
    }

    return message;
}

function create_skydive_message() {
    let message = ``;

    for (let i = 0; i <= 9; i++) {
        let loc = get_skydive_location(i);
        message += `- Skydive ${i + 1}: **#${loc + 1}, ${zones.skydives[loc]}**\n`;
    }

    return message;
}

function create_ls_tag_message() {
    let message = ``;

    for (let i = 0; i <= 4; i++) {
        let loc = get_ls_tag_location(i);
        message += `- LS Tag ${i + 1}: **#${loc + 1}, ${zones.ls_tags[loc]}**\n`;
    }

    return message;
}

module.exports = {
    create_treasure_chest_message,
    create_hidden_cache_message,
    create_shipwrecked_message,
    create_buried_stash_message,
    create_skydive_message,
    create_ls_tag_message
};