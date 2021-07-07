
module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');
    context.log(req.body)

    let parseBody = new URL ("https://test.com/test?" + req.body.toString())
    context.log(parseBody)

    let result = parseBody.searchParams.get('Body')
    context.log(result)

    context.res = {
        // status: 200, /* Defaults to 200 */
        body: result
    };
}
