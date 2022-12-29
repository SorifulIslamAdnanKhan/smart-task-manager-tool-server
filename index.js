const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;

const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();

// Middleware
app.use(cors());
app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.3aa5vlu.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
       
        // Database Collections

        const taskCollection = client.db("smartTaskManagerTool").collection("tasks");

        // Task API

        app.post('/task', async (req, res) => {
            const task = req.body;
            console.log(task);
            const result = await taskCollection.insertOne(task);
            res.send(result);
        });

        // app.patch('/task/:id', async (req, res)=>{
        //     const id = req.params.id;
        //     const query = { _id: ObjectId(id) }
        //     const advertise = req.body.advertise;
        //     const updatedDoc = {
        //         $set: {
        //             advertise: 'True',
        //         }
        //     }
        //     const result = await taskCollection.updateOne(query, updatedDoc);
        //     res.send(result);
        // });

        // app.get('/products', async (req, res)=>{
        //     let query = {};

        //     if(req.query.category){
        //         query= {
        //             category: req.query.category
        //         }
        //     }

        //     const cursor = productsCollection.find(query);
        //     const products = await cursor.toArray();
        //     res.send(products);
        // })

        // app.get('/my-products', async (req, res) => {

        //     let query = {};

        //     if(req.query.sellerEmail){
        //         query= {
        //             sellerEmail: req.query.sellerEmail
        //         }
        //     }

        //     const cursor = productsCollection.find(query);
        //     const products = await cursor.toArray();
        //     res.send(products);
        // });

        // app.delete('/product/:id', async (req, res)=>{
        //     const id = req.params.id;
        //     const query = {_id:ObjectId(id)};
        //     const result = await productsCollection.deleteOne(query);
        //     res.send(result);
        // });

    }
    finally {

    }
}

run().catch(err => console.log(err));

app.get('/', (req, res) =>{
    res.send('Smart task manager lool running');
});

app.listen(port, ()=>{
    console.log(`Smart task manager lool running on ${port}`);
})