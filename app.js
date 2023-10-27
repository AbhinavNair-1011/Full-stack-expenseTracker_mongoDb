let express = require("express");
let app = express();

let cors = require("cors");


const user=require("./routes/user")
const expense = require("./routes/expense");

// const  users  = require("./models/users");
// const  expenses  = require("./models/expenses");
// const  payments = require("./models/payments");

const mongoose=require("mongoose");

mongoose.connect("mongodb+srv://abhinavn:abhinav@cluster0.pifxnyc.mongodb.net/expense?retryWrites=true&w=majority")
.then(()=>{
  console.log("connected to database")
  app.listen(3000,()=>{
    console.log("3000")
  });
})

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(express.static(__dirname + "/public"));



app.use(user);
app.use(expense);


    