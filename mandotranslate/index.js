const fetch = require('node-fetch')

async function translate(toTranslate){
    const url = "https://api.funtranslations.com/translate/mandalorian.json"

    let text = await fetch((url + "?text=" + toTranslate), {
        method: 'POST'})
    return text
}


module.exports = async function (context, req) {
    let transText = await translate("Danger");


    context.res = {
        body: transText.json
    };

    context.done();
}
