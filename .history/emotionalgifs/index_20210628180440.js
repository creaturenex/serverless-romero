var multipart = require('parse-multipart');

module.exports = async function (context, req) {

    // here's your boundary:
    var boundary = multipart.getBoundary(req.headers['content-type']);

    // TODO: assign the body variable the correct value
    var body = {
        "url": "https://i.imgur.com/wWufhtb.png"
    }

    // parse the body
    var parts = multipart.Parse(body, boundary);

    //
    var convertedResult = Buffer.from(parts[0].data).toString('base64');
    // FILL IN THE BLANK

    context.res = {
        // status: 200, /* Defaults to 200 */
        body: {convertedResult}
    };
}
