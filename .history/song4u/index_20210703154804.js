const querystring = require('querystring');
const fetch = require('node-fetch');

// image url https://images.unsplash.com/photo-1618676349232-d5504f9db8ac?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=934&q=80

async function getImage(imgUrl) {
    let resp = await fetch(imgUrl,{
        method: 'GET',
    })

    let data = await resp.arrayBuffer();
    return data;
}

async function analyzeImage(img) {
    const subscriptionKey = process.env.SUBSCRIPTIONKEY;
    const uriBase = process.env.ENDPOINT + '/face/v1.0/detect';

    let params = new URLSearchParams({
        'returnFaceId': 'true',
        'returnFaceAttributes': 'age'
    })

    let resp = await fetch(uriBase + '?' + params.toString(), {
        method: 'POST',
        body: img,
        headers: {
            'Content-Type': 'application/octet-stream',
            'Ocp-Apim-Subscription-Key': subscriptionKey
        }
    })

    let data = await resp.json();

    return data;
}

// function determineGen(age) {
//     let gen = ''
//     switch (age) {
//         case 5 - 25:
//             gen += 'GenZ'
//             break;
//         case 24 - 41:
//             gen += 'GenY'
//             break;
//         case 40 - 57:
//             gen += 'GenX'
//             break;
//         case 56 - 76:
//             gen += 'BabyBoomers'
//             break;
//         default:
//             gen += 'Unknown'
//             break;
//     }
//     return gen
// }

function determineGen(age) {
    if (age > 5 && age < 25) {
        return "GenZ"
    }
    else if (age > 24 && age < 41) {
        return "GenY"
    }
    else if (age > 40 && age < 57) {
        return "GenX"
    }
    else if (age > 56 && age < 76) {
        return "BabyBoomers"
    }
    else {
        return "Unknown"
    }
}


module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    const queryObject = querystring.parse(req.body);
    let url = queryObject.MediaUrl0;

    let image = await getImage();

    let result = await analyzeImage(image);

    let age = result[0].faceAttributes.age;
    console.log(age)

    let generation = determineGen(age)
    console.log(generation)

    // return generation?
    context.res = {
        body: generation
    };

    context.done();
}
