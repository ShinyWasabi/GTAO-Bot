const winston = require('winston');
const fs = require('fs');

const LOG_LEVELS = {
    error: 0,
    warn: 1,
    info: 2
};

const LOG_COLORS = {
    error: 'red',
    warn: 'yellow',
    info: 'green'
};

if (fs.existsSync('./logger/bot.log')) {
    fs.truncateSync('./logger/bot.log', 0);
}

const logger = winston.createLogger({
    levels: LOG_LEVELS,
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.printf(info => `${info.timestamp} [${info.level}]: ${info.message}`)
    ),
    transports: [
        new winston.transports.Console({
            format: winston.format.combine(
                winston.format.colorize({
                    all: true
                }),
                winston.format.simple()
            )
        }),
        new winston.transports.File({
            filename: './logger/bot.log'
        })
    ]
});

module.exports = logger;