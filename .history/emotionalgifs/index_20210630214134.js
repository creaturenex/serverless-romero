var multipart = require('parse-multipart');

module.exports = async function (context, req) {

    var boundary = multipart.getBoundary(req.headers['content-type']);

    var parts = multipart.Parse(req.body, boundary);

    var convertedResult = Buffer.from(parts[0].data).toString('base64');

    context.res = {
        // status: 200, /* Defaults to 200 */
        body: {convertedResult}
    };
    context.done();
}
