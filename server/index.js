require('dotenv').config()
const mongoose = require("mongoose")
const express = require("express")
const cors = require("cors")
const postRoutes = require("./router/post.js")
const authRoute = require('./router/auth.js')
const usersRoute = require('./router/users')
const simulateRoute = require('./router/simulate')


const app = express();


app.use(express.json({limit: "30mb", extended: true}))
app.use(express.urlencoded({limit: "30mb", extended:true}));
app.use(cors())

app.use('/post', postRoutes)
app.use('/api', authRoute)
app.use('/user', usersRoute)
app.use('/simulate', simulateRoute)



const PORT = process.env.PORT || 5000;
const CONNECTION_URL = process.env.ATLAS_URI

// var server = require('http').createServer(app);
// var io = require('socket.io').listen(server); // it was require('socket.io')(server);

const server = require('http').createServer(app);
const io = require('socket.io')(server,{
    cors: {
        origin: ["http://localhost:3001", "http://localhost:3000"]
    }
});

io.on("connection", (socket) => {
    
    console.log("socket.io: User connected: ", socket.id);
    socket.on("send-message", message => {
        console.log(message)
        // io.emit('receive-message', message)
        // take current socket, broadcast message to every other socket but myself
        socket.broadcast.emit('receive-message', message)
        
    })
    
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
    // const testChangeStream = connection.collection("TestData").watch();
    const dataChangeStream = connection.collection("datas").watch()
    dataChangeStream.on("change", (next) => {
        switch(next.operationType) {
            case "insert":
                console.log('data: ', next)
                io.emit('newData', next.fullDocument)
                // const user = {
                //     _id: next.fullDocument._id,
                //     name: next.fullDocument.name,
                //     username: next.fullDocument.username,
                //     wearable_id: next.fullDocument.wearable_id,
                //     wearable_name: next.fullDocument.wearable_name
                // }
                // io.emit('newUser', user)
                // io.emit('receive-message','insert user'+ next)
                // console.log('insert user', user)
                break;
            case "delete":
                console.log('delete data')
                // io.emit('receive-message','delete user '+ next)
                break;

        }
    })


    
    console.log('changestream set')

})