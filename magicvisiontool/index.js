'use strict';

const async = require('async');
const fs = require('fs');
const https = require('https');
const path = require("path");
const createReadStream = require('fs').createReadStream
const sleep = require('util').promisify(setTimeout);
const ComputerVisionClient = require('@azure/cognitiveservices-computervision').ComputerVisionClient;
const ApiKeyCredentials = require('@azure/ms-rest-js').ApiKeyCredentials;

/**
 * AUTHENTICATE
 * This single client is used for all examples.
 */
// const key = process.env.MAGICVISIONAIKEY;
// const endpoint = process.env.MAGICVISIONAIENDPOINT;

const key = 'f3aec0047e014d84a38984247d1f6e4b';
const endpoint = 'https://magicvisionai.cognitiveservices.azure.com/';

const computerVisionClient = new ComputerVisionClient(
    new ApiKeyCredentials({ inHeader: { 'Ocp-Apim-Subscription-Key': key } }), endpoint);

function computerVision() {
    async.series([
        async function () {

                // URL images containing printed and/or handwritten text.
                // The URL can point to image files (.jpg/.png/.bmp) or multi-page files (.pdf, .tiff).
                const printedTextSampleURL = 'https://c1.scryfall.com/file/scryfall-cards/large/front/6/7/67a76010-d932-4727-8b5e-b8e2d14e1362.jpg?1624997941';


                // Status strings returned from Read API. NOTE: CASING IS SIGNIFICANT.
                // Before Read 3.0, these are "Succeeded" and "Failed"
                const STATUS_SUCCEEDED = "succeeded";
                const STATUS_FAILED = "failed"


                // Recognize text in printed image from a URL
                console.log('Read printed text from URL...', printedTextSampleURL.split('/').pop());
                const printedResult = await readTextFromURL(computerVisionClient, printedTextSampleURL);
                printRecText(printedResult);

                // Perform read and await the result from URL
                async function readTextFromURL(client, url) {
                    // To recognize text in a local image, replace client.read() with readTextInStream() as shown:
                    let result = await client.read(url);
                    console.log(result)

                    // Operation ID is last path segment of operationLocation (a URL)
                    let operation = result.operationLocation.split('/').slice(-1)[0];
                    console.log(operation)

                    // Wait for read recognition to complete
                    // result.status is initially undefined, since it's the result of read
                    while (result.status !== STATUS_SUCCEEDED) {
                        await sleep(1000);
                        result = await client.getReadResult(operation);
                    }
                    return result.analyzeResult.readResults; // Return the first page of result. Replace [0] with the desired page if this is a multi-page file such as .pdf or .tiff.
                }

                // Prints all text from Read result
                function printRecText(readResults) {
                    console.log('Recognized text:');
                    for (const page in readResults) {
                        if (readResults.length > 1) {
                            console.log(`==== Page: ${page}`);
                        }
                        const result = readResults[page];
                        if (result.lines.length) {
                            for (const line of result.lines) {
                                console.log(line.words.map(w => w.text).join(' '));
                            }
                        } else {
                            console.log('No recognized text.');
                        }
                    }
                }

            },
            function () {
                return new Promise((resolve) => {
                    resolve();
                })
            }
    ], (err) => {
        throw (err);
    });
}

computerVision();
