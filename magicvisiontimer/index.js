const { BlobServiceClient } = require("@azure/storage-blob");
const connectionString = process.env.MV_STORAGE_CONNECTION_STRING;
const account = "magicvision";

async function deleteBlob(filename, deleteFromContainerClient) {
    const deleteblockBlobClient = deleteFromContainerClient.getBlockBlobClient(filename);
    const downloadBlockBlobResponse = await deleteblockBlobClient.download(0); // 0 refers to the position of the blob to download
    const blobDeleteResponse = deleteblockBlobClient.delete();

    result = {
        body: {
            deletename: filename,
            success: true
        }
    };
    return result;
}

module.exports = async function (context, myTimer) {
    let timeStamp = new Date().toISOString();

    const blobServiceClient = await BlobServiceClient.fromConnectionString(connectionString);
    const deleteFromContainerClient = await blobServiceClient.getContainerClient("images");

    for await (const blob of deleteFromContainerClient.listBlobsFlat()) {
        context.log('\t', blob.name);
        await deleteBlob(blob.name, deleteFromContainerClient);
        // access the blob's name and call deleteBlob to delete it!
    }

    context.log("Just deleted your blobs!")

    if (myTimer.isPastDue) { context.log('Javascript is running late!'); }
    context.log('Javascript timer trigger function ran!', timeStamp);
};
