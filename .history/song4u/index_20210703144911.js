const querystring = require('querystring');


let resp = await fetch(YOUR_URL,{

    method: 'GET',
})

// receive the response
let data = await resp.arrayBuffer()
// we are receiving it as a Buffer since this is binary data

async function analyzeImage(img){
    const subscriptionKey = process.env.SUBSCRIPTIONKEY;
    const uriBase = process.env.ENDPOINT + '/face/v1.0/detect';

    let params = new URLSearchParams({
	'returnFaceId': 'true',
	'returnFaceAttributes': 'age'
    })

    // making the post request
    let resp = await fetch(uriBase + '?' + params.toString(),{
        method: 'POST',
        body: img,
        headers: {
            'Content-Type' : 'application/octet-stream',
            'Ocp-Apim-Subscription-Key': subscriptionKey
        }
    })

    // receive the response
    let data = await resp.json();

    return data;
}

module.exports = async function (context, req) {
    const queryObject = querystring.parse(req.body);

    context.log(queryObject)

    context.res = {
        body: queryObject.MediaUrl0
     };
     context.done();
}
