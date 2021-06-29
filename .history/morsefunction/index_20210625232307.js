const morse = require("morse-code-converter");

module.exports = async function (context, req) {
    let plaintext = (req.query.plaintext);
    const code = morse.textToMorse(text);
    const verified_text = morse.morseToText(code);

    context.res = {
        // status: 200, /* Defaults to 200 */
        body: [code, verified_text]
    };
}
