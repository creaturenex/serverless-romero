const fetch = require('node-fetch');

module.exports = async function (context, req) {
    var names = ["Shreya", "Emily", "Fifi", "Beau", "Evelyn", "Julia", "Daniel", "Fardeen"]
    var random_value = Math.floor(names.length * Math.random())
    var resultname = names[random_value]

    let resp = await fetch('https://cataas.com/cat/cute/says/Bitcamp', {
        method: 'GET'
    });
    let data = await resp.arrayBuffer()
    let cat1img = Buffer.from(data).toString('base64')

    let resp = await fetch('https://cataas.com/cat/cute/says/Bitcamp', {
        method: 'GET'
    });
    let data = await resp.arrayBuffer()
    let cat2img = Buffer.from(data).toString('base64')



    context.res = {
        // status: 200, /* Defaults to 200 */
        body: {
            cat1:base64data

        }
    };
}
