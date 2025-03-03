const express = require("express");
const mongoose = require('mongoose');
const cors = require("cors");
const UserModel = require('./models/Users');

const app = express();
app.options('*', cors());

app.use(cors(
    
    {
        // origin: ["http://localhost:5173",'https://website-app-1whq.vercel.app'],
        
        origin: ['https://website-app-client.vercel.app'],
        
        methods: true,
        credentials: true,
        methods: ['GET', 'POST'],
        allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept']
    }
));

app.use(express.json());

mongoose.connect(
    "mongodb+srv://hema:hema123@cluster0.tgbx8.mongodb.net/mern?retryWrites=true&w=majority&appName=Cluster0"
);

app.get("https://website-app-client.vercel.app/getUser", (req, res) => {
    UserModel.find({}).then(function(users) {
        res.json(users)
    }).catch(function(err) {
        res.json(err)
    })
})

app.post("https://website-app-client.vercel.app/createUser", async (req,res)=>{
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

