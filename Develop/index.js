//Load all the modules
const inquirer = require("inquirer")
const fs = require("fs")
const util = require("util")
const axios = require("axios");
const boxen = require('boxen');
const emoji = require('node-emoji')

// Function to generate the readme template
const readme = (newData) => {
  return `
# ${newData[0].title} 
${newData[0].licenseBadge}
[![Generic badge](https://img.shields.io/badge/Version-${newData[0].version}-BLUE.svg)](https://shields.io/)
## Table of Contents

1. [Description](#description)
2. [Installation](#installation)
3. [Usage](#usage)
4. [License](#license)
5. [Contributing](#contributing)
6. [Test](#tests)
7. [Question](#questions)

## Description
${newData[0].description}

## Installation 
${newData[0].installation}
## Usage 
\`\`\`
${newData[0].usage}
\`\`\`

## License 
${newData[0].license}
## Contributing
Accepting contribution: ${newData[0].contribution} <br>
Method: ${newData[0].contributionRequirement}

## Tests
${newData[0].test}

## Questions 
- Github username : ${newData[0].username}
- Github Repo : ${newData[1]}
- Email : ${newData[0].email} `
}


// array of questions for user
const questions = [
  {
    type: "input",
    name: "name",
    message: `What is your name? ${emoji.get("sunglasses")}`,
    default: "Honey"
  },
  {
    type: "input",
    name: "title",
    message: `What is the title of your project? ${emoji.get("spiral_note_pad")}`,
    default: "To be announced"
  },
  {
    type: "input",
    name: "username",
    message: `What is your Github username? ${emoji.get("key")}`,
    default: ""
  },
  {
    type: "input",
    name: "email",
    message: `What is your email address? ${emoji.get("house")}`,
    default: "I don't have an email address"
  },
  {
    type: "input",
    name: "contact",
    message: `How do you want people to reach you? ${emoji.get("mailbox")}`,
    default: "Do not contact me"
  },
  {
    type: "input",
    name: "description",
    message: `Please type a short description of your project ${emoji.get("pencil")}`,
    default: "This is a project"
  },
  {
    type: "input",
    name: "installation",
    message: `How do you install this application? ${emoji.get("arrow_double_down")}`,
    default: "No installation"
  },
  {
    type: "input",
    name: "usage",
    message: `Give example of some ways you can use this application ${emoji.get("question")}`,
    default: "Not available"
  },
  {
    type: "list",
    name: "license",
    message: `What kind of license would you like to use? ${emoji.get("closed_lock_with_key")}`,
    choices: ["MIT", "Mozilla Public License 2.0", "Attribution License (BY)", "Open Database License (ODbL)", "Public Domain Dedication and License (PDDL)"],
    default: "Not Available"
  },
  {
    type: "list",
    name: "contribution",
    message: `Are you open to contribution? ${emoji.get("man-woman-girl-girl")}`,
    choices: ["Yes", "No"],
    default: "Yes"
  },
  {
    type: "input",
    name: "contributionRequirement",
    message: `If Yes, What are your requirement for giving contribution? ${emoji.get("man-raising-hand")}`,
    default: "No Requirement"
  },
  {
    type: "input",
    name: "test",
    message: `Please give instructions for testing of this project ${emoji.get("rocket")}`,
    default: "No instruction available"
  },
  {
    type: "input",
    name: "version",
    message: `What is the current version of your project? (numbers only) ${emoji.get("rocket")}`,
    default: "1.0"
  }
]

//initialize the application
init = () => {
  //Asking users a series of question to fill their readme
  inquirer.prompt(questions)
    .then(data => {
      // console.log(data.license);
      // console.log(typeof(data.license));
      //Create a new key to contain license badge value
      data["licenseBadge"] = ""
      // add the value of license badge to match with the name of the license
      if (data.license == "MIT") { data.licenseBadge = `[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)` };
      if (data.license == "Mozilla Public License 2.0") { data.licenseBadge = `[![License: MPL 2.0](https://img.shields.io/badge/License-MPL%202.0-brightgreen.svg)](https://opensource.org/licenses/MPL-2.0)` };
      if (data.license == "Attribution License (BY)") { data.licenseBadge = `[![License: Open Data Commons Attribution](https://img.shields.io/badge/License-ODC_BY-brightgreen.svg)](https://opendatacommons.org/licenses/by/)` };
      if (data.license == "Open Database License (ODbL)") { data.licenseBadge = `[![License: ODbL](https://img.shields.io/badge/License-ODbL-brightgreen.svg)](https://opendatacommons.org/licenses/odbl/)` };
      if (data.license == "Public Domain Dedication and License (PDDL)") { data.licenseBadge = `[![License: ODbL](https://img.shields.io/badge/License-PDDL-brightgreen.svg)](https://opendatacommons.org/licenses/pddl/)` };
      newData = [data]
      console.log(newData)
      //save the answers into an array
      return newData
    })
    .then((newData) => {
      const queryUrl = `https://api.github.com/users/${newData[0].username}`;
      //Do a axios call to acquire user's main github repo's link using username provided
      axios.get(queryUrl).then((res) => {
        const githubRepo = res.data.html_url;
        //add the user's github repo link into the array created above
        newData.push(githubRepo);
        // Write a new file using variables from the array created above to fill in the blank
        fs.writeFile("test.md", readme(newData), "utf8", function (err) {
          if (err) {
            console.log("error")
          }
        }
        )
        console.log(boxen(` YOUR README HAS BEEN CREATED ${newData[0].name}  `, { padding: 1 }));
      })
        //If the user provide an invalid github username, the app will alert about this error
        .catch(function (error) {
          // handle error
          console.log(boxen(`      ${emoji.get("x")} ${emoji.get("x")} ${emoji.get("x")}
      This repo doesn't exist, please run the program again with a valid username
      ${emoji.get("x")} ${emoji.get("x")} ${emoji.get("x")}
      `));
        })
    })
}

init()











