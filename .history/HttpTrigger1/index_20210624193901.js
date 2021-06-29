module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    const password = (req.query.password);

    const responseMessage = (password == "letmein")
        ? "Access Granted"
        : "Access Denied"

    context.res = {
        // status: 200, /* Defaults to 200 */
        body: responseMessage
    };
}
