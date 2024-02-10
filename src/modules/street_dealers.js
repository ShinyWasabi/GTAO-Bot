const seed_random_number_generator = require('../util/rng.js');
const misc = require('../util/misc.js');
const zones = require('../data/zones.json');

street_dealer_locations = new Array(3);
street_dealer_premium = new Array(3);
street_dealer_coke = new Array(3);
street_dealer_meth = new Array(3);
street_dealer_weed = new Array(3);
street_dealer_acid = new Array(3);
rng = null;

function get_random_price(iParam0) {
    let iVar0;
    let iVar1;

    iVar0 = rng.get_random_int_ranged(0n, BigInt(iParam0) + 1n);
    iVar1 = (iVar0 % 100);
    if (iVar1 < 50) {
        iVar0 = (iVar0 - iVar1);
    } else {
        iVar0 = (iVar0 + (100 - iVar1));
    }
    if (iVar0 > iParam0) {
        return iParam0;
    }

    return iVar0;
}

function get_product_values(iParam0, iParam1) {
    let iVar0;
    let iVar1;
    let iVar2;
    let iVar3;
    let bVar4;

    switch (iParam0) {
        case 2:
            iVar2 = (21000 - 19000);
            iVar3 = get_random_price(iVar2);
            iVar1 = (19000 + iVar3);
            iVar0 = misc.system_round((iVar1 / 1.0));
            break;

        case 3:
            iVar2 = (18500 - 16500);
            iVar3 = get_random_price(iVar2);
            iVar1 = (16500 + iVar3);
            iVar0 = misc.system_round((iVar1 / 2.0));
            break;

        case 4:
            iVar2 = (16000 - 14000);
            iVar3 = get_random_price(iVar2);
            iVar1 = (14000 + iVar3);
            iVar0 = misc.system_round((iVar1 / 10.0));
            break;

        case 7:
            iVar2 = (15850 - 13850);
            iVar3 = get_random_price(iVar2);
            iVar1 = (13850 + iVar3);
            iVar0 = Math.round((iVar1 / 10.0));
            break;
    }
    bVar4 = iParam0 == iParam1;
    if (bVar4) {
        iVar0 = misc.system_round((iVar0 * 2.0));
        iVar1 = misc.system_round((iVar1 * 2.0));
    }

    return iVar0;
}

function get_premium_product() {
    let fVar0 = 0.0;
    let fVar1;
    let fVar2;
    let fVar3;
    let fVar4;

    let tunable_70812178 = 1.5;
    let tunable_2049892150 = 2.0;
    let tunable_423735967 = 3.0;
    let tunable_899421308 = 3.5;

    fVar0 = (fVar0 + tunable_70812178);
    fVar0 = (fVar0 + tunable_2049892150);
    fVar0 = (fVar0 + tunable_423735967);
    fVar0 = (fVar0 + tunable_899421308);

    fVar1 = rng.get_random_float_ranged(0.0, fVar0);

    fVar2 = (fVar0 - tunable_70812178);
    fVar3 = (fVar2 - tunable_2049892150);
    fVar4 = (fVar3 - tunable_423735967);

    if (fVar1 > fVar2) {
        return 2;
    }
    if (fVar1 > fVar3) {
        return 3;
    }
    if (fVar1 > fVar4) {
        return 4;
    }
    return 7;
}

function assign_prices(iParam0) {
    let iVar0;

    iVar0 = get_premium_product();
    street_dealer_premium[iParam0] = iVar0;
    street_dealer_coke[iParam0] = get_product_values(2, iVar0);
    street_dealer_meth[iParam0] = get_product_values(3, iVar0);
    street_dealer_weed[iParam0] = get_product_values(4, iVar0);
    street_dealer_acid[iParam0] = get_product_values(7, iVar0);
}

