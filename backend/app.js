const express = require("express")
const app = express();
const PORT = 5000;
const data = require('./data')
const cors = require("cors");
const mongoose = require("mongoose");   
const {mongoUrl} = require("./keys")
app.use(cors());
require("./models/model")
require("./models/post")
app.use(express.json());
app.use(require("./routes/auth"));
app.use(require("./routes/createPost"));

mongoose.connect(mongoUrl);
mongoose.connection.on("connected",()=>{
    console.log("connected to mongoose")
})
mongoose.connection.on("error",()=>{
    console.log("Error in connecting to mongoose")
})

/*
app.get('/',(req,res)=>{
    res.json(data)
})

*/
app.listen(PORT,()=>{
    console.log("Server is running on  "+PORT)
});