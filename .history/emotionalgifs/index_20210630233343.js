var multipart = require('parse-multipart');

module.exports = async function (context, req) {

    var boundary = multipart.getBoundary(req.headers['content-type']);
    console.log(boundary)

    var parts = multipart.Parse(req.body, boundary);
    console.log(parts)

    var convertedResult = Buffer.from(parts[0].data).toString('base64');
    console.log(convertedResult)

    const responseMessage = (convertedResult)
        ? convertedResult
        : "Please post an image in the body"

        context.res = {
        // status: 200, /* Defaults to 200 */
        body: responseMessage
    };
    context.done();
}

