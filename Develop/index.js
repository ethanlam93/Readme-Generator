const inquirer = require("inquirer")
const fs = require("fs")
const util = require("util")
const axios = require("axios");
const boxen = require('boxen');

const readme = (newData) => {
  return `
# ${newData[0].title} 
Covered under ${newData[0].license}
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
Accepting contribution: ${newData[0].contribution}
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
    message: "What is your name?",
    default: "Honey"
  },
  {
    type: "input",
    name: "title",
    message: "What is the title of your project",
    default: "Untitled"
  },
  {
    type: "input",
    name: "username",
    message: "What is your Github username?",
    default: ""
  },
  {
    type: "input",
    name: "email",
    message: "What is your email address?",
    default: "I don't have an email address"
  },
  {
    type: "input",
    name: "contact",
    message: "How do you want people to reach you?",
    default: "Do not contact me"
  },
  {
    type: "input",
    name: "description",
    message: "Please type a short description of your project",
    default: "This is a project"
  },
  {
    type: "input",
    name: "installation",
    message: "How do you install this application? ",
    default: "No installation"
  },
  {
    type: "input",
    name: "usage",
    message: "Give example of some ways you can use this application ( When you are done, hit ESC & type \":wq\" to exit editor)",
    default: "Not available"
  },
  {
    type: "list",
    name: "license",
    message: "What kind of license would you like to use?",
    choices: ["MIT", "Microsoft Public License", "Mozilla Public License 2.0", "Academic Free License v3.0", "Open Software License 3.0", "Creative Commons Attribution 4.0"],
    default: "Not Available"
  },
  {
    type: "list",
    name: "contribution",
    message: "Are you open to contribution?",
    choices: ["Yes", "No"],
    default: "Yes"
  },
  {
    type: "input",
    name: "contributionRequirement",
    message: "If Yes, What are your requirement for giving contribution?",
    default: "No Requirement"
  },
  {
    type: "input",
    name: "test",
    message: "Please give instructions for testing of this project ( When you are done, hit ESC & type \":wq\" to exit editor)",
    default: "No instruction available"
  }
]

//Asking users a series of question to fill their readme
inquirer.prompt(questions)
  .then(data => {
    newData = [data]
    // console.log(newData)
    // console.log(typeof(newData[0].username))
    //save the answers into an array
    return newData
  })
  .then((newData) => {
    const queryUrl = `https://api.github.com/users/${newData[0].username}`;
    //Do a axios call to acquire user's main github repo's link using username provided
    axios.get(queryUrl).then((res) => {
      // console.log(res.data.html_url)
      // console.log(typeof(res.data.html_url))
      // console.log(res)
      const githubRepo = res.data.html_url;
      //add the user's github repo link into the array created above
      newData.push(githubRepo);
      // console.log(newData)
      // Write a new file using variables from the array created above to fill in the blank
      fs.writeFile("test.md", readme(newData), "utf8", function (err) {
        if (err) {
          console.log("error")
        }
      }
      )
      console.log(boxen(`YOUR README HAS BEEN CREATED`, { padding: 1 }));
    })
    //If the user provide an invalid github username, the app will alert about this error
    .catch(function (error) {
      // handle error
      console.log("This repo doesn't exist, please run the program again with a valid username");
    })
  })












