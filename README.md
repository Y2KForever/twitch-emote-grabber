# twitch-emote-grabber
 Grabs emotes from Twitch with a specific emoteset id.

 ## Getting started.

1. Start with `npm i`.
2. Create a `.env` file so we can set enviroments variables. All you need is `EMOTESET` (if you dont want to hardcode it.) and `CLIENT_ID`.
    Client-ID can be grabbed from Twitch. Go to [https://dev.twitch.tv](https://dev.twitch.tv) to learn how to authenticate against their API.
    To grab the emoteset id, I used [Twitchemotes.com](https://twitchemotes.com)'s API, which you can find here: [API](https://twitchemotes.com/apidocs).
    Check the channel-id enpoint.
3. You're done. `node index` to test and see if the emotes are being downloaded.
4. I recommend that you set up a cron job or similar to grab new emotes. The Twitch API updates every 30 min, so no need to grab more often than that.
