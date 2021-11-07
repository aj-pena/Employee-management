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

CREATE TABLE department (
    department_id int NOT NULL,
    PRIMARY KEY (department_id)
);

CREATE TABLE roles (
    role_id int NOT NULL,
    title VARCHAR(30),
    salary DECIMAL,
    department_id INT,
    PRIMARY KEY (role_id),
    FOREIGN KEY (department_id) REFERENCES department(department_id)
);

CREATE TABLE employee (
    employee_id int NOT NULL,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT,
    manager_id INT,
    PRIMARY KEY (employee_id),
    FOREIGN KEY (role_id) REFERENCES roles(role_id)
);

-- Insert multiple produce items --
INSERT INTO produce (id, name)
VALUES
    ( 1, "apple"),
    ( 2, "orange"),
    ( 3, "banana");