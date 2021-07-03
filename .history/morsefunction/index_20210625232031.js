const morse = require("morse-code-converter");

module.exports = async function (context, req) {

    const code = morse.textToMorse( (req.query.english));
    const verified_text = morse.morseToText(code);

    context.res = {
        // status: 200, /* Defaults to 200 */
        body: [code, verified_text]
    };
}
