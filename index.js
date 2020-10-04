const fs = require("fs");
const path = require("path");

const tasksFileAbsolutePath = path.join(__dirname, "tasks.json"); // clase-5/tasks.json

const tasksJSON = fs.readFileSync(tasksFileAbsolutePath, { encoding: "utf-8" }); //<---

const tasks = JSON.parse(tasksJSON); // Convertir String en formato JSON a un Objecto de Javascript

function showAll() {
  for (let i = 0; i < tasks.length; i++) {
    const task = tasks[i];
    const doneText = task.done ? "✅" : "⛔";
    console.log(`- [${doneText}] ${task.name} (${task.deadline}) [${i}]`);
  }
}

function showDone() {
  for(let i = 0; i < tasks.length; i++) {
  const task = tasks[i];
    if(task.done) {
    console.log(`- [✅] ${task.name} (${task.deadline})`);
    }
  }
}

function showPending() {
   for (let i = 0; i < tasks.length; i++) {
     const task = tasks[i];
     if (!task.done) {
       console.log(`- [⛔] ${task.name} (${task.deadline})`);
     }
   }
}

function toggle(index) {
  tasks[index].done = !tasks[index].done;
  showAll();
  save()
}

function add(name, deadline) {
  const newtask = {
    name: name,
    deadline: deadline,
    done: false,
  };
  tasks.push(newtask);
  showAll();
  save();
}


function save() {
  const tasksJSON = JSON.stringify(tasks, null, 2); //Prietty print
  fs.writeFileSync(tasksFileAbsolutePath, tasksJSON);
}

const param = process.argv[2];
const fourthParam = process.argv[3];
const fifthParam = process.argv[4];

switch (param) {
  case "all":
    showAll();
    break;
  case "done":
    showDone();
    break;
  case "pending":
    showPending();
    break;
  case "toggle":
    toggle(fourthParam);
    break;
  case "add":
    add(fourthParam,fifthParam);
    break;
  default:
    console.log("Los parametros aceptados son: 'all', 'done' y 'pending'");
}
