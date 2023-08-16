let express = require('express');
let app = express();
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://rajasinghbhataria:raja123@cluster0.tmzgpgd.mongodb.net/?retryWrites=true&w=majority";

let port = process.env.port || 3000;
let collection;

app.use(express.json());
app.use(express.urlencoded({extended: false}));

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});


async function runDBConnection() {
    try {
        await client.connect();
        collection = client.db().collection('Cat');
        console.log(collection);
    } catch(ex) {
        console.error(ex);
    }
}
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});




app.post('/api/cat', async (req, res) => {
    try {
        const cat = req.body;
        const result = await postCat(cat);
        res.status(201).json({ statusCode: 201, data: result, message: 'Success' });
    } catch (err) {
        res.status(500).json({ statusCode: 500, message: 'Internal server error' });
    }
});
app.get('/api/cats', async (req, res) => {
    try {
        const result = await getAllCats();
        res.json({ statusCode: 200, data: result, message: 'Get all cats successful' });
    } catch (err) {
        res.status(500).json({ statusCode: 500, message: 'Internal server error' });
    }
});
async function postCat(cat) {
    return collection.insertOne(cat);
}

async function getAllCats() {
    return collection.find({}).toArray();
}
app.listen(port, async () => {
    console.log('Express server started');
    await runDBConnection();
});