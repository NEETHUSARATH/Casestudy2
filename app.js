
var express = require("express");
var Bodyparser = require("body-parser");
var Mongoose = require("mongoose");
var cors = require("cors");
Mongoose.set('strictQuery', false);
const EmployeeModel = require("./src/model/employee");

var app = new express();
app.use(Bodyparser.json());
app.use(Bodyparser.urlencoded({extended : false}));
app.use(cors());


const path=require('path');
app.use(express.static(path.join(__dirname+'/dist/FrontEnd')));

// mongoDB connection 

Mongoose.connect("mongodb+srv://NeeThuMongodb:16263646@cluster0.rviognq.mongodb.net/EmployeeDB?retryWrites=true&w=majority",
{ useNewUrlParser:true });

// api with error handling and appropriate api mentioned in the TODO below



app.get('/api/employeelist', (req, res) => {

    EmployeeModel.find((err, employee) => {

        res.send(employee);
    });
    console.log("Employees Details showed")
});



app.get('/api/employeelist/:id', async (req, res) => {
    let id = req.params.id;
    EmployeeModel.findOne({ _id: id }, (err, employee) => {
        res.send(employee);
    });
});


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
    console.log("Employee details are added successfully");
});


app.delete("/api/employeelist/:id", (req, res) => {
    let data = req.body;
    id = req.params.id;
    EmployeeModel.findByIdAndDelete({ "_id": id }, data, (err, data) => {
        if (err) {
            res.json({ "Status": "Error", "Error": err })
        } else {
            res.json({ "Status": "deleted", "Data": data })
            console.log("Employee details are successfully deleted");
        }
    });
});
      

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
    console.log("Employee Details are successsfully updated");
});


//! dont delete this code. it connects the front end file.
app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname + '/dist/Frontend/index.html'));
});


app.listen(3000, () => {
    console.log("server started listening to port 3000");
});
