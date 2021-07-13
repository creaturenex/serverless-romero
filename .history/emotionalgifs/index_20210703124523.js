const fetch = require('node-fetch');
const multipart = require('parse-multipart');

async function findGifs(emotion) {
    const giphyKey = process.env.GIPHYAPIKEY;

    const giphyResult = await fetch("https://api.giphy.com/v1/gifs/translate?api_key=" + giphyKey + "&s=" + emotion);

    const giphyResp = await giphyResult.json();

    return giphyResp.data.url;

}

async function analyzeImage(img) {
    const subscriptionKey = process.env.SUBSCRIPTIONKEY;
    const uriBase = process.env.ENDPOINT + '/face/v1.0/detect';

    let params = new URLSearchParams({
        'returnFaceId': 'true',
        'returnFaceAttributes': 'emotion'
    })

    let resp = await fetch(uriBase + '?' + params.toString(), {
        method: 'POST',
        body: img,
        headers: {
            'Content-Type': "application/octet-stream",
            'Ocp-Apim-Subscription-Key': subscriptionKey
        }
    })
    let emotionData = await resp.json();

    return emotionData;
}

module.exports = async function (context, req) {

    let boundary = multipart.getBoundary(req.headers['content-type']);

    // req.body == body
    let parts = multipart.Parse(req.body, boundary);

    let imagedata = Buffer.from(parts[0].data);

    let result = await analyzeImage(imagedata);

    let emotions = result[0].faceAttributes.emotion;

    let objects = Object.values(emotions)

    const main_emotion = Object.keys(emotions).find(key => emotions[key] === Math.max(...objects));

    let gif = await findGifs(main_emotion);

    context.res = {
        body: gif
    };

    context.done();
}
