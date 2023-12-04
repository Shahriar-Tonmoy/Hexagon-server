const express = require('express')
const app = express();
const cors = require('cors');
require('dotenv').config()
const { MongoClient, ServerApiVersion } = require('mongodb');
const ObjectId = require('mongodb').ObjectId;
const port = process.env.PORT || 3000;

app.use(cors());
  app.use(express.json());
  
  
  app.get('/', (req, res)=>{
      res.send('Hexagon server is ready');
  })
  
  app.listen(port, ()=>{
      console.log('SERVER IS RUNNING!!', port);  
  })

//MongoDB
const uri = `mongodb+srv://${process.env.DB_NAME}:${process.env.DB_PASS}@cluster0.uqk8yhb.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});


const database = client.db("HexagonDB");
const usersCollection = database.collection("users");
const propertiesCollection = database.collection("properties");
const WishlistCollection = database.collection("wishlist");
const ReviewsCollection = database.collection("reviews");
const offersCollection = database.collection("offers");

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    //await client.connect();

    //get some data
    app.get('/properties', async (req, res) =>{
        
        console.log(req.query.agentEmail);
        let query = {};
        if(req.query?.agentEmail){
            query = {agentEmail: req.query.agentEmail}
        }

        const cursor = propertiesCollection.find(query);
        const result = await cursor.toArray();
        res.send(result);
      })

    app.get('/reviews', async (req, res) =>{
        
        console.log(req.query.propertyId);
        let query = {};
        if(req.query?.propertyId){
            query = {propertyId: req.query.propertyId};
        }
        else if(req.query?.userEmail){
            query = {userEmail: req.query.userEmail};
        }

        const cursor = ReviewsCollection.find(query);
        const result = await cursor.toArray();
        res.send(result);
      })
    app.get('/wishlist', async (req, res) =>{
        
        console.log(req.query.userEmail);
        let query = {};
        if(req.query?.userEmail){
            query = {userEmail: req.query.userEmail}
        }

        const cursor = WishlistCollection.find(query);
        const result = await cursor.toArray();
        res.send(result);
      })
    app.get('/offers', async (req, res) =>{
        
        console.log(req.query.BuyerEmail);
        let query = {};
        if(req.query?.BuyerEmail){
            query = {BuyerEmail: req.query.BuyerEmail}
        }

        const cursor = offersCollection.find(query);
        const result = await cursor.toArray();
        res.send(result);
      })

    //get all data
    app.get('/users', async (req, res) =>{
          const cursor = usersCollection.find();
          const result = await cursor.toArray();
          res.send(result);
        })
    app.get('/properties', async (req, res) =>{
          const cursor = propertiesCollection.find();
          const result = await cursor.toArray();
          res.send(result);
        })
    app.get('/wishlist', async (req, res) =>{
          const cursor = WishlistCollection.find();
          const result = await cursor.toArray();
          res.send(result);
        })
    app.get('/reviews', async (req, res) =>{
          const cursor = ReviewsCollection.find();
          const result = await cursor.toArray();
          res.send(result);
        })
    app.get('/offers', async (req, res) =>{
          const cursor = offersCollection.find();
          const result = await cursor.toArray();
          res.send(result);
        })

    //get one data
    app.get('/properties/:id', async (req, res) =>{
        const id = req.params.id;
        const query = {_id: new ObjectId(id)};
        const property = await propertiesCollection.findOne(query);
        res.send(property);
      })
    //create data or insert a data to database
    app.post("/users", async (req, res) => {
        console.log(req.body);
        const newUser = req.body;
        const result = await usersCollection.insertOne(newUser);
        res.send(result);
        console.log(result);       
    });

    app.post("/properties", async (req, res) => {
        console.log(req.body);
        const newProperty = req.body;
        const result = await propertiesCollection.insertOne(newProperty);
        res.send(result);
        console.log(result);       
    });

    app.post("/wishlist", async (req, res) => {
        console.log(req.body);
        const newWishList = req.body;
        const result = await WishlistCollection.insertOne(newWishList);
        res.send(result);
        console.log(result);       
    });

    app.post("/reviews", async (req, res) => {
        console.log(req.body);
        const newReview = req.body;
        const result = await ReviewsCollection.insertOne(newReview);
        res.send(result);
        console.log(result);       
    });

    app.post("/offers", async (req, res) => {
        console.log(req.body);
        const newOffer = req.body;
        const result = await offersCollection.insertOne(newOffer);
        res.send(result);
        console.log(result);       
    });


    //Delete data
    app.delete('/properties/:cid', async(req, res) => {
        const id  = req.params.cid;
        console.log(`PLEASE DELETE ID FROM DATABASE: ${id}`);
        const query = { _id: new ObjectId(id)};
        console.log(query);
        
        const result = await propertiesCollection.deleteOne(query);
        res.send(result);
      })
    app.delete('/wishlist/:cid', async(req, res) => {
        const id  = req.params.cid;
        console.log(`PLEASE DELETE ID FROM DATABASE: ${id}`);
        const query = { _id: new ObjectId(id)};
        console.log(query);
        
        const result = await WishlistCollection.deleteOne(query);
        res.send(result);
      })
    app.delete('/reviews/:cid', async(req, res) => {
        const id  = req.params.cid;
        console.log(`PLEASE DELETE ID FROM DATABASE: ${id}`);
        const query = { _id: new ObjectId(id)};
        console.log(query);
        
        const result = await ReviewsCollection.deleteOne(query);
        res.send(result);
      })
    app.delete('/users/:cid', async(req, res) => {
        const id  = req.params.cid;
        console.log(`PLEASE DELETE ID FROM DATABASE: ${id}`);
        const query = { _id: new ObjectId(id)};
        console.log(query);
        
        const result = await usersCollection.deleteOne(query);
        res.send(result);
      })

    //api for update data
    app.patch('/properties/:id', async(req, res) =>{
        const id = req.params.id;
        const filter = {_id: new ObjectId(id)}
        const updateStatus = req.body;
        console.log(updateStatus);
        const updateDoc = {
            $set: {
              status: updateStatus.status
            },
          };
        const result = await propertiesCollection.updateOne(filter, updateDoc);
        res.send(result);
    })
    app.patch('/users/:id', async(req, res) =>{
        const id = req.params.id;
        const filter = {_id: new ObjectId(id)}
        const updateData = req.body;
        console.log(updateData);
        const updateDoc = {
            $set: {
              role: updateData.role,
              fraud: updateData.fraud
            },
          };
        const result = await usersCollection.updateOne(filter, updateDoc);
        res.send(result);
    })

    app.put('/properties/:id', async (req, res) => {
        const id = req.params.id;
        const toBeUpdatedProperty = req.body;
        console.log(toBeUpdatedProperty);
        const query = { _id: new ObjectId(id)};
        const options = { upsert: true };
        const updateProperty = {
          $set: {
            image:toBeUpdatedProperty.fImage,
            title:toBeUpdatedProperty.fPropertyTitle,
            location:toBeUpdatedProperty.fLocation,
            agentName:toBeUpdatedProperty.fAgentName,
            agentEmail:toBeUpdatedProperty.fAgentEmail,
            priceRange:toBeUpdatedProperty.fPriceRange,
          }
        }
        const result = await propertiesCollection.updateOne(query, updateProperty, options);
        res.send(result);
      })


    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    //await client.close();
  }
}
run().catch(console.dir);
