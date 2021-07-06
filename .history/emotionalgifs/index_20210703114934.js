const fetch = require('node-fetch');
const multipart = require('parse-multipart');

async function analyzeImage(img) {
    //const subscriptionKey = process.env.SUBSCRIPTIONKEY;
    //const uriBase = process.env.ENDPOINT + '/face/v1.0/detect';

    const subscriptionKey = 'Cf275284f1b3483db3bacf7f216f647b'
    const uriBase = 'https://romerofaceserverless.cognitiveservices.azure.com/';

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

    const mainEmotion = Object.keys(emotions).find(key => emotions[key] === Math.max(...objects));

    context.res = {
        body: mainEmotion
    };

    context.done();
}
