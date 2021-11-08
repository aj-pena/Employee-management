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
  name: 'dept_name',
  message:'Enter the name of the department'
}; 

let addRole = [
  {
  type: 'input',
  name: 'role_name',
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
    message: 'Enter the department id (integer) for the role'
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
    message: 'Enter the role id of the employee'
  },
  {
    type: 'input',
    name: 'manager',
    message: 'Enter the manager id of the employee'
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
      inquirer.prompt(addDeparment).then(
        (answer) => {
        let deptName = answer.dept_name;
        addsDepartment(deptName);
      })      
    };
    if(menuData === 'Add a role'){
      inquirer.prompt(addRole).then(
        (answer) => addsRole(answer)        
      )
    };
    if(menuData === 'Add an employee'){
      inquirer.prompt(addEmployee).then(
        (answer) => addsEmployee(answer))
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

function addsDepartment(data){
  // Query to add a department
  db.promise().query(
    `INSERT INTO departments (name_dept) VALUES ('${data}')`)
    .then(console.log('creating deparment'))
    .catch(console.log)
    .then( ()=> {
      console.log(`New department ${data} created successfully`)
      init();
    });
};

function addsRole(data){
  db.promise().query(
    `INSERT INTO roles (title, salary, department_id) VALUES ('${data.role_name}',${data.salary},${data.department})`)
    .then(console.log('creating role'))
    .catch(console.log)
    .then( ()=> {
      console.log(`New role ${data.role_name} created successfully`)
      init();
    });
};

function addsEmployee(data){
  db.promise().query(
    `INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ('${data.first_name}','${data.last_name}',${data.role},${data.manager})`)
    .then(console.log('registering new employee'))
    .catch(console.log)
    .then( ()=> {
      console.log(`New employee ${data.first_name} ${data.last_name} has been registered successfully`)
      init();
    });
};

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