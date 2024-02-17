const express = require("express");
const app = express();
const port = 8080;
const path = require("path");
const { v4: uuidv4 } = require('uuid');
const methodOverride = require('method-override');
const mongoose = require('mongoose');
const User = require("./models/user.js");
const ejsMate = require("ejs-mate");

app.use(express.urlencoded({extended: true}));
app.set("view engine","ejs");
app.set("views", path.join(__dirname,"views"));

app.use(express.static(path.join(__dirname,"public")));
app.use(methodOverride("_method"));
app.engine('ejs', ejsMate);

app.use((req,res,next)=>{
    const timestamp = new Date().toISOString();
    const method = req.method;
    const url = req.url;
    const accessToken = req.headers.authorization;

    console.log(`[${timestamp}] ${method}:${url},AccessToken:${accessToken} `);
    next();
});

//MongoDb connection
main()
.then(()=>{
    console.log("Connection sucessful");
})
    
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/UserDb');
}


// let User1 = new User({
//     name: "Harry",
//     email: "harry@gmail.com",
//     age:22,
//     country:"India",
//     password:"123@",
// });
// User1.save().then((res) => {
//     console.log(res);
// });

let users = [
    {
        id:uuidv4(),
        name: "Alphait1",
        email:"alpha1@gmail.com",
        age:30,
        country:"India",
        password:"234",
    },
    {
        id:uuidv4(),
        name: "Alphait2",
        email:"alpha2@gmail.com",
        age:25,
        country:"USA",
        password:"454",
    },
    {
        id:uuidv4(),
        name: "Alphait3",
        email:"alpha3@gmail.com",
        age:21,
        country:"Canada",
        password:"7834",
    },
    {
        id:uuidv4(),
        name: "Alphait4",
        email:"alpha4@gmail.com",
        age:22,
        country:"Franch",
        password:"7834",
    }
];

app.get("/users", async(req,res)=>{
    let users = await User.find();
    res.render("index.ejs", {users});
})



app.get("/users/new",(req,res)=>{
    res.render("new.ejs");
});
app.post("/users",(req,res)=>{
    let {name,email,age,country,password} = req.body;
    // let id = uuidv4();
    // users.push({
    //     id,
    //     name,
    //     email,
    //     age,
    //     country,
    //     password,
    // })
    let newUser = new User({
        name: name,
        email: email,
        age: age,
        country: country,
        password: password,
    })
    newUser
    .save()
    .then((res) => {
        console.log(res);
    })
    .catch((err)=> {
        console.log(err)
    });
    res.redirect("/users");
});

app.get("/users/:id", async(req,res)=>{
    let {id} = req.params;
    let user = await User.findById(id);
    //let user = users.find((u) => id === u.id);
    res.render("show.ejs",{user});
});



app.get("/users/:id/edit",async(req,res)=>{
    let {id} = req.params;
    let user = await User.findById(id);
    //let user = users.find((u) => id === u.id);
    res.render("edit.ejs",{user});
});
app.put("/users/:id", async (req,res)=>{
    let {id} = req.params;
    let {newContry} = req.body;
    let update = await User.findByIdAndUpdate(
        id,
        {country: newContry},
        {runValidators: true, new: true}
    );
   // let user = User.findById(id);
    //let user = users.find((u) => id === u.id);
    //user.country = newContry;
    console.log(user);
    //res.send("put is working well!");
    res.redirect("/users");
});


app.delete("/users/:id", async(req,res)=>{
    let {id} = req.params;
    let deletedChat = await User.findByIdAndDelete(id);
    //users = users.filter((u)=> id !== u.id);
    res.redirect("/users");
})

app.get("/", (req,res)=>{
    res.send("Serving working well!");
});

app.listen(port, ()=>{
    console.log("listining on port: 8080");
})