const express=require('express');
const cors =require('cors');

const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config();


const app=express();
const port=process.env.PORT || 5000;






app.use(cors());
app.use(express.json());





const uri = `mongodb+srv://${process.env.DB_User}:${process.env.DB_PASSWORD}@cluster0.9b6ho97.mongodb.net/?retryWrites=true&w=majority`;
//console.log(uri);

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");

  const ServiceCollection=client.db("GeniusCar").collection("Services");

  // read data from Database , find all data
  app.get('/services',async(req,res)=>{
    const query={};  
    const cursor=ServiceCollection.find(query);
    const services=await cursor.toArray(); // convert array all data
    res.send(services); 
  })
// find a data 
 app.get('/services/:id',async (req,res)=>{
  const id=req.params.id;
  const query={_id: new ObjectId(id)};
  const service=await ServiceCollection.findOne(query);
  res.send(service);
 })


  } finally {
    // Ensures that the client will close when you finish/error
    //await client.close();
  }
}
run().catch(console.dir);


 app.get('/',(req,res)=>{
    res.send('hello from node mongo server ');
 })


 app.listen(port ,()=>{
    console.log(`listening to port ${port} `);
 })
