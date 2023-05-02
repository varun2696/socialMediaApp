const express = require('express');
const { connection } = require('./db');
const { userRouter } = require('./routes/User.route');
const { auth } = require('./middleware/auth');
const { postsRouter } = require('./routes/Posts.route');
require('dotenv').config()
var cors = require('cors')
const {PORT} = process.env

const app = express()
app.use(express.json());
app.use(cors())

app.get('/', (req, res)=>{
    res.send("welcome to Home page")
})

app.use('/users', userRouter)



app.use(auth)
app.use('/posts', postsRouter)



app.listen(PORT, async()=>{
    try {
        await connection;
        console.log("connected to db!!");
    } catch (error) {
        console.log("Unable to connect")
    }

    console.log(`Server is running at port ${PORT}`)
})