const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const employeeList = [];

// Ask user for manger info
function askUserforManagerInfo() {
    //name, id, email, officeNumber
    return inquirer.prompt([
        {
            type: "input",
            message: "What is the manager's name?",
            name: "name",
        }, {
            type: "input",
            message: "What is the manager's id?",
            name: "id",
        }, {
            type: "input",
            message: "What is the manager's email?",
            name: "email",
        }, {
            type: "input",
            message: "What is the manager's office number?",
            name: "officeNumber",
        }

    ]).then((managerData) => {

        const newManager = new Manager ( managerData.name, managerData.id, managerData.email, managerData.officeNumber );
        employeeList.push( newManager );
        askUserforEmployeeType();

    });
}

// Ask user for next employee type
function askUserforEmployeeType() {

    return inquirer.prompt([
        {
            type: "list",
            name: "newEmployee",
            message: "Which type of team member whould you like to add?",
            choices: [
                "Engineer",
                "Intern",
                "I have no one else I would like to add"
            ]
          },
    ]).then((newEmployeetype) => {

        if (newEmployeetype.newEmployee === "Engineer") {
            askUserForEngineerInfo();

        } else if (newEmployeetype.newEmployee === "Intern") {
            askUserforInternInfo();

        } else {
            createHtmlFile();
            
        }

    });
}

// Ask user for engineer info
function askUserForEngineerInfo() {
    //name, id, email, github
    return inquirer.prompt([
        {
            type: "input",
            message: "What is the engineer's name?",
            name: "name",
            
        }, {
            type: "input",
            message: "What is the engineer's ID?",
            name: "id",
        }, {
            type: "input",
            message: "What is the engineer's email?",
            name: "email",
        },{
            type: "input",
            message: "What is the engineer's github username?",
            name: "github",
        }
    ]).then((engineerData) => {

        const newEngineer = new Engineer(engineerData.name, engineerData.id, engineerData.email, engineerData.github);
        employeeList.push(newEngineer);
        askUserforEmployeeType();

    });
}

// Ask user for inter info
function askUserforInternInfo() {
    //name, id, email, school
    return inquirer.prompt([
        {
            type:"input",
            message: "What is the intern's name? ",
            name: "name",
        }, {
            type:"input",
            message: "What is the intern's id?",
            name: "id",
        }, {
            type:"input",
            message: "What is the intern's email?",
            name: "email",
        }, {
            type:"input",
            message: "What is the intern's school name?",
            name: "school",
        }
    ]).then((internData) => {

        const newIntern = new Intern ( internData.name, internData.id, internData.email, internData.school );
        employeeList.push(newIntern);
        askUserforEmployeeType();

    })
}

function createHtmlFile() {

    const htmlContent = render(employeeList);

    // Use FS module to create the output file
    fs.writeFile("output.html", htmlContent, (err) => {
        if (err) console.log("I'm meltting!");
        else console.log("Im on fire! Whoo!");
    });
}

askUserforManagerInfo();

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
