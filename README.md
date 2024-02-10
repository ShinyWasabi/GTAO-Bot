# GTAO-Bot
A Discord bot for GTA Online that allows you to locate Daily Collectibles, Gun Van, Street Dealers, and more.
It sends a message to the channel you specified at daily reset times. You can also get the current time and weather in the game using "!gta-clock" command.

# 6 AM UTC
* Treasure Chests
* Hidden Caches
* Shipwreck
* Buried Stashes
* Junk Energy Skydives

# 7 AM UTC
* Exotic Exports (Vehicle List)
* Street Dealers (Locations & Stock)
* Gun Van (Location & Stock)
* RC Bandito Time Trial
* Junk Energy Bike Time Trial

## Setup
- Clone the repository:
```
git clone https://github.com/ShinyWasabi/GTAO-Bot.git
```

- Install dependencies:
```
npm install
```

- Replace "YOUR_BOT_TOKEN" and "YOUR_CHANNEL_ID" in `bot.js` with your actual token and channel ID.

- Run the bot:
```
node bot.js
```

## Credits
* [gir489returns](https://github.com/gir489returns) (network_seed_random_number_generator implementation)
* [Senexis](https://github.com/Senexis) (decrypted tunables)
* [PLTytus](https://github.com/PLTytus) (weather map)