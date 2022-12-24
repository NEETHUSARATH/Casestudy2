// Task1: initiate app and run server at 3000
const express=require('express');
const Bodyparser=require('body-parser');
const Mongoose=require('mongoose');
const cors=require('cors');
Mongoose.set('strictQuery', false);

const EmployeeModel = require("./src/model/employeeDB");
const app=new express();
app.use(Bodyparser.json());
app.use(Bodyparser.urlencoded({extended:false}));
app.use(cors());




const path=require('path');
app.use(express.static(path.join(__dirname+'/dist/FrontEnd')));

// Task2: create mongoDB connection 

mongoose.connect("mongodb+srv://NeeThuMongodb:<Neethu@16263646>@cluster0.rviognq.mongodb.net/EmployeeDB?retryWrites=true&w=majority",
{ useNewUrlPareser:true });

//Task 2 : write api with error handling and appropriate api mentioned in the TODO below



//




//TODO: get data from db  using api '/api/employeelist'



//TODO: get single data from db  using api '/api/employeelist/:id'





//TODO: send data from db using api '/api/employeelist'
//Request body format:{name:'',location:'',position:'',salary:''}

app.post('/api/employeelist',async(req,res)=>{
    var data = req.body;
    var employee = new EmployeeModel(data);
    var result = await employee.save();
});




//TODO: delete a employee data from db by using api '/api/employeelist/:id'




//TODO: Update  a employee data from db by using api '/api/employeelist'
//Request body format:{name:'',location:'',position:'',salary:''}


//! dont delete this code. it connects the front end file.
app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname + '/dist/Frontend/index.html'));
});


app.listen(3000);
console.log("server listening to port 3000");
