module.exports = async function (context, req) {
    // This will output to the console/terminal?
    context.log('JavaScript HTTP trigger function processed a request.');

    // req = request and res = response

    const password = (req.query.password || (req.body && req.body.password));

    context.res = {
        // status: 200, /* Defaults to 200 */
        body: password
    };
}
