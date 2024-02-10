const seed_random_number_generator = require('../util/rng.js');
const misc = require('../util/misc.js');

function get_exotic_exports_vehicle_model(veh) {
    const vehicle_map = {
        0: 'Truffade Adder',
        1: 'Overflod Autarch',
        2: 'Gallivanter Baller LE LWB',
        3: 'Bravado Banshee 900R',
        4: 'Grotti Bestia GTS',
        5: 'Lampadati Novak',
        6: 'Grotti Cheetah Classic',
        7: 'Pfister Comet SR',
        8: 'Invetero Coquette',
        9: 'Progen Emerus',
        10: 'Grotti Furia',
        11: 'Enus Huntley S',
        12: 'Pegassi Infernus Classic',
        13: 'Grotti Itali GTO',
        14: 'Benefactor Krieger',
        15: 'Ocelot Locust',
        16: 'Declasse Mamba',
        17: 'Pegassi Monroe',
        18: 'Vysser Neo',
        19: 'Pfister Neon',
        20: 'Truffade Nero',
        21: 'Enus Paragon R',
        22: 'Ocelot Penetrator',
        23: 'Pfister 811',
        24: 'Pegassi Reaper',
        25: 'Hijak Ruston',
        26: 'Annis S80RR',
        27: 'Ubermacht SC1',
        28: 'Benefactor Schwartzer',
        29: 'Dewbauchee Seven-70',
        30: 'Enus Stafford',
        31: 'Grotti Stinger GT',
        32: 'Benefactor Surano',
        33: 'Ocelot Swinger',
        34: 'Progen T20',
        35: 'Cheval Taipan',
        36: 'Pegassi Tempesta',
        37: 'Lampadati Tigon',
        38: 'Pegassi Torero',
        39: 'Grotti Turismo R',
        40: 'Overflod Tyrant',
        41: 'Bravado Verlierer',
        42: 'Lampadati Viseris',
        43: 'Grotti Visione',
        44: 'Enus Windsor',
        45: 'Truffade Z-Type',
        46: 'Ocelot XA-21',
        47: 'Overflod Entity XF',
        48: 'Grotti Carbonizzare',
        49: 'Dewbauchee Exemplar',
        50: 'Pfister Comet',
        51: 'Vapid Bullet',
        52: 'Enus Super Diamond',
        53: 'Pegassi Infernus',
        54: 'Principe Deveste Eight',
        55: 'Dewbauchee Massacro',
        56: 'Dewbauchee Specter',
        57: 'Ocelot F620',
        58: 'Invetero Coquette BlackFin',
        59: 'Benefactor Dubsta',
        60: 'Maxwell Asbo',
        61: 'Grotti Brioso R/A',
        62: 'Albany Buccaneer Custom',
        63: 'Vapid Dominator GTX',
        64: 'Annis Elegy Retro Custom',
        65: 'Coil Brawler',
        66: 'Vapid Flash GT',
        67: 'Bravado Gauntlet Hellfire',
        68: 'Weeny Issi Classic',
        69: 'Ocelot Jugular',
        70: 'Canis Kamacho',
        71: 'Lampadati Komoda',
        72: 'Imponte Nightshade',
        73: 'Vapid Peyote Custom',
        74: 'Imponte Phoenix',
        75: 'Coil Raiden',
        76: 'Vapid Retinue',
        77: 'Obey Rocoto',
        78: 'Imponte Ruiner',
        79: 'Declasse Sabre Turbo Custom',
        80: 'Annis Savestra',
        81: 'Vapid Chino Custom',
        82: 'RUNE Cheburek',
        83: 'Albany Cavalcade',
        84: 'Bravado Buffalo S',
        85: 'Albany Alpha',
        86: 'Dinka Blista Kanjo',
        87: 'Karin Kuruma',
        88: 'Ubermacht Sentinel Classic',
        89: 'Karin Sultan Classic',
        90: 'Declasse Drift Yosemite',
        91: 'Karin 190z',
        92: 'Ocelot Jackal',
        93: 'Albany V-STR',
        94: 'Maxwell Vagrant',
        95: 'Declasse Vamos',
        96: 'Declasse Drift Tampa',
        97: 'Declasse Tornado Custom',
        98: 'Lampadati Tropos Rallye',
        99: 'Declasse Tulip'
    };
	
    return vehicle_map[veh] || toString(veh);
}

function get_vehicle_order(order_index) {
    let iVar0 = Array.from({ length: 10 }, (_, i) => i);
    let iVar12;
    let iVar13;

    iVar12 = 9n;
    while (iVar12 >= 1) {
        iVar13 = (misc.get_seed_value() % (iVar12 + 1n));
        misc.swap_int(iVar0, Number(iVar12), Number(iVar13));
        iVar12 = (iVar12 - 1n);
    }

    return iVar0[order_index];
}

function populate_exotic_exports_vehicles(veh_index) {
    let iVar0 = Array.from({ length: 100 }, (_, i) => i);
    let iVar101;
    let iVar102;

    let rng = new seed_random_number_generator(misc.get_seed_value());

    iVar101 = 99n;
    while (iVar101 >= 1n) {
        iVar102 = rng.get_random_int_ranged(0n, iVar101);
        misc.swap_int(iVar0, Number(iVar101), Number(iVar102));
        iVar101 = (iVar101 - 1n);
    }

    return get_exotic_exports_vehicle_model(iVar0[get_vehicle_order(veh_index)]);
}

function create_exotic_exports_message() {
    let message = ``;

    for (let i = 0; i <= 9; i++) {
        message += `- **${populate_exotic_exports_vehicles(i)}**\n`;
    }

    return message;
}

module.exports = {
    create_exotic_exports_message
};