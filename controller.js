const fs = require('fs');
const id = require('uniqid');
const tasksPath = './model/tasks.json';

function controller() {
  const read = async ctx => {
    const tasks = await readFile(tasksPath);

    ctx.set('Content-Type', 'application/json')
    ctx.body = tasks;
  }

  const wright = async ctx => {
    const task = ctx.request.body;
    let tasks = await readFile(tasksPath);

    task.id = id();
    tasks = JSON.parse(tasks);
    tasks.push(task);

    await wrightFile(tasksPath, tasks);

    ctx.body = 'Task added';
  }

  const update = async ctx => {
    let tasks = await readFile(tasksPath);
    tasks = JSON.parse(tasks);

    let taskToUpdate = findById(tasks, ctx.params.id);
    taskToUpdate = Object.assign(taskToUpdate, ctx.request.body);

    await wrightFile(tasksPath, tasks);

    ctx.body = 'Task updated';
  }

  const remove = async ctx => {
    let tasks = await readFile(tasksPath);
    tasks = JSON.parse(tasks);

    tasks.splice(tasks.findIndex(i => i.id === ctx.params.id), 1);

    await wrightFile(tasksPath, tasks);

    ctx.body = 'Task is removed';
  }

  function readFile(path) {
    return new Promise((res, rej) => {
      fs.readFile(path, ((err, data) => {
        if (err) rej(err);
        res(data);
      }));
    });
  }

  function wrightFile(path, json) {
    return new Promise((res, rej) => {
      fs.writeFile(path, JSON.stringify(json), err => {
        if (err) rej(err);
        res();
      });
    });
  }

  function findById(tasks, id) {
    return tasks.find(task => task.id === id);
  }

  return {
    read,
    wright,
    update,
    remove
  }
}

module.exports = controller;