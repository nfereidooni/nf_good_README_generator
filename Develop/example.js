const inquirer = require("inquirer");
const fs = require("fs");
const util = require("util");
const screenshot = "images/screenshot.PNG";
const writeFile = util.promisify(fs.writeFile);

function promptUser() {
  return inquirer.prompt([
    {
      type: "input",
      message: "What is the name of your project?",
      name: "title",
    },
    {
      type: "input",
      message: "Please enter a description for your project.",
      name: "description",
    },
    {
      type: "input",
      message: "What are the installation instructions for this project?",
      name: "install",
    },
    {
      type: "input",
      message: "Provide some examples on how this project should be used.",
      name: "usage",
    },
    {
      type: "input",
      message: "How do you want others to contribute to this project?",
      name: "contribution",
    },
    {
      type: "input",
      message: "What are the test instructions?",
      name: "test",
    },
    {
      type: "checkbox",
      message: "Please select a license",
      choices: ["Apache", "MIT", "ISC", "GNU GPLv3"],
      name: "license",
    },
    {
      type: "input",
      message: "Who's credit is this work?",
      name: "credit",
    },
    {
      type: "input",
      message: "What is your GitHub username?",
      name: "username",
    },
    {
      type: "input",
      message: "What is your email address?",
      name: "email",
    },
  ]);
}

function generateMarkDown(response) {
  return `
# ${response.title}
## Table of Contents
- [Description](#description)
- [Installastion](#installation)
- [Usage](#usage)
- [Contributing](#contribution)
- [Test](#test)
- [Credits](#credits)
- [License](#license)
- [Questions](#questions)
## Description:
![License](https://img.shields.io/badge/license-${response.license}-blue.svg "License Badge")
${response.description}
![Screenshot](${screenshot})
## Installation:
${response.install}
## Usage:
${response.usage}
## Contribution:
${response.contribution}
## Test:
${response.test}
## Credits: 
${response.credit}
## License: 
For more information about the license, click on the link below.
- [License](https://choosealicense.com/licenses/mit/)
## Questions:
For questions about this project you can go to my GitHub page at the following link:
- [GitHub Profile](https://github.com/${response.username})
For additional questions please reach out to me at: ${response.email}.
`;
}
// function to initialize program
async function initialize() {
  try {
    const response = await promptUser();
    const readMe = generateMarkDown(response);
    await writeFile("README.md", readMe);
    console.log("Readme was generated");
  } catch (error) {
    console.log(error);
  }
}

// function call to initialize program
initialize();