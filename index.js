const inquirer = require('inquirer')
const db = require('./db /connection')
require('console.table')

function mainPrompt(){
    inquirer.prompt([{
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
            quit()

        }
    })
}

function viewAllEmployee(){
    db.query(`SELECT * FROM employee LEFT JOIN role ON employee.role_id = role.id `,(err,res)=>{
        if (err) throw err
        console.log(res)
        mainPrompt()
    })

}
function viewDepartments(){
db.query(`SELECT * FROM department`,(err,res)=>{
        if (err) throw err
        console.log(res)
        mainPrompt()
    })

}

function viewAllRoles(){
    db.query(`SELECT * FROM role LEFT JOIN department ON role.department_id= department.id `,(err,res)=>{
            if (err) throw err
            console.log(res)
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
                    mainPrompt
                })
                });
    }

mainPrompt()