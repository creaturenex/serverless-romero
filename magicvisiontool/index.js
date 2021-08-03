'use strict';

const querystring = require('querystring'); //twilio
const async = require('async');
const fs = require('fs');
const https = require('https');
const path = require("path");
const createReadStream = require('fs').createReadStream
const sleep = require('util').promisify(setTimeout);
const ComputerVisionClient = require('@azure/cognitiveservices-computervision').ComputerVisionClient;
const ApiKeyCredentials = require('@azure/ms-rest-js').ApiKeyCredentials;

module.exports = async function (context, req) {
    const key = process.env.MAGICVISIONAIKEY;
    const endpoint = process.env.MAGICVISIONAIENDPOINT;

    const computerVisionClient = new ComputerVisionClient(new ApiKeyCredentials({
        inHeader: {
            'Ocp-Apim-Subscription-Key': key
        }
    }), endpoint);

    function computerVision(imageUrl) {
        async.series([
            async function () {

                    const STATUS_SUCCEEDED = "succeeded";
                    const STATUS_FAILED = "failed"

                    // Recognize text in printed image from a URL
                    context.log('Read printed text from URL...', imageUrl.split('/').pop());
                    const printedResult = await readTextFromURL(computerVisionClient, imageUrl);
                    printRecText(printedResult);

                    // Perform read and await the result from URL
                    async function readTextFromURL(client, url) {
                        // To recognize text in a local image, replace client.read() with readTextInStream() as shown:
                        let result = await client.read(url);
                        context.log(result)

                        // Operation ID is last path segment of operationLocation (a URL)
                        let operation = result.operationLocation.split('/').slice(-1)[0];
                        context.log(operation)

                        // Wait for read recognition to complete
                        // result.status is initially undefined, since it's the result of read
                        while (result.status !== STATUS_SUCCEEDED) {
                            await sleep(1000);
                            result = await client.getReadResult(operation);
                        }
                        return result.analyzeResult.readResults;
                        // Return the first page of result.
                    }

                    // Prints all text from Read result
                    function printRecText(readResults) {

                        context.log('Recognized text:');
                        for (const page in readResults) {
                            if (readResults.length > 1) {
                                context.log(`==== Page: ${page}`);
                            }
                            const result = readResults[page];
                            if (result.lines.length) {
                                context.log('<<<' + result.lines[0].text + '>>>') //<<<<<<<<<<<<< I want this!!!!(result.lines[0].text) return this so I can access it and pass it as an argument to Scryfall with a simple fetch function
                                for (const line of result.lines) {
                                    context.log(line.words.map(w => w.text).join(' '));
                                }
                            } else {
                                context.log('No recognized text.');
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


    // twilio section

    context.log('JavaScript HTTP trigger function processed a request.');
    const queryObject = querystring.parse(req.body);
    let cardUrl = queryObject.MediaUrl0

    computerVision(cardUrl) //scoping issues we think! how to access result in nested function

    context.res = {
        body: 'Image scanned' //responseMessage
    };
    context.done();
}
