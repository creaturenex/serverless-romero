const CosmosClient = require("@azure/cosmos").CosmosClient;

const config = {
    endpoint: process.env.COSMO_ENDPOINT,
    key: process.env.COSMO_KEY,
    databaseId: "SecretStorer",
    containerId: "secrets",
    partitionKey: {
        kind: "Hash",
        paths: ["/secrets"]
    }
};

async function create(client) {
    const {
        database
    } = await client.databases.createIfNotExists({
        id: config.databaseId
    });

    const {
        container
    } = await client
        .database(config.databaseId)
        .containers.createIfNotExists({
            id: config.containerId,
            key: config.partitionKey
        }, {
            offerThroughput: 400
        });

}

async function createDocument(newItem) {
    var { endpoint, key, databaseId, containerId } = config;
    const client = new CosmosClient({endpoint, key});
    const database = client.database(databaseId);
    const container = database.container(containerId);
    await create(client, databaseId, containerId);

    const querySpec = {
        query: "SELECT * from c"
    };

    const { resources: items } = await container.items.query(querySpec).fetchAll();

    const {resource: createdItem} = await container.items.create(newItem);

    return items
}

module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    let parseBody = new URL("https://test.com/test?" + req.body.toString())
    console.log(parseBody)
    let message = parseBody.searchParams.get('Body')
    context.log(message)
    let document = { "message" : message }

    let items = await createDocument(document);
    context.log(items)

    var random_value = Math.floor(items.length * Math.random());

    const responseMessage = `Thanks 😊! Stored your secret "${message}". 😯 Someone confessed that: ${JSON.stringify(items[random_value].message)}`

    context.res = {
        // status: 200, /* Defaults to 200 */
        body: responseMessage
    };
}
