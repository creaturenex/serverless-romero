const fetch = require('node-fetch');
const querystring = require('querystring');
const MessagingResponse = require('twilio').twiml.MessagingResponse;

const KEY = process.env.MAGICVISIONAIKEY;
const MV_ENDPOINT = 'https://magicvisionai.cognitiveservices.azure.com/vision/v3.2/read/analyze'
const SCRYFALL = 'https://api.scryfall.com/cards/named?fuzzy='

function syncDelay(milliseconds) {
    var start = new Date().getTime();
    var end = 0;
    while ((end - start) < milliseconds) {
        end = new Date().getTime();
    }
}

module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    /// Function to parse Image Url from SMS
    const queryObject = querystring.parse(req.body);
    let smsImageUrl = queryObject.MediaUrl0
    context.log("Image sent via Twilio")


    // Function to send imageUrl for analysis
    let res_mv_endpoint = await fetch(MV_ENDPOINT, {
        method: 'POST',
        body: JSON.stringify({
            "url": smsImageUrl
        }),
        headers: {
            'Content-Type': "application/json",
            'Ocp-Apim-Subscription-Key': KEY
        }
    })

    let resultUrl = res_mv_endpoint.headers.get('operation-location')


    // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    let text = ''
    var times = 5;
    for (var i = 0; i < times; i++) {
        context.log("<<<<<<<<<<>>>>>>>>>>")

        // Function to read the analysis text
        let res_resultUrl = await fetch(resultUrl, {
            method: 'GET',
            headers: {
                'Ocp-Apim-Subscription-Key': KEY
            }
        })

        // This was super annoying to figure out, need to call it repeatably before a successful response is done.
        text = await res_resultUrl.text();

        context.log(text)
        context.log(`Called ${i + 1} times`)

        read_status = JSON.parse(text).status
        //readStatus = json
        syncDelay(2000)

        if (read_status === 'succeeded') {
            break;
        }
        // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    }

    context.log("<<<<<<<<<<>>>>>>>>>>")
    // Parses out the card title
    let json = JSON.parse(text)
    title = json.analyzeResult.readResults[0].lines[0].text
    context.log(`Probably Card Title: ${title}`)

    context.log("<<<<<<<<<<>>>>>>>>>>")


    // Function to return card value from Scryfall
    let final = await fetch(SCRYFALL + title, {
        method: 'GET',
    })
    //context.log(final)
    context.log("<<<<<<<<<<>>>>>>>>>>")

    let card = await final.text()
    let cardinfo = JSON.parse(card)

    context.log(cardinfo)
    context.log("<<<<<<<<<<>>>>>>>>>>")

    let price = cardinfo.prices.usd
    context.log(price)
    context.log("<<<<<<<<<<>>>>>>>>>>")

    let image = cardinfo.image_uris.normal
    context.log('Url of card image')
    context.log(image)
    // context.log("<<<<<<<<<<>>>>>>>>>>")

    let purchase = cardinfo.purchase_uris.tcgplayer
    context.log('trading market')
    context.log(purchase)

    // context.log(`Current Market Value: ${price} USD`)
    // context.log("<<<<<<<<<<>>>>>>>>>>")


    const response = new MessagingResponse();
    const message = response.message();
    message.media(image);
    message.body('Current Market Value ' + price + ' USD');
    message.body(purchase);

    context.res = {
        status: 200,
        body: response.toString(),
        headers: {
            'Content-Type': 'application/xml'
        },
        isRaw: true
    };
    context.done();
}
