var multipart = require('parse-multipart');

async function generate_face() {
    const ENDPOINT = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=934&q=80'

    let resp = await fetch(ENDPOINT, {
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
