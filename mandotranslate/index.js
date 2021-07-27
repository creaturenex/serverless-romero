const fetch = require('node-fetch')

module.exports = async function (context, req) {

    const url = "https://api.funtranslations.com/translate/mandalorian.json?"
    console.log(url)

    let translation = await fetch((url), {
        method: 'POST',
        headers: {
            'text': "I'd like a pint of ale",
        },
        body: "",
    })
    console.log(translation)

    context.res = {
        body: translation
    };

    context.done();
}
