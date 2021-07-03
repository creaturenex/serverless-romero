const fetch = require('node-fetch')

module.exports = async function (context, req) {

    const THE_ENDPOINT = 'https://cataas.com/cat'

    let resp = await fetch(THE_ENDPOINT, {
        method: 'GET'
    });

    let data = await resp.arrayBuffer()
    // we need to receive it as a buffer since this is an image we are receiving from the API
    // Buffer?? https://developer.mozilla.org/en-US/docs/Web/API/Blob

    context.res = {
        // status: 200, /* Defaults to 200 */
        body: data
    };
}
