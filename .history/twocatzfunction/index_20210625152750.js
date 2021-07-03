const fetch = require('node-fetch');

module.exports = async function (context, req) {
    var names = ["Shreya", "Emily", "Fifi", "Beau", "Evelyn", "Julia", "Daniel", "Fardeen"]

    let resp = await fetch('https://cataas.com/cat/cute/says/serverless', {
        method: 'GET'
    });

    let data = await resp.arrayBuffer()

    let base64data = Buffer.from(data).toString('base64')

    context.res = {
        // status: 200, /* Defaults to 200 */
        body: { base64data }
    };
}
