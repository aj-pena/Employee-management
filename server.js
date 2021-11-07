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
let menuData = '';

// Menu options
let menuOps = {
  type: 'list',
  name: 'menuOptions',
  message: 'What would you like to do?',
  choices: ['View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add an employee', 'Update an employee role']

};

let addDeparment = {
  type: 'input',
  name: 'name',
  message:'Enter the name of the department'
}; 

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
];

let addEmployee = [
  {
  type: 'input',
  name: 'first_name',
  message: 'Enter the first name of the employee'
  },
  {
    type: 'input',
    name: 'last_name',
    message: 'Enter last name of the employee'
  },
  {
    type: 'input',
    name: 'role',
    message: 'Enter the role of the employee'
  },
  {
    type: 'input',
    name: 'manager',
    message: 'Enter the manager of the employee'
  }
];
// initial function
function init(){

  inquirer.prompt(menuOps).then((answer) => {
    menuData = answer.menuOptions;
    if(menuData === 'View all departments'){
      getDepartments();
    };
    if(menuData === 'View all roles'){
      getRoles();
    };
    if(menuData === 'View all employees'){
      getEmployees();
    };
    if(menuData === 'Add a department'){
      addsDepartment();
    };
    if(menuData === 'Add a role'){
      addsRole();
    };
    if(menuData === 'Add an employee'){
      addsEmployee();
    };
    if(menuData === 'Update an employee role'){
      uEmployeeRole();
    };

  })
}

function getDepartments(){
//Query for departments table
db.promise().query(
  'SELECT * FROM departments ')
  .then(([fields,rows]) => {
    // print table with fields
    console.table(fields);

  })
  .catch(console.log)
  .then( ()=> {
    console.log('Query for departments successful')
    init();
  });
};

function getRoles() {
//Query for roles table
db.promise().query(
  'SELECT * FROM roles ')
  .then(([fields,rows]) => {
    // print table with fields
    console.table(fields);

  })
  .catch(console.log)
  .then( ()=> {
    console.log('Query for roles successful');
    init();
  });
};

function getEmployees(){
//Query for employees table
db.promise().query(
  'SELECT * FROM employees ')
  .then(([fields,rows]) => {
    // print table with fields
    console.table(fields);
  })
  .catch(console.log)
  .then( ()=> {
    console.log('Query for employees successful')
    init();
  });
};

function addsDepartment(){
  // Query to add a department
  db.promise().query(
    'INSERT INTO * FROM employee ')
    .then(([fields,rows]) => {
      // print table with fields
      console.table(fields);
    })
    .catch(console.log)
    .then( ()=> {
      console.log('Query for employees successful')
      init();
    });
};

function addsRole(){};

function addsEmployee(){};

function uEmployeeRole(){};

init();

// Default response for any other request (Not Found)
app.use((req, res) => {
  res.status(404).end();
});
// Server listening
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});