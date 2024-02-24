-- Inserting seed data into the department table
INSERT INTO department (id, name) VALUES
(1, 'Engineering'),
(2, 'Marketing'),
(3, 'Finance');

-- Inserting seed data into the role table
INSERT INTO role (id, title, salary, department_id) VALUES
(1, 'Software Engineer', 80000, 1),
(2, 'Marketing Manager', 90000, 2),
(3, 'Financial Analyst', 75000, 3);

-- Inserting seed data into the employee table
INSERT INTO employee (id, first_name, last_name, role_id, manager_id) VALUES
(1, 'John', 'Doe', 1, NULL),        -- John Doe is a Software Engineer and has no manager
(2, 'Jane', 'Smith', 2, NULL),      -- Jane Smith is a Marketing Manager and has no manager
(3, 'Michael', 'Johnson', 3, NULL), -- Michael Johnson is a Financial Analyst and has no manager
(4, 'Emily', 'Davis', 1, 1),        -- Emily Davis is a Software Engineer and her manager is John Doe
(5, 'David', 'Brown', 3, 3);        -- David Brown is a Financial Analyst and his manager is Michael Johnson
