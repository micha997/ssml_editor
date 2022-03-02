const axios = require('axios');

export function getVoices(){

}

export function generateTTS(body){
    return new Promise( (resolve, reject) => {
        // Set SSML Server URL
        const url = 'http://localhost:4000/tts';

        const config = {
            headers: { 'Content-type': 'application/json; charset=UTF-8'}
        }

        axios.post(url, body, config)
            .then((response) => {
                let audioData = {
                    //text: body.input.replace(/<\/?[^>]+(>|$)/g, ""),
                    src: "data:audio/mpeg;base64," + response.data
                }

                resolve(audioData);
            })
            .catch((error) => {
                reject(error);
            });
    });
}

export function buildBody(input, tts_settings, stripSSML = false){
    const SSML_START = "<speak>";
    const SSML_END = "</speak>";

    if (!stripSSML){
        input = SSML_START.concat(input);
        input = input.concat(SSML_END);
        input = input.replaceAll("&nbsp;", " ");
        input = { ssml: input };
    }else{
        input = { text: input.replace(/<\/?[^>]+(>|$)/g, "") };
    }

    const voice = {
        languageCode: tts_settings.languageCode.value,
        name: tts_settings.name.value
    }

    const audioConfig = {
        audioEncoding: "MP3",
        pitch: 0,
        speakingRate: 1
    }

    return {
        input,
        voice,
        audioConfig
    }
}