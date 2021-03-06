const morse = require("morse-code-converter");

module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    const name = (req.query.name || (req.body && req.body.name));
    const responseMessage = name
        ? "Hello, " + name + ". This HTTP triggered function executed successfully."
        : "This HTTP triggered function executed successfully. Pass a name in the query string or in the request body for a personalized response.";


    let text = (req.query.english);
    const code = morse.textToMorse(text)
    const verified_text = morse.morseToText(code)


    context.res = {
        // status: 200, /* Defaults to 200 */
        body: [code, verified_text]
    };
}
