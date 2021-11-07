DROP DATABASE IF EXISTS eManagement;

CREATE DATABASE eManagement;

-- Use eManagement --
USE eManagement;

-- See database in use --
SELECT DATABASE();

-- Creates the table "department" within eManagement --
CREATE TABLE example (
  -- Creates a numeric column called "id" which will automatically increment its default value as we create new rows --
  id INT NOT NULL,
  -- Makes a string column called "name" which cannot contain null --
  name VARCHAR(100) NOT NULL
);
-- Creates departments table
CREATE TABLE departments (
    ID int NOT NULL AUTO_INCREMENT,
    name_dept VARCHAR(30), 
    PRIMARY KEY (ID)
);
-- add column to department table
-- ALTER TABLE department ADD name_dept VARCHAR(30) AFTER ID 

-- Creates roles table
CREATE TABLE roles (
    ID int NOT NULL AUTO_INCREMENT,
    title VARCHAR(30),
    salary DECIMAL,
    department_id INT,
    PRIMARY KEY (ID),
    FOREIGN KEY (department_id) REFERENCES departments(ID)
);

-- Creates employees table
CREATE TABLE employees (
    ID int NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT,
    manager_id INT,
    PRIMARY KEY (ID),
    FOREIGN KEY (role_id) REFERENCES roles(ID)
);

