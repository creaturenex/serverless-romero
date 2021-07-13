module.exports = async function (context, req) {
    var reqbody = req.body
    context.log(reqbody)

    context.res = {
        // status: 200, /* Defaults to 200 */
        body: reqbody
    };
}

