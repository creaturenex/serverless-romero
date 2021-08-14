# Magic Vision

## About Me
**Oscar M Romero**

I am a Software Engineer. I am fascinated by the creativity and fusion of software and hardware. I love learning and I am looking for opportunities to learn and grow with others.


## The Premise

So you decided to learn how to play magic the gathering. You went out, bought all the card packs and spent over $200. You now have a bunch of duplicates or useless cards. Worse you don't even have a card you want or need to use a tournament. This year total payout for the world championship is $250,000 [World Championship](https://magic.gg/news/magic-world-championship-xxvii-prize-payouts-and-appearance-fees)

Use the power of Magic Vision! Magic Vision allows you to take a photo of a magic card. The image is then analyzed and returns a cleaned up photo, current market value, and a link to buy/sell that card.

## Tools used

![MagicVision_dia](/project/images/MagicVision.png)<figcaption align = "center"><b>Fig.1 The Master Plan</b></figcaption><br>

Magic Vision uses [Microsoft's Azure Serverless Functions](https://docs.microsoft.com/en-us/azure/azure-functions/).
This allows us to only worry about our application logic and not setting up, configuring, and maintaining our own server.

Magic Vision is built using three main API's

**[Azure's Computer API](https://docs.microsoft.com/en-us/azure/cognitive-services/computer-vision/overview-ocr)**
- Which allows you to read text from a submitted image

**[Twilio's API](https://www.twilio.com/docs/usage/api)**
- Provided a cellular number to call/text other cellular devices and create an interface for your codebase.

**[Scryfall API](https://scryfall.com/docs/api)**
- An API service that provided all relevant information about magic the gathering playing cards

The code is written in Node.js and uses npm (node package manager) to install
- node-fetch
  - Provide an interface for fetching http resources
- querystring
  - Parses a string into a collection of key-value pairs
- twilio
  - The helper library to make HTTP requests to the Twilio API

## Step by step (with code snippets)
Lets review the code!

![setup_code](/project/images/carbon1.png)
<figcaption align = "center"><b>Fig.2 The Set Up</b></figcaption><br>

Here we set our constants, any required packages, define our endpoints & key. We also define the function `sync delay(milliseconds)` which will be used later.

![setup_code](/project/images/carbon2.png)
<figcaption align = "center"><b>Fig.3 Twilio Part I</b></figcaption><br>

Here we create a query object from the response body sent via webhook from twilio to our magic vision function. This is created using the package querystring.

After we create the query object we parse out the media url which contains the image sent via text message.

We then output the message `Image sent via Twilio`.

    NOTE: JavaScript uses console.log() to output a message.
          Azure Functions uses context.log() to output
          messages to the CLI online.

![setup_code](/project/images/carbon3.png)
<figcaption align = "center"><b>Fig.4 Computer Vision</b></figcaption><br>

This code section has 3 major parts.

First we call the computer vision API with a POST method using the fetch function. We attach the image url in a JSON string format in the request body. This allows the cognitive service to perform the analysis on the image and recognize any text. We also provide the key to the AI service identifying us as the account owner in the request header.

In the fetch response we select the content-type operation-location. This is the url where the analysis took place. This is assigned to the variable ai_read_url for the second part.

Second, we fetch the computer vision API again with a GET method to return the analysis using the location from the step above. This step requires an iteration because of the time it take to perform the analysis. This is were the sync delay function comes into play. It tells the system to wait awhile before fetching. It does this 5 times. There is a conditional to break the for loop if the read_Status is successful.

Last, we just parse the returned text with for the approximate card title and output the message `Probable Card Title`

![setup_code](/project/images/carbon4.png)
<figcaption align = "center"><b>Fig.5 Scryfall</b></figcaption><br>

Here we call the Scryfall API with a fetch method. We pass the card title as a query parameter and we use the keyword `fuzzy` to return any image that kind of matches the provided text incase the analysis returns text with errors or extra characters.

We return the relevant card information and parse the card image, prices and a link to purchase the card.

![setup_code](/project/images/carbon5.png)
<figcaption align = "center"><b>Fig.6 Twilio Part II</b></figcaption><br>

Last thing we do is send a response message to the magic vision number with the appropriate variables passed in. This accomplished with the twilio package and the `Message Response()` function.

**Frontend**

![Frontend](https://www.youtube.com/watch?v=Zrq0fxZiT0g&t=1s)


<figure class="video_container">
  <iframe src="https://www.youtube.com/embed/enMumwvLAug" frameborder="0" allowfullscreen="true"> </iframe>
</figure>


**Backend**

  <iframe src="https://www.youtube.com/watch?v=LvKEBEadM4w" frameborder="0" allowfullscreen="true"> </iframe>

![Backend]()

## Challenges + lessons learned

## Thanks and Acknowledgements
