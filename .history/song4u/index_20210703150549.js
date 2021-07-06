const querystring = require('querystring');
const fetch = require('node-fetch');
const multipart = require('parse-multipart');


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


    function determineGen(age){
        switch(age) {
            case 5-25:
                'GenZ'
                break;
            case 24-41:
                'GenY'
                break;
            case 40-57:
                'GenX'
                break;
            case 56-76:
                'BabyBoomers'
                break;
            default:
                'Unknown'
                break;
    }
}

module.exports = async function (context, req) {
    const queryObject = querystring.parse(req.body);

    context.log(queryObject)

    let result = await analyzeImage(imagedata);
    console.log(result)

    let age = result[0].faceAttributes.age;
    console.log(age)

    let gen = determineGen(age)

    // return generation?
    context.res = {
        body: gen
    };


    context.res = {
        body: queryObject.MediaUrl0
     };
     context.done();
}
