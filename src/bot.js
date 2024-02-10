const { Client, IntentsBitField, AttachmentBuilder, EmbedBuilder } = require('discord.js');
const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent
    ],
});

const fs = require('fs');
const cron = require('node-cron');
const paths = require('./paths.js');
const logger = require('./logger/logger.js');
const collectables = require('./modules/collectables.js');
const exotic_exports = require('./modules/exotic_exports.js');
const street_dealers = require('./modules/street_dealers.js');
const gun_van = require('./modules/gun_van.js');
const time_trials = require('./modules/time_trials.js');
const clock = require('./modules/clock.js');
const tunables = require('./util/tunables.js');

function send_collectible_embed(title, description, image_file, color) {
    const file = new AttachmentBuilder(paths.ASSETS_PATH + `/${image_file}.png`);
    const embed = new EmbedBuilder()
        .setColor(color)
        .setThumbnail(`attachment://${image_file}.png`)
        .setTitle(title)
        .setDescription(description());

    const channel = client.channels.cache.get('YOUR_CHANNEL_ID');
    channel.send({
        embeds: [embed],
        files: [file]
    });
}

function send_clock_embed() {
    const gta_clock_embed = new EmbedBuilder()
        .setColor(0xEEEEE4)
        .setTitle('GTA Online Clock')
        .addFields({
            name: ':alarm_clock: Time',
            value: `${clock.get_weekday()}, ${clock.get_hour_and_minute()}`
        }, {
            name: ':sunny: Weather',
            value: `${clock.get_weather()}`
        }, );

    const channel = client.channels.cache.get('YOUR_CHANNEL_ID');
    channel.send({
        embeds: [gta_clock_embed]
    });
}

function setup_cron_jobs() {
    // 6 AM UTC
    cron.schedule('0 6 * * *', () => {
        send_collectible_embed('Treasure Chests', () => 'The new Treasure Chest locations are now available!\n\n' + collectables.create_treasure_chest_message(), 'treasure', 0xEEEEE4);
        send_collectible_embed('Hidden Caches', () => 'The new Hidden Cache locations are now available!\n\n' + collectables.create_hidden_cache_message(), 'cache', 0xEEEEE4);
        send_collectible_embed('Shipwreck', () => 'The new Shipwreck location is now available!\n\n' + collectables.create_shipwrecked_message(), 'shipwrecked', 0xEEEEE4);
        send_collectible_embed('Buried Stashes', () => 'The new Buried Stash locations are now available!\n\n' + collectables.create_buried_stash_message(), 'shipwrecked', 0xEEEEE4);
        send_collectible_embed('Junk Energy Skydives', () => 'The new Junk Energy Skydive locations are now available!\n\n' + collectables.create_skydive_message(), 'skydive', 0xEEEEE4);
    }, {
        timezone: 'Europe/London'
    });

    // 7 AM UTC
    cron.schedule('0 7 * * *', () => {
        send_collectible_embed('Exotic Exports', () => 'The new Exotic Exports vehicle list is now available!\n\n' + exotic_exports.create_exotic_exports_message(), 'exotic', 0x045CC6);
        send_collectible_embed('Street Dealers', () => 'The new Street Dealers locations & stock are now available!\n\n' + street_dealers.create_street_dealers_message(), 'dealer', 0x760485);
        send_collectible_embed('Gun Van', () => 'The new Gun Van location is now available!\n\n' + gun_van.create_gun_van_message(), 'van', 0x070607);
        send_collectible_embed('RC Bandito Time Trial', () => 'The new RC Bandito Time Trial location is now available!\n\n' + time_trials.create_rc_time_trial_message(), 'rctt', 0x6338E8);
        send_collectible_embed('Junk Energy Bike Time Trial', () => 'The new Junk Energy Bike Time Trial location is now available!\n\n' + time_trials.create_bike_time_trial_message(), 'btt', 0x6338E8);
    }, {
        timezone: 'Europe/London'
    });

    // Every Thursday at 12 PM
    cron.schedule('0 12 * * 4', async () => {
        try {
            await tunables.download_tunables();
        } catch (error) {
            logger.error('Exception in setup_cron_jobs:', error);
        }
    }, {
        timezone: 'Europe/London'
    });
}

client.on('ready', (c) => {
    logger.info(`Logged in as ${c.user.tag}.`);
    tunables.download_tunables();
    setup_cron_jobs();
});

client.on('messageCreate', (message) => {
    if (message.content === '!gta-clock') {
        send_clock_embed();
    }
});

client.login('YOUR_BOT_TOKEN');