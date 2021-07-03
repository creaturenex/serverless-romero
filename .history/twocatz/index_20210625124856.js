const fetch = require('node-fetch')

module.exports = async function (context, req) {

    let resp = await fetch('https://cataas.com/cat', {
        method: 'GET'
    });

    let data = await resp.arrayBuffer()


    const response = ()

    context.res = {
        // status: 200, /* Defaults to 200 */
        body: data
    };
}
