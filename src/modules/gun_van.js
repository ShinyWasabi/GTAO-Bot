const seed_random_number_generator = require('../util/rng.js');
const misc = require('../util/misc.js');
const tunables = require('../util/tunables.js');
const zones = require('../data/zones.json');

const DISABLED_LOCATION = 4;

function get_gun_van_location() {
    let iVar0 = 0;

    let rng = new seed_random_number_generator(misc.get_seed_value());
    iVar0 = rng.get_random_int_ranged(0n, (30n - 1n));

    while (iVar0 === DISABLED_LOCATION) {
        iVar0 = rng.get_random_int_ranged(0n, (30n - 1n));
    }

    return iVar0;
}

function create_gun_van_message() {
    let message = ``;
    let loc = get_gun_van_location();

    message += `- Location: **#${loc + 1}, ${zones.gun_van[loc]}**\n\n`;

    message += `Weapons:\n`;

    for (let i = 0; i <= 9; i++) {
        let weapon_name = tunables.get_tunable('XM22_GUN_VAN_SLOT_WEAPON_TYPE_' + i);
        let discount = tunables.get_tunable('XM22_GUN_VAN_SLOT_WEAPON_DISCOUNT_' + i);
        if (weapon_name !== null && weapon_name !== 'invalid') {
            message += `- ${weapon_name} (${discount * 100}%)\n`;
        }
    }

    message += `Throwables:\n`;

    for (let i = 0; i <= 2; i++) {
        let throwable_name = tunables.get_tunable('XM22_GUN_VAN_SLOT_THROWABLE_TYPE_' + i);
        let discount = tunables.get_tunable('XM22_GUN_VAN_SLOT_THROWABLE_DISCOUNT_' + i);
        if (throwable_name !== null && throwable_name !== 'invalid') {
            message += `- ${throwable_name} (${discount * 100}%)\n`;
        }
    }

    return message;
}

module.exports = {
    create_gun_van_message
};