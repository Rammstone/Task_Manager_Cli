#!/usr/bin/env node

const fs = require ("fs/promises");
const readline = require("readline/promises");
const { structuredClone } = require("worker_threads");

// const rl = readline.createInterface({
//     input:process.stdin,
//     output: process.stdout
// });

const filepath = './tasksFile.json'
const initialData = {
    taskList : []
}


const args = process.argv.slice(2);

async function main(){

    switch(args[0])
    {
        case "start":
            await greetingMessage();
            break;

        case "add":
            await addTask(args[1]);
            break;
        
        case "update":
            await updateTask(args[1], args[2]);
            break;

        case "mark":
            await markTask(args[1], args[2]);
            break;

        case "delete":
            await deleteTask(args[1]);
            break;

        case "list":
            await listTask(args[1]);
            break;

        default: 
            console.error("Invalid Command. Command not found !");
    }
}

async function greetingMessage() {

    console.log(`Welcome To Your Task Manager !\nEnter the task within "" to add and update tasks`);
    await createTaskFile();
    
}

async function createTaskFile() {

    await fs.writeFile(
        filepath,
        JSON.stringify(initialData, null, 2),
        "utf8"
    );
    
}

async function addTask(task) {

    let filedata;

    try{
        const fileContent = await fs.readFile(filepath, "utf8");
        filedata = JSON.parse(fileContent);
    } catch {
       await createTaskFile();
       filedata = structuredClone(initialData);
    }

    let data = {
        description: task,
        status: "todo"
    }
    
    filedata.taskList.push(data);

    await fs.writeFile(filepath, JSON.stringify(filedata, null, 2),"utf8");

    console.log(`Task added successfully !! TaskID : ${filedata.taskList.length}`);
}

async function updateTask(id, task) {

    let filedata;

    try{
        const fileContent = await fs.readFile(filepath, "utf8");
        filedata = JSON.parse(fileContent);
    } catch {
        console.error("No tasks added to begin with, please add a task first");
        return;
    }

    if(id < 0 || id > filedata.taskList.length || id === undefined)
        console.error("Invalid taskID entered ");

    if(task === "" || task === undefined)
        console.log("Updation not specified no changes made");
    else
    {
        filedata.taskList[id-1].description = task;

        await fs.writeFile(filepath, JSON.stringify(filedata, null, 2),"utf8");

        console.log(`Task updated successfully`);
    }
    
}

async function markTask(updStatus, id) {

    let filedata;

    try{
        const fileContent = await fs.readFile(filepath, "utf8");
        filedata = JSON.parse(fileContent);
    } catch {
        console.error("No tasks added to begin with, please add a task first");
        return;
    }

    if(id < 0 || id > filedata.taskList.length || id === undefined)
        console.error("Invalid taskID entered ");
    else
    {
        filedata.taskList[id-1].status = updStatus;

        await fs.writeFile(filepath, JSON.stringify(filedata, null, 2),"utf8");

        console.log(`Task ${id} marked ${updStatus} successfully`);
    }
    
}

async function deleteTask(id) {

    let filedata;

    try{
        const fileContent = await fs.readFile(filepath, "utf8");
        filedata = JSON.parse(fileContent);
    } catch {
        console.error("No tasks added to begin with, please add a task first");
        return;
    }

    if(id < 0 || id > filedata.taskList.length || id === undefined)
        console.error("Invalid taskID entered ");
    else
    {
        filedata.taskList.splice(id-1,1);

        await fs.writeFile(filepath, JSON.stringify(filedata, null, 2),"utf8");

        console.log(`Task deleted successfully\n`);

        listTask();

    }
    
}

async function listTask(status) {

    let filedata;

    try{
        const fileContent = await fs.readFile(filepath, "utf8");
        filedata = JSON.parse(fileContent);
    } catch {
        console.error("No tasks added to begin with, please add a task first");
        return;
    }

    let tasksToShow;

    if (status === undefined) {
        tasksToShow = filedata.taskList;
    } else {
        tasksToShow = filedata.taskList.filter(
            task => task.status === status
        );
    }

    console.table(
        tasksToShow.map((task, index) => ({
            TaskID: index + 1,
            Task_Description: task.description,
            Task_Status: task.status
        }))
    );    

}

main();