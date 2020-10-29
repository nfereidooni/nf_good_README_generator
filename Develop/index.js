const inquirer = require ('inquirer')
const fs = require ('fs')
const path = require('path')

// Prompt user questions
function promptUser() {
    return inquirer.prompt([
        {
            type: "input",
            name: "title",
            message: "What is the name of your project?",
        },
        {
            type: "input",
            name:"description",
            message: "Please enter a description for your project."
        },
        {
            type: "input",
            name:"install",
            message: "What are the installation instructions?"
        },
        {
            type: "input",
            name: "usage",
            message: "How should your project be used?",
        },
        {
            type: "input",
            name: "contribution",
            message: "How do you want others to contribute to your project?",
        },
        {
            type: "input",
            name: "test",
            message: "What are the test instructions?",
        },
        {
         
            type: "input",
            name: "credits",
            message: "Who would you like to credit for your project?"

        },
        {
            type: "input",
            name: "github",
            message: "What is your GitHub username?",
        },
        {
            type: "checkbox",
            name: "license",
            message: "Please select one license for this project",
            choices: ["Apache","MIT","ISC","GNU GPL v3"]
        },
       ])
   }

// License Function

function writeLicense(license){
    if (license[0] === "Apache"){
        return fs.readFileSync(path.resolve(__dirname, './license/apache.txt'), { encoding: 'utf-8'})
    }
    else if (license[0] === "MIT"){
        return fs.readFileSync(path.resolve(__dirname, './license/mit.txt'), { encoding: 'utf-8'})
    }
    else if (license[0] === "ISC"){
        return fs.readFileSync(path.resolve(__dirname, './license/isc.txt'), { encoding: 'utf-8'})
    }
    else if (license[0] === "GNU GPL v3"){
        return fs.readFileSync(path.resolve(__dirname, './license/gnu.txt'), { encoding: 'utf-8'})
    }
}

// Write READme Function
function writeREADme(response){
    return`
# ${response.title}
## Table of Contents
- [Description](#description)
- [Installation](#installation)
- [Usage](#usage)
- [Contribution](#contribution)
- [Test](#test)
- [Credits](#credits)
- [License](#license)
- [Questions](#questions)

![License](https://img.shields.io/badge/license-${response.license}-blue.svg)

## Description: 
     ${response.description}
## Installation:
     ${response.install}
## Usage:
     ${response.usage}
## Contribution:
     ${response.contribution}     
## Test:
     ${response.test}
## Credits:
    ${response.credits}
## License:
    ${writeLicense(response.license)}
## Questions:
For questions about this project, please visit my GitHub page:
- [GitHub Profile](https://github.com/${response.github})`
}

// Generate READme Function
function generateREADme(){
  promptUser()
  .then(function(response) {
      let readMe = writeREADme(response);
      fs.writeFileSync("README.md" , readMe)
  })
  .catch(function(err){
      console.log("Error occured during generate" , err)
  })
}
generateREADme();




// GIVEN a command-line application that accepts user input
// WHEN I am prompted for information about my application repository
// THEN a quality, professional README.md is generated with the title of your project and sections entitled Description, Table of Contents, Installation, Usage, License, Contributing, Tests, and Questions
// WHEN I enter my project title
// THEN this is displayed as the title of the README
// WHEN I enter a description, installation instructions, usage information, contribution guidelines, and test instructions
// THEN this information is added to the sections of the README entitled Description, Installation, Usage, Contributing, and Tests
// WHEN I choose a license for my application from a list of options
// THEN a badge for that license is added hear the top of the README and a notice is added to the section of the README entitled License that explains which license the application is covered under
// WHEN I enter my GitHub username
// THEN this is added to the section of the README entitled Questions, with a link to my GitHub profile
// WHEN I enter my email address
// THEN this is added to the section of the README entitled Questions, with instructions on how to reach me with additional questions
// WHEN I click on the links in the Table of Contents
// THEN I am taken to the corresponding section of the README