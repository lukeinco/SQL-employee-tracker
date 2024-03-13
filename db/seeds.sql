-- Inserting seed data into the department table
INSERT INTO department (name) VALUES
('Engineering'),
('Marketing'),
('Finance');

-- Inserting seed data into the role table
INSERT INTO role (title, salary, department_id) VALUES
('Software Engineer', 80000, 1),
('Marketing Manager', 90000, 2),
('Financial Analyst', 75000, 3);

-- Inserting seed data into the employee table
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES
('John', 'Doe', 1, NULL),        -- John Doe is a Software Engineer and has no manager
('Jane', 'Smith', 2, NULL),      -- Jane Smith is a Marketing Manager and has no manager
('Michael', 'Johnson', 3, NULL), -- Michael Johnson is a Financial Analyst and has no manager
('Emily', 'Davis', 1, 1),        -- Emily Davis is a Software Engineer and her manager is John Doe
('David', 'Brown', 3, 3);        -- David Brown is a Financial Analyst and his manager is Michael Johnson
