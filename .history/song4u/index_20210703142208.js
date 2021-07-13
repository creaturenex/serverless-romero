const queryObject = querystring.parse(req.body);

module.exports = async function (context, req) {
    const queryObject = querystring.parse(req.body);

    context.log(queryObject)

    context.res = {
        body: queryObject.MediaUrl0
     };

}
