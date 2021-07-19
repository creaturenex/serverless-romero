const fetch = require('node-fetch');

// function generate_name() {
//     var names = ["Shreya", "Emily", "Fifi", "Beau", "Evelyn", "Julia", "Daniel", "Fardeen"];
//     var random_value = Math.floor(names.length * Math.random());
//     var random_name = names[random_value];
//     return random_name
// }

async function generate_cat(name) {
    let resp = await fetch('https://cataas.com/cat/says/' + name, {
            method: 'GET'
        });
        let data = await resp.arrayBuffer();
        let cat = Buffer.from(data).toString('base64');
        return cat;
    };

// function multipleCats(names, cats){
//     4.times do {
//         let i = 1

//     }

// }

// let names
// let cats = []

module.exports = async function (context, req) {
    // let name1 = generate_name();
    // let name2 = generate_name();
    let name1 = req.query.name1;
    let name2 = req.query.name2;
    let name3 = req.query.name3;
    let name4 = req.query.name4;

    let catpic1 = await generate_cat(name1);
    let catpic2 = await generate_cat(name2);
    let catpic3 = await generate_cat(name3);
    let catpic4 = await generate_cat(name4);

    context.res = {
        // status: 200, /* Defaults to 200 */
        body: {
            cat1: catpic1,
            cat2: catpic2,
            cat3: catpic3,
            cat4: catpic4
        }
    };
};
