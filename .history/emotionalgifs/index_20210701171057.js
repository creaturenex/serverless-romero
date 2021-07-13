const fetch = require('node-fetch');
const multipart = require('parse-multipart');

async function analyzeImage(img){
    const subscriptionKey = process.env.SUBSCRIPTIONKEY;
    const uriBase = process.env.ENDPOINT + '/face/v1.0/detect';

    let params = new URLSearchParams({
        'returnFaceId': 'true',
        'returnFaceAttributes': 'emotion'
    })

    let resp = await fetch(uriBase + '?' + params.toString(), {
        method: 'POST',
        body: '<BODY>',
        headers: {
            'Ocp-Apim-Subscription-Key': 'subcriptionKey'
        }
    })
    let data = await resp.json();

    return data;
}

module.exports = async function (context, req) {

    let boundary = multipart.getBoundary(req.headers['content-type']);

    // req.body == body
    let parts = multipart.Parse(req.body, boundary);

    // let convertedResult = Buffer.from(parts[0].data).toString('base64');

    let image = Buffer.from(parts[0].data);

    let data = await analyzeImage(image)

    const responseMessage = (data)
        ? data
        : "Please post an image in the body"

    context.res = {
    body: {
        responseMessage
    }
};

    console.log(result)
    context.done();
}
