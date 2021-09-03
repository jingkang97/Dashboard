import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv'

import postRoutes from './router/post.js'

dotenv.config()

const app = express();

app.use('/post', postRoutes)

app.use(express.json({limit: "30mb", extended: true}))
app.use(express.urlencoded({limit: "30mb", extended:true}));
app.use(cors())

const CONNECTION_URL = process.env.ATLAS_URI
const PORT = process.env.PORT || 5000;

mongoose.connect(CONNECTION_URL, {useNewUrlParser: true, useUnifiedTopology: true})
.then(()=> app.listen(PORT, ()=> console.log(`Server running on port: ${PORT}`)))
.catch(()=>(error)=> console.log(error.message))

// , useFindAndModify: false

const connection = mongoose.connection

connection.once("open", () => {
    console.log("MongoDB database connected")

    console.log("Setting change streams")
    const testChangeStream = connection.collection("TestData").watch();
    testChangeStream.on("change", (next) => {
        console.log(next)
    })

})
