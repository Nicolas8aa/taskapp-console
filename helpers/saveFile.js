const fs = require("fs");

const file = "./db/data.json";

const save = (data) => {
  fs.writeFileSync(file, JSON.stringify(data));
};

const readFile = () => {
  if (!fs.existsSync(file)) return;
  const info = fs.readFileSync(file, { encoding: "utf-8" });
  return JSON.parse(info);
};

module.exports = { save, readFile };
