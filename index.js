const express = require('express')
const app = express()
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const cors = require('cors')
require('dotenv').config()
const port = process.env.PROT || 5000



app.use(cors());
app.use(express.json())



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.BD_PASS}@cluster0.u675lb8.mongodb.net/?retryWrites=true&w=majority`;

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
   
    await client.connect();
    
    const userCollection = client.db("dataStore").collection('users')
    // user get 
    app.get('/users', async(req, res)=>{
       const cursor = userCollection.find()
       const result = await cursor.toArray();
       res.send(result)
    })

     // post api database
     app.post('/users', async(req, res)=>{
       const user = req.body;
       const result = await userCollection.insertOne(user)
       res.send(result)
    })

    // delete api
    app.delete('/users/:id',async(req, res)=>{
      const id = req.params.id
      query = {_id: new ObjectId(id)}
      //console.log('user id delete',id)
      const result = await userCollection.deleteOne(query)
      res.send(result)
    //  const result = await userCollection.deleteOne(id);
    })


  } finally {
   
   // await client.close();
  }
}
run().catch(console.dir);



app.get('/', (req, res) => {
  res.send(`<h1 style="font-size:70px; color:rgb(8, 104, 104); text-align:center; margin:20% auto">😂Database Server Running ✔️</h2>`)

})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})