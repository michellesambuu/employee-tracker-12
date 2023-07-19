const inquirer = require('inquirer')
const db = require('./db /connection')
require('console.table')
const {prompt} = require ('inquirer')

function mainPrompt(){
    prompt([{
        type:'list',
        name: 'choose',
        message: 'which action woild you like to take',
        choices:['View all employee', 'View all departments','View all roles','Add an employee', 'Add department','Add role','Update employee role','quit']

    }])
    .then((anwer)=>{
        switch(anwer.choose){
           case 'View all employee':
            viewAllEmployee()
            break;
            case 'View all departments':
            viewDepartments()
            break;
            case 'View all roles':
                viewAllRoles()
                break;
           
            case 'Add an employee':
                 addEmployee()
                    break;
            case 'Add department':
                 addDepartment()
                 break;  
             case 'Add role':
                addRole()
                break;  
            case 'Update employee role':
                    updateEmployeeRole()
                    break;
            default: 
            db.end()

        }
    })
}

function viewAllEmployee(){
    db.query(`SELECT * FROM employee LEFT JOIN role ON employee.role_id = role.id `,(err,res)=>{
        if (err) throw err
        console.table(res)
        mainPrompt()
    })

}
function viewDepartments(){
db.query(`SELECT * FROM department`,(err,res)=>{
        if (err) throw err
        console.table(res)
        mainPrompt()
    })

}

function viewAllRoles(){
    db.query(`SELECT * FROM role LEFT JOIN department ON role.department_id= department.id `,(err,res)=>{
            if (err) throw err
            console.table(res)
            mainPrompt()
        })
    
    }
    function addDepartment() {
        inquirer
            .prompt({
              type: "input",
              name: "deptName",
              message: "Enter the name of new department:",
            })
            .then((answer) => { 
                db.query(`INSERT INTO department SET?` ,{name:answer.deptName},(err,res)=>{
                    if (err) throw err
                    console.log("department added")
                    mainPrompt()
                })
                });
    }
    function addEmployee() {
        db.query(`SELECT * FROM role;`, (err, res)=>{
            if (err) throw err
            let roles= res.map((role)=>({name:role.title, value:role.id}))
       db.query(`SELECT * FROM employee;`, (err,res)=>{
        let employees= res.map((employee)=>({
            name: employee.first_name + " " + employee.last_name,
            value:employee.id
        }))
      
        inquirer
            .prompt([{
              type: "input",
              name: "firstName",
              message: "Enter the employee's first name:",
              
            },
            {
                type: "input",
                name: "lastName",
                message: "Enter the employee's last name:",
                
              },
            {
                type:"list",
                name:"roleId",
                message:"which role does the employee have?",
                choices:roles

            },
            {
                type: "list",
                name:"managerId",
                message:"Who is the employees Manager?",
                choices:employees

            }
        ])
       
            .then((answer) => { 
                db.query(`INSERT INTO employee SET?` ,
                {first_name:answer.firstName,
                  last_name:answer.lastName,
                  role_id:answer.roleId,
                  manager_id:answer.managerId
                    
                },(err,res)=>{
                    if (err) throw err
                    console.log("employee added")
                    mainPrompt()
                })
                });
            })
        })
    }

    function addRole(){
        db.query(`SELECT * FROM department;`, (err, res)=>{
            if(err) throw err;
            let departments= res.map((department)=>({name:department.name, value:department.id}))

            prompt([
                {
                    type:"input",
                    name:"title",
                    message:"What role would you like to add?"
                },
                {
                    type:"input",
                    name:"salary",
                    message:"what is the salary for this role?"
                },
                {
                    type:"list",
                    name:"departmentId",
                    message:"which department does this role belong to?",
                    choices:departments
                }
            ]).then((answer)=>{
                db.query(`INSERT INTO role SET?`,
                {
                    title: answer.title,
                    salary:answer.salary,
                    department_id:answer.departmentId
                },(err,res)=>{
                    if (err) throw err
                    console.log(`${answer.title} was sucessfully added to the database`)
                    mainPrompt()
                })
            })
        })
    }

    function updateEmployeeRole(){
        db.query(`SELECT * FROM role;`, (err, res)=>{
            if (err) throw err
            let roles= res.map((role)=>({name:role.title, value:role.id}))
       db.query(`SELECT * FROM employee;`, (err,res)=>{
        let employees= res.map((employee)=>({
            name: employee.first_name + " " + employee.last_name,
            value:employee.id
        }))

        prompt([
            {
                type:"list",
                name:"employee",
                message:"which employee would you like to update the role for?",
                choices:employees
            },
            {
                type:"list",
                name:"role",
                message:"Which role will your employee take?",
                choices:roles
            }
        ]).then((answer)=>{
            db.query(`UPDATE employee SET ? WHERE ?`,
            [{
                role_id: answer.role
            },{
                id:answer.employee
            }], (err, res)=>{
                if(err) throw err
                console.log(`Employee sucessfully updated in Database`);
                mainPrompt()
            })
        })
    })
})

    }

mainPrompt()