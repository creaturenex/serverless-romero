var piglatin = require('pig-latin')
const Joke = require('awesome-dev-jokes');

module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    var joke = (Joke.getRandomJoke());

    var pigJoke = piglatin(joke)

    context.res = {
        // status: 200, /* Defaults to 200 */
        body: pigJoke
    };
}
