const fetch = require('node-fetch');

function generate_name() {
    var names = ["Shreya", "Emily", "Fifi", "Beau", "Evelyn", "Julia", "Daniel", "Fardeen"];
    var random_value = Math.floor(names.length * Math.random());
    var random_name = names[random_value];
    return random_name
}

async function generate_cat() {
    let resp = await fetch('https://cataas.com/cat/cute/says/Bitcamp', {
            method: 'GET'
        });
        let data = await resp.arrayBuffer();
        let cat = Buffer.from(data).toString('base64');
        return cat
    };

module.exports = async function (context, req) {
    let name1 = generate_name();
    let name2 = generate_name();
    let catpic1 = generate_cat();
    let catpic2 = generate_cat();

    context.res = {
        // status: 200, /* Defaults to 200 */
        body: {
            cat1: catpic1,
            cat2: catpic2,
            names: [
                name1,
                name2
            ]
        }
    };
}
