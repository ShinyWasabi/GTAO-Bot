class seed_random_number_generator {
    #maxInt = BigInt(0x7FFFFFFF);
    #maxFloat = BigInt(0x7FFFFF);
    #mask = (2n ** 32n - 1n);
    #magicNumber = 1557985959n;

    constructor(seed_param) {
        const seed = BigInt(seed_param);
        const rolval = ((seed << 16n) & this.#mask) | ((seed >> 16n) & this.#mask);
        this.seed0 = seed || 1n;
        this.seed1 = seed ^ rolval;
    }

    #next_seed() {
        const next_seed = this.#magicNumber * this.seed0 + this.seed1;
        this.seed0 = next_seed & BigInt(0xFFFFFFFF);
        this.seed1 = next_seed >> 32n;
        return next_seed;
    }

    get_random_int_ranged(min, max) {
        if (min == max)
            return min;
        if (min >= max)
            return 0;
        const next_seed = this.#next_seed();
        return Number(min + (next_seed & this.#maxInt) % (max - min + 1n));
    }

    get_random_float_ranged(min, max) {
        if (min == max)
            return min;
        if (min >= max)
            return 0;
        const range = max - min;
        const next_seed = this.#next_seed();
        return min + (range * (Number(next_seed & this.#maxFloat) / Number(this.#maxFloat)));
    }
}

module.exports = seed_random_number_generator;