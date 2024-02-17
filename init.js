const mongoose = require('mongoose');
const User = require("./models/user.js");

main()
.then(()=>{
    console.log("Connection sucessful");
})
    
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/UserDb');
}

let allUser = [
{
    name: "Harry",
    email: "harry@gmail.com",
    age:22,
    country:"India",
    password:"123@",
},
{
    name: "potter",
    email: "potter@gmail.com",
    age:22,
    country:"India",
    password:"423123@",
},
{
    name: "Strainger",
    email: "str@gmail.com",
    age:22,
    country:"Canada",
    password:"9923@",
},
{
    name: "Ben",
    email: "ben@gmail.com",
    age:25,
    country:"USA",
    password:"567@",
}];

User.insertMany(allUser);