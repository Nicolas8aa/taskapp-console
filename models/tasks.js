const dateFormat = require("../helpers/dateFormat");
const Task = require("./task");
require("colors");

class Tasks {
  constructor() {
    this._list = {};
  }
  addTask(desc = "") {
    const task = new Task(desc);
    this._list[task.id] = task;
  }

  loadTasks(tasks = []) {
    tasks.forEach((task) => {
      this._list[task.id] = task;
    });
  }

  tasksPrinter(tasks = [], showDate = false) {
    console.log("");
    tasks.forEach((task, i) => {
      const { description, completedAt } = task;

      console.log(
        `${i + 1}.`.blue,
        description,
        showDate
          ? `${completedAt}`.green
          : `:: ${completedAt ? "Completed".green : "Pending".red}`
      );
    });
  }
  fullList() {
    this.tasksPrinter(this.tasksList);
  }
  completedPendingTasks(completeds = true) {
    const list = this.tasksList.filter((task) =>
      completeds ? task.completedAt : !task.completedAt
    );

    this.tasksPrinter(list, completeds);
  }

  deleteTask(ids = []) {
    ids.forEach((id) => {
      if (!this._list[id]) return;
      delete this._list[id];
    });
  }

  toggleCompleted(ids = []) {
    ids.forEach((id) => {
      const task = this._list[id];
      if (!task.completedAt) {
        task.completedAt = dateFormat(new Date().toISOString());
      }
    });
    this.tasksList.forEach((task) => {
      if (!ids.includes(task.id)) {
        this._list[task.id].completedAt = null;
      }
    });
  }

  get tasksList() {
    return Object.entries(this._list).map((el) => el[1]);
  }
}

module.exports = Tasks;
