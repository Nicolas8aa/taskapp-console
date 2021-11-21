const inquirer = require("inquirer");
require("colors");

const menuOptions = [
  {
    type: "list",
    name: "option",
    message: "Select an option :)",
    choices: [
      {
        value: "1",
        name: `${"1.".blue} Create task`,
      },
      {
        value: "2",
        name: `${"2.".blue} List tasks`,
      },
      {
        value: "3",
        name: `${"3.".blue} List completed tasks`,
      },
      {
        value: "4",
        name: `${"4.".blue} List pending tasks`,
      },
      {
        value: "5",
        name: `${"5.".blue} Complete task(s)`,
      },
      {
        value: "6",
        name: `${"6.".blue} Delete task(s)`,
      },
      {
        value: "0",
        name: `${"0.".blue} Exit`,
      },
    ],
  },
];

const menu = async () => {
  console.clear();
  console.log("========================".cyan);
  console.log("  Taskapp  ".cyan);
  console.log("========================".cyan);

  const { option } = await inquirer.prompt(menuOptions);
  return option;
};

const pause = async () => {
  console.log("\n");
  await inquirer.prompt([
    {
      type: "input",
      name: "enter",
      message: `Press ${"Enter".green} to continue`,
    },
  ]);
};

const inputOption = async (message = "") => {
  const question = [
    {
      type: "input",
      name: "inOption",
      message,
      validate(value) {
        if (!value) return "Insert a message please";
        return true;
      },
    },
  ];
  const { inOption } = await inquirer.prompt(question);
  return inOption;
};

const deleteTasksList = async (tasks = []) => {
  const choices = tasks.map((task, i) => {
    const idx = `${i + 1}.`.blue;
    return {
      value: task.id,
      name: `${idx} ${task.description}`,
      checked: false,
    };
  });
  const { ids } = await inquirer.prompt([
    {
      type: "checkbox",
      name: "ids",
      message: "Select a task(s) to delete",
      choices,
    },
  ]);
  return ids;
};

const showToCheckList = async (tasks = []) => {
  const choices = tasks.map((task, i) => {
    return {
      value: task.id,
      name: `${task.description}`,
      checked: task.completedAt ? true : false,
    };
  });
  const { ids } = await inquirer.prompt([
    {
      type: "checkbox",
      name: "ids",
      message: "Select",
      choices,
    },
  ]);
  return ids;
};

const confirm = async (msg = "") => {
  const question = [
    {
      type: "confirm",
      name: "ok",
      message: msg,
    },
  ];
  const { ok } = await inquirer.prompt(question);
  return ok;
};

module.exports = {
  menu,
  pause,
  inputOption,
  deleteTasksList,
  confirm,
  showToCheckList,
};
