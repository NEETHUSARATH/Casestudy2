var Mongoose = require('mongoose');

Mongoose.connect('mongodb://localhost:27017/ictakDB');

const employeeSchema = Mongoose.Schema(
    {
        name: String,
        location: String,
        position:String,
        salary:Number
    }
);
var EmployeeModel = Mongoose.model("Employees",employeeSchema);

module.exports = {EmployeeModel};