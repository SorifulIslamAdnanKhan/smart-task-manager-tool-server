const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;

const { MongoClient, ServerApiVersion, MongoRuntimeError, ObjectId } = require('mongodb');

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
        const commentCollection = client.db("smartTaskManagerTool").collection("comments");

        // Task API

        app.post('/task', async (req, res) => {
            const task = req.body;
            const result = await taskCollection.insertOne(task);
            res.send(result);
        });

        app.get('/my-tasks', async (req, res) => {

            let query = {};

            if(req.query.userEmail){
                query= {
                    userEmail: req.query.userEmail
                }
            }

            const cursor = taskCollection.find(query);
            const tasks = await cursor.toArray();
            res.send(tasks);
        });

        app.delete('/task/:id', async (req, res)=>{
            const id = req.params.id;
            const query = {_id:ObjectId(id)};
            const result = await taskCollection.deleteOne(query);
            res.send(result);
        });

        app.get('/task/:id', async (req, res) => {
            const id = req.params.id;
            const filter = { _id: ObjectId(id) }
            const result = await taskCollection.findOne(filter)
            res.send(result);
        })

        app.patch('/task/:id', async (req, res)=>{
            const id = req.params.id;
            const query = { _id: ObjectId(id) }
            const task = req.body;
            const updatedDoc = {
                $set: {
                    name: task.name,
                    image: task.image,
                }
            }
            const result = await taskCollection.updateOne(query, updatedDoc);
            res.send(result);
        });

        app.put('/task/:id', async (req, res)=>{
            const id = req.params.id;
            const query = { _id: ObjectId(id) }
            const complete = req.body.complete;
            const option = {upsert: true}
            const updatedDoc = {
                $set: {
                    complete: 'True',
                }
            }
            const result = await taskCollection.updateOne(query, updatedDoc, option);
            res.send(result);
        });

        app.get('/tasks/complete', async (req, res)=>{
            const complete = req.params.complete;
            const query = {complete: 'True'};
            const result = await taskCollection.find(query).toArray();
            res.send(result);
        });

        app.delete('/tasks/complete/:id', async (req, res)=>{
            const id = req.params.id;
            const query = {_id:ObjectId(id)};
            const result = await taskCollection.deleteOne(query);
            res.send(result);
        });

        app.get('/tasks/complete/:id', async (req, res) => {
            const id = req.params.id;
            const filter = { _id: ObjectId(id) }
            const result = await taskCollection.findOne(filter)
            res.send(result);
        })

        app.patch('/tasks/complete/:id', async (req, res)=>{
            const id = req.params.id;
            const query = { _id: ObjectId(id) }
            const complete = req.body.complete;
            const updatedDoc = {
                $set: {
                    complete: 'False',
                }
            }
            const result = await taskCollection.updateOne(query, updatedDoc);
            res.send(result);
        });

        // Comment API

        app.post('/comment', async (req, res) => {
            const task = req.body;
            const result = await commentCollection.insertOne(task);
            res.send(result);
        });

        app.get('/my-comments', async (req, res) => {

            let query = {};

            if(req.query.userEmail){
                query= {
                    userEmail: req.query.userEmail
                }
            }

            const cursor = commentCollection.find(query);
            const comments = await cursor.toArray();
            res.send(comments);
        });

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