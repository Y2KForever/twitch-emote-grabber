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

// Downloading emotes from the twitch cdn.
downloadEmote = async (id, code) => {
    const url = 'https://static-cdn.jtvnw.net/emoticons/v1/'+id+'/3.0';
    const response = await fetch(url);
    const buffer = await response.buffer();
    fs.writeFile(`./emotes/${code}.png`, buffer, () => {});
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
            downloadEmote(emote['id'], emote['code']);
    });
});
