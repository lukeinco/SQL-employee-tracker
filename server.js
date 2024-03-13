const mysql = require('mysql2');
const express = require('express');
const inquirer = require('inquirer');
const {
  promptMainMenu,
  promptAddDepartment,
  promptAddRole,
  promptAddEmployee,
  promptUpdateEmployeeRole
} = require('./prompts'); // Import prompt functions from prompts.js file

const PORT = process.env.PORT || 3001;

// Connect to database
const db = mysql.createConnection(
  {
    host: 'localhost',
    user: 'root',
    password: 'August05',
    database: 'work_db'
  },
  console.log(`Connected to the work_db database.`)
);

const app = express(); // Initialize express

// Function to start the application
async function startApp() {
  let keepRunning = true;
  
  while (keepRunning) {
    // Prompt the user with the main menu options
    const { action } = await promptMainMenu();
    
    // Perform actions based on user's choice
    if (action === 'View all departments') {
      // Call function to view all departments
      await viewAllDepartments();
    } else if (action === 'View all roles') {
      // Call function to view all roles
      await viewAllRoles();
    } else if (action === 'View all employees') {
      // Call function to view all employees
      await viewAllEmployees();
    } else if (action === 'Add a department') {
      // Call function to add a department
      await addDepartment();
    } else if (action === 'Add a role') {
      // Fetch departments and pass them to promptAddRole
      const departments = await fetchDepartments();
      await addRole(departments);
    } else if (action === 'Add an employee') {
      // Fetch roles and employees, then pass them to promptAddEmployee
      const roles = await fetchRoles();
      const employees = await fetchEmployees();
      await addEmployee(roles, employees);
    } else if (action === 'Update an employee role') {
      // Fetch employees and roles, then pass them to promptUpdateEmployeeRole
      const employees = await fetchEmployees();
      const roles = await fetchRoles();
      await updateEmployeeRole(employees, roles);
    } else if (action === 'Exit') {
      console.log('Exiting application...');
      keepRunning = false;
    } else {
      console.log('Invalid choice. Please try again.');
    }
  }

  // Start the server after the app is done running
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

// Function to view all departments
async function viewAllDepartments() {
  const query = "SELECT * FROM department";
  db.query(query, (err, rows) => {
    if (err) {
      console.log(err.message);
      return;
    }
    console.log("Departments:");
    console.table(rows);
  });
}

// Function to view all roles
async function viewAllRoles() {
  const query = "SELECT * FROM role";
  db.query(query, (err, rows) => {
    if (err) {
      console.log(err.message);
      return;
    }
    console.log("Roles:");
    console.table(rows);
  });
}

// Function to view all employees
async function viewAllEmployees() {
  const query = "SELECT * FROM employee";
  db.query(query, (err, rows) => {
    if (err) {
      console.log(err.message);
      return;
    }
    console.log("Employees:");
    console.table(rows);
  });
}

// Function to add a department
async function addDepartment() {
  const departmentData = await promptAddDepartment();
  const query = "INSERT INTO department SET ?";
  db.query(query, departmentData, (err, result) => {
    if (err) {
      console.log(err.message);
      console.log("hi");
      return;
    }
    console.log(`Department ${departmentData.name} added successfully!`);
  });
}

// Function to add a role
async function addRole(departments) {
  try {
    const roleData = await promptAddRole(departments);
    const query = "INSERT INTO role SET ?";
    db.query(query, roleData, (err, result) => {
      if (err) {
        console.log(err.message);
        return;
      }
      console.log(`Role ${roleData.title} added successfully!`);
    });
  } catch (error) {
    console.log(error.message);
  }
}

// Function to add an employee
async function addEmployee(roles, employees, departments) {
  try {
    const employeeData = await promptAddEmployee(roles, employees, departments);
    const query = "INSERT INTO employee SET ?";
    db.query(query, employeeData, (err, result) => {
      if (err) {
        console.log(err.message);
        return;
      }
      console.log(`Employee ${employeeData.first_name} ${employeeData.last_name} added successfully!`);
    });
  } catch (error) {
    console.log(error.message);
  }
}

// Function to update an employee's role
async function updateEmployeeRole(employees, roles) {
  try {
    const updateData = await promptUpdateEmployeeRole(employees, roles);
    const { employee_id, role_id } = updateData;
    const query = "UPDATE employee SET role_id = ? WHERE id = ?";
    db.query(query, [role_id, employee_id], (err, result) => {
      if (err) {
        console.log(err.message);
        return;
      }
      console.log(`Employee's role updated successfully!`);
    });
  } catch (error) {
    console.log(error.message);
  }
}

// Function to fetch all departments from the database
async function fetchDepartments() {
  return new Promise((resolve, reject) => {
    const query = "SELECT * FROM department";
    db.query(query, (err, rows) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(rows);
    });
  });
}

// Function to fetch all roles from the database
async function fetchRoles() {
  return new Promise((resolve, reject) => {
    const query = "SELECT * FROM role";
    db.query(query, (err, rows) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(rows);
    });
  });
}

// Function to fetch all employees from the database
async function fetchEmployees() {
  return new Promise((resolve, reject) => {
    const query = "SELECT * FROM employee";
    db.query(query, (err, rows) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(rows);
    });
  });
}

// Start the application
startApp();
