
const multipart = require("parse-multipart")
const connectionString = process.env.MV_STORAGE_CONNECTION_STRING;
const {
    BlobServiceClient
} = require("@azure/storage-blob");

async function uploadFile(parsedBody, ext, filename) {
    const blobServiceClient = BlobServiceClient.fromConnectionString(connectionString);

    const containerName = "images";

    const containerClient = blobServiceClient.getContainerClient(containerName);
    // Get a reference to a container

    const blobName = filename + "." + ext;
    // Create the container

    const blockBlobClient = containerClient.getBlockBlobClient(blobName);
    // Get a block blob client

    const uploadBlobResponse = await blockBlobClient.upload(parsedBody[0].data, parsedBody[0].data.length);
    // upload data to blob

    return ("Your blob is saved!");
};

module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    context.log(req.body)

    const queryObject = querystring.parse(req.body);
    context.log(queryObject)



    let responseMessage = ""

    try {
        let filename = req.headers['blobFileName'];
        context.log(filename)

        let boundary = multipart.getBoundary(req.headers['content-type']);
        context.log(boundary)

        let parsedBody = multipart.Parse(req.body, boundary);
        context.log(parsedBody)

        let filetype = parsedBody[0].type;
        context.log(filetype)

        if (filetype == "image/png") {
            ext = "png";
        } else if (filetype == "image/jpeg") {
            ext = "jpeg";
        } else if (filetype == "image/jpg") {
            ext = "jpg"
        } else {
            username = "invalidimage"
            ext = "";
        }

        responseMessage = await uploadFile(parsedBody, ext, filename);
    } catch (err) {
        context.log("Undefined body image");
        responseMessage = "Sorry! No image attached."
    }

    context.res = {
        body: responseMessage
    };
    context.done();
}


// async function twilioImage(context, req) {
//     var reqbody = req.body
//     context.log(reqbody)

//     context.res = {
//         // status: 200, /* Defaults to 200 */
//         body: reqbody
//     };
// }
