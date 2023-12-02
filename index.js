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