require("colors");

const showMenu = () => {
  return new Promise((res, rej) => {
    console.clear();
    console.log("========================".green);
    console.log("  Select an option  ".white);
    console.log("========================".green);

    console.log(`${"1.".blue} Create task`);
    console.log(`${"2.".blue} Show tasks`);
    console.log(`${"3.".blue} Show completed tasks`);
    console.log(`${"4.".blue} Show pending tasks`);
    console.log(`${"5.".blue} Complete a task(s)`);
    console.log(`${"6.".blue} Delete task`);
    console.log(`${"0.".blue} Exit\n`);

    const readline = require("readline").createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    readline.question("Select an option: ", (option) => {
      res(option);
      readline.close();
    });
  });
};

const pause = () => {
  return new Promise((res) => {
    const readline = require("readline").createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    readline.question(`\nPress ${"Enter".green} to continue\n`, (option) => {
      readline.close();
      res();
    });
  });
};

module.exports = { showMenu, pause };
