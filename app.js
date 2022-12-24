
var express = require('express');
var Bodyparser = require('body-parser');
var Mongoose = require('mongoose');
var cors = require('cors');
Mongoose.set('strictQuery', false);
const EmployeeModel = require("./src/model/employee");

var app=new express();
app.use(Bodyparser.json());
app.use(Bodyparser.urlencoded({extended:false}));
app.use(cors());


const path=require('path');
app.use(express.static(path.join(__dirname+'/dist/FrontEnd')));

// Task2: create mongoDB connection 

Mongoose.connect("mongodb+srv://NeeThuMongodb:<Neethu@16263646>@cluster0.rviognq.mongodb.net/EmployeeDB?retryWrites=true&w=majority",
{ useNewUrlParser:true });

//Task 2 : write api with error handling and appropriate api mentioned in the TODO below








//TODO: get data from db  using api '/api/employeelist'

app.get('/api/employeelist', (req, res) => {

    EmployeeModel.find((err, employee) => {

        res.send(employee);
    });
    console.log("Employees Details showed")
});

//TODO: get single data from db  using api '/api/employeelist/:id'

app.get('/api/employeelist/:id', async (req, res) => {
    let id = req.params.id;
    EmployeeModel.findOne({ _id: id }, (err, employee) => {
        res.send(employee);
    });
});




//TODO: send data from db using api '/api/employeelist'
//Request body format:{name:'',location:'',position:'',salary:''}

app.post('/api/employeelist', async (req, res) => {
    let data = req.body;
    let employee = new EmployeeModel(data);
    await employee.save(
        (err, data) => {
            if (err) {
                res.json({ "Status": "Error", "Error": err });
            } else {
                res.json({ "Status": "Success", "Data": data });
            }
        })
    console.log("Employee details added successfully");
});




//TODO: delete a employee data from db by using api '/api/employeelist/:id'
app.delete("/api/employeelist/:id", (req, res) => {
    let data = req.body;
    id = req.params.id;
    EmployeeModel.findByIdAndDelete({ "_id": id }, data, (err, data) => {
        if (err) {
            res.json({ "Status": "Error", "Error": err })
        } else {
            res.json({ "Status": "deleted", "Data": data })
            console.log("data successfully deleted");
        }
    });
});
      



//TODO: Update  a employee data from db by using api '/api/employeelist'
//Request body format:{name:'',location:'',position:'',salary:''}
app.put('/api/employeelist', (req, res) => {

    let data = {
        name: req.body.name,
        location: req.body.location,
        position: req.body.position,
        salary: req.body.salary
    }
    let name = req.body.name;

    EmployeeModel.findOneAndUpdate({ "name": name }, data, (err, data) => {
        if (err) {
            res.json({ "Status": "Error", "Error": err });
        } else {
            res.json({ "Status": "Updated", "Data": data });
        }
    });
    console.log("Data successsfully updated");
});


//! dont delete this code. it connects the front end file.
app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname + '/dist/Frontend/index.html'));
});


app.listen(3000, () => {
    console.log("server started listening to port 3000");
});
