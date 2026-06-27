# Task Manager CLI

A lightweight command-line task manager built with Node.js for creating, organizing, and tracking tasks directly from the terminal using the `taskcli` command.

---

## Features

* Add new tasks
* Update existing tasks
* Delete tasks
* Mark tasks as `todo`, `in-progress`, or `done`
* List all tasks
* Filter tasks by status
* Store tasks locally in a JSON file

---

## Installation

Clone the repository:

```bash
git clone https://github.com/Rammstone/Task_Manager_Cli.git
```

Navigate to the project directory:

```bash
cd task-manager-cli
```

Install the dependencies:

```bash
npm install
```

Install the CLI globally:

```bash
npm install -g .
```

Verify the installation:

```bash
taskcli --help
```

---

## Usage

Initialize the task manager:

```bash
taskcli start
```

Add a task:

```bash
taskcli add "Complete JavaScript assignment"
```

Update a task:

```bash
taskcli update 1 "Complete Node.js assignment"
```

Mark a task as completed:

```bash
taskcli mark done 1
```

Mark a task as in progress:

```bash
taskcli mark in-progress 2
```

Delete a task:

```bash
taskcli delete 1
```

List all tasks:

```bash
taskcli list
```

List tasks by status:

```bash
taskcli list todo
```

```bash
taskcli list in-progress
```

```bash
taskcli list done
```

---

## Data Storage

Tasks are stored locally in `tasksFile.json`.

Each task has the following structure:

```json
{
  "description": "Learn Node.js",
  "status": "todo"
}
```

---

## Project Structure

```text
.
├── cli.js
├── package.json
├── tasksFile.json
└── README.md
```

---

## Future Improvements

* Generate unique task IDs
* Add due dates
* Support task priorities
* Add categories and tags
* Search tasks
* Interactive mode
* Colored terminal output
* Better input validation

---

## Acknowledgements

This project was built as part of the **Task Tracker CLI** project from **roadmap.sh**, which provides practical projects for learning software development by building real-world applications.

Project link: https://roadmap.sh/projects/task-tracker

---

## License

This project is licensed under the MIT License.
