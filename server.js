const express = require('express');
// get the client
const mysql = require('mysql2');
// get console.table
const cTable = require('console.table');
const inquirer = require('inquirer');

const PORT = process.env.PORT || 3001;
const app = express();

// Express middelware
app.use(express.urlencoded({ extended: false}));
app.use(express.json());

// create connection to database
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    // MySQL password
    password:'bootcamp2021',
    database: 'emanagement'
  },
  console.log('Connected to the emanagement database')
  );

// Menu options
let menu = {
  type: 'list',
  name: 'menuOptions',
  message: 'What would you like to do?',
  choices: ['View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add an employee', 'Update an employee role']

};

let addDeparment = {
  type: 'input',
  name: 'name',
  message:'Enter the name of the department'
} 

let addRole = [
  {
  type: 'input',
  name: 'name',
  message: 'Enter the name of the role'
  },
  {
    type: 'input',
    name: 'salary',
    message: 'Enter the salary of the role'
  },
  {
    type: 'input',
    name: 'department',
    message: 'Enter the department for the role'
    },

]

//Query for departments table
db.promise().query(
  'SELECT * FROM department ')
  .then(([fields,rows]) => {
    // print table with fields
    console.table(fields);

  })
  .catch(console.log)
  .then( ()=> console.log('Query for departments successful')
);

//Query for roles table
db.promise().query(
  'SELECT * FROM roles ')
  .then(([fields,rows]) => {
    // print table with fields
    console.table(fields);

  })
  .catch(console.log)
  .then( ()=> console.log('Query for roles successful')
);

//Query for employees table
db.promise().query(
  'SELECT * FROM employee ')
  .then(([fields,rows]) => {
    // print table with fields
    console.table(fields);

  })
  .catch(console.log)
  .then( ()=> console.log('Query for employees successful')
);




// Default response for any other request (Not Found)
app.use((req, res) => {
  res.status(404).end();
});
// Server listening
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});