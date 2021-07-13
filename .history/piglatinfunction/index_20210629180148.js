var piglatin = require('pig-latin')
const Joke = require('awesome-dev-jokes');

module.exports = async function (context, req) {
    context.log('Making a pig joke');

    var joke = (Joke.getRandomJoke());
    // Some of the jokes returned will cause the piglatin function to work incorrectly, mostly likely due to weird characters.

    jokeNoQuotes = (joke.replace(/"/g,""));

    context.log(jokeNoQuotes);

    var pigJoke = piglatin(jokeNoQuotes);

    context.res = {
        // status: 200, /* Defaults to 200 */
        body: pigJoke
    };
}
