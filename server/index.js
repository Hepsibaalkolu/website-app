const express = require("express");
const mongoose = require('mongoose');
const cors = require("cors");
const UserModel = require('./models/Users');

const app = express();
app.options('*', cors());
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    res.header("Access-Control-Allow-Credentials", "true");
    next();
});
app.use(cors());

app.use(express.json());

mongoose.connect(
    "mongodb+srv://hema:hema123@cluster0.tgbx8.mongodb.net/mern?retryWrites=true&w=majority&appName=Cluster0"
);

app.get("/getUser", (req, res) => {
    UserModel.find({}).then(function(users) {
        res.json(users)
    }).catch(function(err) {
        res.json(err)
    })
})

app.post("/createUser", async (req,res)=>{
    const user = req.body;
    const newUser = new UserModel(user);
    await newUser.save();
    res.json(user);
})

const port = 4800;
app.listen(port, ()=>{
    console.log(`server is listening on ${port}`);
    
})
//"http://localhost:5173", 
//https://website-app-client.vercel.app
// https://website-app-1whq.vercel.app

// "scripts": {
//     "test": "echo \"Error: no test specified\" && exit 1",
//     "start": "nodemon index.js"
    
//   },