const querystring = require('querystring');
const fetch = require('node-fetch');

const songs = {"GenZ":"https://open.spotify.com/track/0SIAFU49FFHwR3QnT5Jx0k?si=1c12067c9f2b4fbf",
"GenY":"https://open.spotify.com/track/1Je1IMUlBXcx1Fz0WE7oPT?si=a04bbdf6ec4948b9",
"GenX":"https://open.spotify.com/track/4Zau4QvgyxWiWQ5KQrwL43?si=790d9e3ef2ed408d",
"BabyBoomers":"https://open.spotify.com/track/4gphxUgq0JSFv2BCLhNDiE?si=1abb329f2dc24f50",
"Unknown":"https://open.spotify.com/track/5ygDXis42ncn6kYG14lEVG?si=84b49b41d09d4d11"}

async function getImage(imgUrl) {
    let resp = await fetch(imgUrl, {
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
    } else if (age > 24 && age < 41) {
        return "GenY"
    } else if (age > 40 && age < 57) {
        return "GenX"
    } else if (age > 56 && age < 76) {
        return "BabyBoomers"
    } else {
        return "Unknown"
    }
}

module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    const queryObject = querystring.parse(req.body);
    let url = queryObject.MediaUrl0;

    let image = await getImage(url);

    let result = await analyzeImage(image);

    let age = result[0].faceAttributes.age;
    console.log(age)

    let generation = determineGen(age)
    console.log(generation)


    let songLink = song[generation]


    context.res = {
        body: ("We guessed you're part of this generation: " + ${songLink}"! Happy listening! " + ${songLink})
    };

    context.done();
}
