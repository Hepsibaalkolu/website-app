const express = require("express");
const mongoose = require('mongoose');
const cors = require("cors");
const UserModel = require('./models/Users');

const app = express();
app.use(cors(
    
    {
        origin: ["http://localhost:5173",'https://website-app-1whq.vercel.app'],
        // origin: ['https://website-app-frontend.vercel.app'],
        
        // origin: 'https://website-app-frontend.vercel.app',
        
        methods: true,
        credentials: true
    }
));
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

app.get("/",(req, res)=>{
    res.send("Server is Rinning")
})

const port = 4800;
app.listen(port, ()=>{
    console.log(`server is listening on ${port}`);
    
})
//"http://localhost:5173", 
//https://website-app-client.vercel.app
// https://website-app-1whq.vercel.app


//vercel.json
// {
//     "rewrites": [
//       {
//         "source": "/api/(.*)",
//         "destination": "/server/$1"
//       },
//       {
//         "source": "/(.*)",
//         "destination": "/client/$1"
//       }
//     ]
//   }