require("colors");
const {
  menu,
  pause,
  inputOption,
  deleteTasksList,
  confirm,
  showToCheckList,
} = require("./helpers/inquirer");
const { save, readFile } = require("./helpers/saveFile");
const Tasks = require("./models/tasks");

const main = async () => {
  let option = "";

  const tasksDB = readFile();
  const tasks = new Tasks();

  if (tasksDB) tasks.loadTasks(tasksDB);

  do {
    option = await menu();
    switch (option) {
      case "1":
        const description = await inputOption("Call the task: ");
        tasks.addTask(description);
        break;
      case "2":
        tasks.fullList();
        break;
      case "3":
        tasks.completedPendingTasks();
        break;
      case "4":
        tasks.completedPendingTasks(false);
        break;
      case "5":
        const deleteIds = await showToCheckList(tasks.tasksList);
        tasks.toggleCompleted(deleteIds);
        break;
      case "6":
        const ids = await deleteTasksList(tasks.tasksList);
        // if (id == "0") break;
        const ok = await confirm("Are you sure?");
        if (ok) {
          tasks.deleteTask(ids);
          console.log(`Task(s) ${"deleted".red} :)`);
        }
        break;
    }

    save(tasks.tasksList);
    await pause();
  } while (option !== "0");
};

main();
