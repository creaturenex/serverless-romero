const fetch = require("node-fetch")
const multipart = require("parse-multipart")
const connectionString = process.env.AZURE_STORAGE_CONNECTION_STRING;
const {
    BlobServiceClient
} = require("@azure/storage-blob");

async function uploadFile(parsedBody, ext) {
    const blobServiceClient = BlobServiceClient.fromConnectionString(connectionString);
    const containerName = "images";
    const containerClient = blobServiceClient.getContainerClient(containerName); // Get a reference to a container

    const blobName = 'test.' + ext; // Create the container
    const blockBlobClient = containerClient.getBlockBlobClient(blobName); // Get a block blob client

    // upload data to blob
    const uploadBlobResponse = await blockBlobClient.upload(parsedBody[0].data, parsedBody[0].data.length);

    return "Your Blob is saved."
};

module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    let boundary = multipart.getBoundary(req.headers['content-type']);
    // let body = req.body;
    let parsedBody = multipart.Parse(req.body, boundary);

    let filetype = parsedBody[0].type;
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

    let responseMessage = await uploadFile(parsedBody, ext);

    context.res = {
        body: responseMessage
    };
    context.done();
}
