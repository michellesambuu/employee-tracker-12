const inquirer = require('inquirer')
const db = require('./db /connection')
require('console.table')

function mainPrompt(){
    inquirer.prompt([{
        type:'list',
        name: 'choose',
        message: 'which action woild you like to take',
        choices:['View all employees', 'View all departments','View all roles','Add an employee', 'Add department','Add role','Update employee role','quit']

    }])
    .then((anwer)=>{
        switch(anwer.choose){
           case 'View all employees':
            viewAllEmployee()
            break;
            case 'View all departments':
            viewDepartments()
            break;
            case 'View all roles':
                viewAllRoles()
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
mainPrompt()