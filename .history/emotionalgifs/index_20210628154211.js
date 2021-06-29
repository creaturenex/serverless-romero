var multipart = require('parse-multipart');

async function generate_face() {
    let resp = await fetch('https://cataas.com/cat/cute/says/Bitcamp', {
            method: 'GET'
        });
        let data = await resp.arrayBuffer();
        let face = Buffer.from(data).toString('base64');
        return face;
    };

module.exports = async function (context, req) {
    face1 = await generate_face();

    // here's your boundary:
    var boundary = multipart.getBoundary(req.headers['content-type']);

    // TODO: assign the body variable the correct value
    var body = face1;

    // parse the body
    var parts = multipart.Parse(body, boundary);

    context.res = {
        // status: 200, /* Defaults to 200 */
        body: parts
    };
}
