function get_cloud_time_as_int() {
    return BigInt(Math.floor(Date.now() / 1000));
}

function get_seed_value() {
    let cloud_time = get_cloud_time_as_int();
    let seed = (cloud_time - BigInt(21600)) / BigInt(86400);
    return seed;
}

function swap_int(array, index1, index2) {
    let temp = array[index1];
    array[index1] = array[index2];
    array[index2] = temp;
}

function system_round(a1) {
    let v1 = Math.floor(a1 + 0.5);
    return (v1 !== -Infinity && a1 + 0.5 !== v1) ? v1 - v1 % 2 : v1;
}

/*
function system_ceil(a1) {
    let v1 = Math.floor(a1);
    return (v1 !== -Infinity && a1 !== v1) ? (v1 % 2 === 0 ? v1 : v1 + 1) : a1;
}
 
function system_floor(a1) {
    let v1 = Math.floor(a1);
    return (v1 !== -Infinity && a1 !== v1) ? (v1 % 2 === 0 ? v1 : v1 - 1) : a1;
}
*/

module.exports = {
    get_cloud_time_as_int,
    get_seed_value,
    swap_int,
    system_round
};