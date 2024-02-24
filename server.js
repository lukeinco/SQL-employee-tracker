const mysql = require('mysql2');
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


// Function to start the application
async function startApp() {
  let keepRunning = true;
  
  while (keepRunning) {
    // Prompt the user with the main menu options
    const { action } = await promptMainMenu();
    
    // Perform actions based on user's choice
    if (action === 'View all departments') {
      async function viewAllDepartments() {
        const query = "SELECT * FROM departments";
        db.query(query, (err, rows) => {
          if (err) {
            console.log(err.message);
            return;
          }
          console.log("Departments:");
          console.table(rows);
        });
      }
    } else if (action === 'View all roles') {
      // TODO: Function to view all roles
      async function viewAllRoles() {
        const query = "SELECT * FROM roles";
        db.query(query, (err, rows) => {
          if (err) {
            console.log(err.message);
            return;
          }
          console.log("Roles:");
          console.table(rows);
        });
      }
    } else if (action === 'View all employees') {
      // TODO: Function to view all employees
      async function viewAllEmployees() {
        const query = "SELECT * FROM employees";
        db.query(query, (err, rows) => {
          if (err) {
            console.log(err.message);
            return;
          }
          console.log("Employees:");
          console.table(rows);
        });
      }
    } else if (action === 'Add a department') {
      await addDepartment();
    } else if (action === 'Add a role') {
      // Prompt user to add a role
      await addRole();
    } else if (action === 'Add an employee') {
      // Prompt user to add an employee
      await addEmployee();
    } else if (action === 'Update an employee role') {
      // Prompt user to update an employee's role
      await updateEmployeeRole();
    } else if (action === 'Exit') {
      console.log('Exiting application...');
      keepRunning = false;
    } else {
      console.log('Invalid choice. Please try again.');
    }
  }
}

// Function to add a department
async function addDepartment() {
  const departmentData = await promptAddDepartment();
    const query = "INSERT INTO departments SET ?";
    db.query(query, departmentData, (err, result) => {
      if (err) {
        console.log(err.message);
        return;
      }
      console.log(`Department ${departmentData.name} added successfully!`);
    });
  }


// Function to add a role
async function addRole() {
  const roleData = await promptAddRole();
    const query = "INSERT INTO roles SET ?";
    db.query(query, roleData, (err, result) => {
      if (err) {
        console.log(err.message);
        return;
      }
      console.log(`Role ${roleData.title} added successfully!`);
    });
  }
  


// Function to add an employee
async function addEmployee() {
  const employeeData = await promptAddEmployee();
    const query = "INSERT INTO employees SET ?";
    db.query(query, employeeData, (err, result) => {
      if (err) {
        console.log(err.message);
        return;
      }
      console.log(`Employee ${employeeData.first_name} ${employeeData.last_name} added successfully!`);
    });
}

// Function to update an employee's role
async function updateEmployeeRole() {
  const updateData = await promptUpdateEmployeeRole();
    const { employeeId, roleId } = updateData;
    const query = "UPDATE employees SET role_id = ? WHERE id = ?";
    db.query(query, [roleId, employeeId], (err, result) => {
      if (err) {
        console.log(err.message);
        return;
      }
      console.log(`Employee's role updated successfully!`);
    });
}

// Start the application
startApp();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
