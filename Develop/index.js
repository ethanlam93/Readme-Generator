const inquirer = require("inquirer")
const fs = require("fs")
const util = require("util")
const readme = (data) => {
return `
# ${data.title} 
Covered under ${data.license}
## Table of Contents

1. [Description](#description)
2. [Installation](#installation)
3. [Usage](#usage)
4. [License](#license)
5. [Contributing](#contributing)
6. [Test](#test)
7. [Question](#question)

## Description
${data.description}

## Installation 
${data.installation}
## Usage 
\`\`\`
${data.usage}
\`\`\`

## License 
${data.license}
## Contributing
Accepting contribution: ${data.contribution}
${data.contributionRequirement}

## Tests
${data.test}

## Questions 

- Github Repo : 
- Email : ${data.email} `
}


// array of questions for user
const questions = [
{
  type: "input",
  name: "title",
  message: "What is the title of your project",
  default: "Not Available"
},  
{
  type: "input",
  name: "username",
  message: "What is your Github username?",
  default: "Not Available"
},
{
  type: "input",
  name: "email",
  message: "What is your email address?",
  default: "Not Available"
},
{
  type: "input",
  name: "contact",
  message: "How do you want people to reach you?",
  default: "Not Available"
},
{
  type: "input",
  name: "description",
  message: "Please type a short description of your project ( When you are done, hit ESC & type \":wq\" to exit editor )",
  default: "Not Available"
},
{
  type: "input",
  name: "installation",
  message: "How do you install this application? ( When you are done, hit ESC type \":wq\" to exit editor) ",
  default: "Not Available"
},
{
  type: "input",
  name: "usage",
  message: "Give example of some ways you can use this application ( When you are done, hit ESC & type \":wq\" to exit editor)",
  default: "Not Available"
},
{ 
  type: "list",
  name: "license",
  message: "What kind of license would you like to use?",
  choices: ["MIT","Microsoft Public License","Mozilla Public License 2.0","Academic Free License v3.0","Open Software License 3.0","Creative Commons Attribution 4.0"],
  default: "Not Available"
},
{
  type: "confirm",
  name: "contribution",
  message: "Are you open to contribution?",
  default: "Not Available"
},
{
  type: "input",
  name: "contributionRequirement",
  message: "If Yes, What are your requirement for giving contribution?",
  default: "Not Available"
},
{
  type: "input",
  name: "test",
  message: "Please give instructions for testing of this project ( When you are done, hit ESC & type \":wq\" to exit editor)",
  default: "Not Available"
}
]

// // function to write README file
// function writeToFile(fileName, data) {
//   fs.writeFile(fileName, data, "utf8", function(err) {
//     if (err) {
//       console.log(err);}
//   })}

// // function to initialize program
// const init = new Promise(function(resolve,reject) {
//   resolve(inquirer.prompt(questions))
//   // .then ((data)=> console.log(data.test))
// })


inquirer.prompt(questions).then(data => {
  fs.writeFile("test.md", readme(data), function(err) {

    if (err) {
      return console.log(err);
    }
    console.log("Success!");
  })})
  



