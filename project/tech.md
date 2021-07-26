# Technologies

## Azure Services

**Azure Function**
- To perform the computational workload for the application

**AzureBlob**
- Image sent via Twilio will be upload to blob
- Blob Image URL will be used by Computer Vision for analysis

**Computer Vision**
- Computer Vision is meant to extract text from a card image which will be used to as parameters sent to the MTG API
- Computer Vision AI will get the image from Twilio Webhook through the azure function that will then be forward directly to the Computer Vision AI. Text will then be returned and pass to the MTG API to return relevant card prices and build a deck online
- The endpoint and url were configured as process accessible variables within the magic vision function

**CosmoDB** - **This is a major issue how do we tackle this?**
 - **NOT** required right now as I can return the current value of a card in text message but I need to build up the online card functionality
- What data am I interested in?
  - User ID unique identifier
    - store each card information
    - name
    - deck color
    - card flavor text
    - Mana Cost
    - card type
  - Card market value
    - collect new market value everyday?
    - trend data


## APIs

**Name of API**
- Twilio - SMS Webhook
  - Send an image using your smartphone to a twilio number that will forward the image to Computer Vision through the Azure function
- [Scryfall](https://scryfall.com/docs/api)
  - a powerful Magic: The Gathering card search that also included current market values for cards


## Packages/Libraries/Databases

Per Azure Computer Vision Documentation

**@azure/cognitiveservices-computervision for node.js**
- provides methods to interact with the computer vision client

**async for node.js**
- provides functions for working with asynchronous JavaScript

> **NOTE: Possible Uses, I have not determined yet**
> - **@azure/cosmos**
>   - to provide functions to interact with Azure Cosmo DB
> - **@azure/storage-blob**
>   - to provide functions to interact with Azure Blob Storage
> - **node-fetch**
>   - to provide functions that allow fetching HTTP request
> - **parse-multipart**
>   - to provide functions to breakdown multipart/form data? Ask Emily!
> - **querystring**
>   - to provide functions to parse given URL

## Front-end Languages

**Name of Language**
- Javascript
    - Language used to control azure function
- HTML/CSS
  - Bootstrap - **This will take some time**
    - I want to create an online deck where you can view your cards, how many you own and current market price

## Flowchart

still working on this
[Replace with image of final flowchart]

## Resources
 - [Azure Computer Vision Documentation](https://docs.microsoft.com/en-us/azure/cognitive-services/computer-vision/quickstarts-sdk/client-library?tabs=visual-studio&pivots=programming-language-javascript)
 - [Example of GET method to Scryfall API](https://api.scryfall.com/cards/named?exact="AdultGoldDragon")


## FUTURE GOALS
- Azure Mobile App
  - create ios/android dedicated app
- Handle multiple cards in one image
- Need to figure out how to handle multiple users