function populate_street_dealers() {
    let iVar0 = Array.from({ length: 50 }, (_, i) => i);
    let iVar51;
    let iVar52;
    let iVar53;

    rng = new seed_random_number_generator(misc.get_seed_value());

    iVar51 = 49n;
    while (iVar51 >= 1n) {
        iVar52 = rng.get_random_int_ranged(0n, iVar51);
        misc.swap_int(iVar0, Number(iVar51), Number(iVar52));
        iVar51 = (iVar51 + -1n);
    }

    street_dealer_locations[0] = iVar0[0];
    street_dealer_locations[1] = iVar0[1];
    street_dealer_locations[2] = iVar0[2];

    rng = new seed_random_number_generator(misc.get_seed_value());

    iVar51 = 0;
    while (iVar51 < 3) {
        assign_prices(iVar51);
        iVar51++;
    }
}

function create_street_dealers_message() {
    const format = (number) => number.toLocaleString('en-US');
    let message = ``;
    let total = 0;
    let _all = 0;

    populate_street_dealers();

    _all = (1 * street_dealer_coke[0] + 2 * street_dealer_meth[0] + 10 * street_dealer_weed[0] + 10 * street_dealer_acid[0] + 1 * street_dealer_coke[1] + 2 * street_dealer_meth[1] + 10 * street_dealer_weed[1] + 10 * street_dealer_acid[1] + 1 * street_dealer_coke[2] + 2 * street_dealer_meth[2] + 10 * street_dealer_weed[2] + 10 * street_dealer_acid[2]);

    for (let i = 0; i <= 2; i++) {
        total = (1 * street_dealer_coke[i] + 2 * street_dealer_meth[i] + 10 * street_dealer_weed[i] + 10 * street_dealer_acid[i]);
        let loc = street_dealer_locations[i];
        let coke = street_dealer_coke[i];
        let meth = street_dealer_meth[i];
        let weed = street_dealer_weed[i];
        let acid = street_dealer_acid[i];

        if (street_dealer_premium[i] === 2) {
            message += `- Dealer ${i + 1}: **#${loc + 1}, ${zones.street_dealers[loc]}**\n`;
            message += `:star: Cocaine: $${format(coke * 1)} (1 * ${format(coke)})\n`;
            message += `Meth: $${format(meth * 2)} (2 * ${format(meth)})\n`;
            message += `Weed: $${format(weed * 10)} (10 * ${format(weed)})\n`;
            message += `Acid: $${format(acid * 10)} (10 * ${format(acid)})\n`;
            message += `Total: $${format(total)}\n`;
        } else if (street_dealer_premium[i] === 3) {
            message += `- Dealer ${i + 1}: **#${loc + 1}, ${zones.street_dealers[loc]}**\n`;
            message += `:star: Meth: $${format(meth * 2)} (2 * ${format(meth)})\n`;
            message += `Cocaine: $${format(coke * 1)} (1 * ${format(coke)})\n`;
            message += `Weed: $${format(weed * 10)} (10 * ${format(weed)})\n`;
            message += `Acid: $${format(acid * 10)} (10 * ${format(acid)})\n`;
            message += `Total: $${format(total)}\n`;
        } else if (street_dealer_premium[i] === 4) {
            message += `- Dealer ${i + 1}: **#${loc + 1}, ${zones.street_dealers[loc]}**\n`;
            message += `:star: Weed: $${format(weed * 10)} (10 * ${format(weed)})\n`;
            message += `Cocaine: $${format(coke * 1)} (1 * ${format(coke)})\n`;
            message += `Meth: $${format(meth * 2)} (2 * ${format(meth)})\n`;
            message += `Acid: $${format(acid * 10)} (10 * ${format(acid)})\n`;
            message += `Total: $${format(total)}\n`;
        } else if (street_dealer_premium[i] === 7) {
            message += `- Dealer ${i + 1}: **#${loc + 1}, ${zones.street_dealers[loc]}**\n`;
            message += `:star: Acid: $${format(acid * 10)} (10 * ${format(acid)})\n`;
            message += `Cocaine: $${format(coke * 1)} (1 * ${format(coke)})\n`;
            message += `Meth: $${format(meth * 2)} (2 * ${format(meth)})\n`;
            message += `Weed: $${format(weed * 10)} (10 * ${format(weed)})\n`;
            message += `Total: $${format(total)}\n`;
        }
    }

    message += `\n\n`;
    message += `All: $${format(_all)}`;

    return message;
}

module.exports = {
    create_street_dealers_message
};