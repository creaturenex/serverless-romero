module.exports = async function (context, req) {
    // This will output to the console/terminal?
    context.log('JavaScript HTTP trigger function processed a request.');

    // req = request and res = response

    const name = (req.query.name || (req.body && req.body.name));
    // ternary operator below. boolean_check? return if true : return if false
    const responseMessage = name
        ? "Hello, " + name + ". This HTTP triggered function executed successfully."
        : "This HTTP triggered function executed successfully. Pass a name in the query string or in the request body for a personalized response.";

    context.res = {
        // status: 200, /* Defaults to 200 */
        body: responseMessage
    };
}

const password = (req.query.password || (req.body && req.body.password));
    // ternary operator below. boolean_check? return if true : return if false
    const responseMessage = password
        ? "This is the password" + password + ". This HTTP triggered function executed successfully."
        : "This HTTP triggered function executed successfully. Pass a password in the query string or in the request body to view the password in the response.";
