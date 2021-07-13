const fetch = require('node-fetch');
const multipart = require('parse-multipart');

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

    const responseMessage = (result) ?
        result :
        "Please post an image in the body";

    context.res = {
        body: {
            responseMessage
        }
    };

    console.log(result)
    context.done();
}
