const fs = require('fs');
const path = './emotes';

// We using fetch, you can change this to Axios or something else if you want to.
const fetch = require('node-fetch');

// We need dotenv to set enviroment variables.
require('dotenv').config();


// We start by seeing if folder exist for emotes. If it doens't, we create it.
try {
    if(!fs.existsSync(path)){
        fs.mkdirSync(path);
    }
}catch(err){
    console.error(err);
}

// Downloading emotes from the twitch / bttv cdn.
downloadEmote = async (id, code, type, imgtype) => {
    if(type == "twitch"){
        const url = 'https://static-cdn.jtvnw.net/emoticons/v1/'+id+'/3.0';
        const response = await fetch(url);
        const buffer = await response.buffer();
        fs.writeFile(`./emotes/${code}.png`, buffer, () => {});
    }else if (type == "bttv"){
        const url = 'https://cdn.betterttv.net/emote/'+id+'/3x';
        const response = await fetch(url);
        const buffer = await response.buffer();
        fs.writeFile(`./emotes/${code}.${imgtype}`, buffer, () => {});
    }
}


// I've set emoteset to a env var, you can hardcode it if you want.
fetch('https://api.twitch.tv/kraken/chat/emoticon_images?emotesets='+process.env.EMOTESET, {
    method: 'GET',
    headers: {
        'Accept': 'application/vnd.twitchtv.v5+json',
        'client-id': process.env.CLIENT_ID
    }
}).then(res => res.json()).then((json) => {
    json['emoticon_sets'][process.env.EMOTESET].forEach((emote) => {
            downloadEmote(emote['id'], emote['code'], 'twitch' );
    });
});

// Fetching global emotes from BTTV
fetch('https://api.betterttv.net/3/cached/emotes/global', {
    method: 'GET'
}).then(res => res.json()).then((json) => {
    json.forEach((emote) => {
            downloadEmote(emote['id'], emote['code'], 'bttv', emote['imageType']);
    })
});

// Fetching channel & shared emote from BTTV
fetch(`https://api.betterttv.net/3/cached/users/twitch/${process.env.CHANNEL_ID}`, {
    method: 'GET'
}).then(res => res.json()).then((json) => {
    json['channelEmotes'].forEach((emote) => {
        downloadEmote(emote['id'], emote['code'], 'bttv', emote['imageType']);
    });
    json['sharedEmotes'].forEach((emote) => {
        downloadEmote(emote['id'], emote['code'], 'bttv', emote['imageType']);
    })
});



