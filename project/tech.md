# Technologies

### Azure Services
**Azure Function**
- To perform the Application workload/ computational

**AzureBlob**
- store image online as API uses URL to read image
  - is this required? I can just store the url

**Computer Vision**
- Computer Vision is meant to extract text from a card image which will be used to as parameters sent to the MTG API
- Comuter Vision AI will get the image from Twilio Webhook through the azure function that will then be forward directly to the Computer Vision AI. Text will then be returned and pass to the MTG API to return relevant card prices and build a deck online.
- created a computer vision resource so that our function can forward the image for processing using a CV endpoint and key
- The endpoint and url were configured as process accessible variables within the magic vision function

**CosmoDB**
- store user information?
 - as of right now I can just return the current value of a card in text message but need to build up the online card functionality, doesn't require a DB
- need to outline this
  if user ID matches add all relevant card scans to user ID
  the online deck would pull all relevant card info
-

**FUTURE GOAL**
- Azure Mobile App
  - create ios/android dedicated app
- Handle multiple cards in one image?
### APIs

**Name of API**
- Twilio - SMS Webhook
  - Send an image using your smartphone to a twilio number that will forward the image to Computer Vision through the Azure function
- [Scryfall](https://scryfall.com/docs/api)
  - a powerful Magic: The Gathering card search that also included current market values for cards



### Packages/Libraries/Databases
pending

**Name of Packages/Library/Database**
- [replace with bullet list of what purpose(s) it serves for my project]
- [include how it will interact with other components of your project listed above/below]

### Front-end Languages

**Name of Language**
- Javascript
    - Language used to control azure function
- [include how it will interact with other components of your project listed above/below]

### Flowchart

still working on this
[Replace with image of final flowchart]
