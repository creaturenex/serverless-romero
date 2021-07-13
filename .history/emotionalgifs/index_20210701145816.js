const fetch = require('node-fetch');
const multipart = require('parse-multipart');

async function analyzeImage(img){
    const subscriptionKey = process.env.SUBSCRIPTIONKEY;
    const uriBase = process.env.ENDPOINT + '/face/v1.0/detect';

    let params = new URLSearchParams({
        'returnFaceId': 'true',
        'returnFaceAttributes': 'emotion'
    })

    //COMPLETE THE CODE
    let resp = await fetch(uriBase + '?' + params.toString(), {
        method: '<METHOD>',  //WHAT TYPE OF REQUEST?
        body: '<BODY>',  //WHAT ARE WE SENDING TO THE API?
        headers: {
            '<HEADER NAME>': '<HEADER VALUE>'  //do this in the next section
        }
    })
    let data = await resp.json();

    return data;
}

module.exports = async function (context, req) {

    let boundary = multipart.getBoundary(req.headers['content-type']);

    // req.body == body
    let parts = multipart.Parse(req.body, boundary);

    let convertedResult = Buffer.from(parts[0].data).toString('base64');

    const responseMessage = (convertedResult)
        ? {convertedResult}
        : "Please post an image in the body"

        context.res = {
        body: responseMessage
    };
    context.done();
}
