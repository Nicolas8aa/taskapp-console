const { v4: uuid } = require("uuid");

class Task {
  constructor(description) {
    this.description = description;
    this.id = uuid();
    this.completedAt = null;
  }
}

module.exports = Task;
