require('dotenv').config()
const mongoose = require("mongoose")
const express = require("express")
const cors = require("cors")
const postRoutes = require("./router/post.js")

const app = express();
app.use(express.json({limit: "30mb", extended: true}))
app.use(express.urlencoded({limit: "30mb", extended:true}));
app.use(cors())

const PORT = process.env.PORT || 5000;
const CONNECTION_URL = process.env.ATLAS_URI

// var server = require('http').createServer(app);
// var io = require('socket.io').listen(server); // it was require('socket.io')(server);

const server = require("http").createServer(app);
const io = require("socket.io")(server);

// io.of("/api/socket").on("connection", (socket) => {
//     console.log("socket.io: User connected: ", socket.id);
  
//     socket.on("disconnect", () => {
//       console.log("socket.io: User disconnected: ", socket.id);
//     });
//   });

io.on("connection", (socket) => {
    console.log("socket.io: User connected: ", socket.id);
  
    socket.on("disconnect", () => {
      console.log("socket.io: User disconnected: ", socket.id);
    });
  });

server.listen(PORT, () => console.log(`Server now running on port ${PORT}!`));


mongoose.connect(CONNECTION_URL, {useNewUrlParser: true, useUnifiedTopology: true})

const connection = mongoose.connection

connection.once("open", () => {
    console.log("MongoDB database connected")

    console.log("Setting change streams")
    const testChangeStream = connection.collection("TestData").watch();
    testChangeStream.on("change", (next) => {
        console.log(next)
    })

})