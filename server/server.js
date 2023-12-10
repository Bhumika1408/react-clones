const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db');

const app = express();
const port = 3000;

app.use(bodyParser.json());

// User registration route
app.post('/register', (req, res) => {
  const { username, email, password } = req.body;
  const sql = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
  db.run(sql, [username, email, password], (err) => {
    if (err) {
      console.error('Error registering user:', err);
      res.status(500).json({ error: 'An error occurred while registering the user.' });
    } else {
      res.status(200).json({ message: 'User registered successfully.' });
    }
  });
});

// Project creation route
app.post('/createProject', (req, res) => {
  const { projectName, description, startDate, endDate, status } = req.body;

  const sql = 'INSERT INTO projects (project_name, description, start_date, end_date, status) VALUES (?, ?, ?, ?, ?)';
  db.run(sql, [projectName, description, startDate, endDate, status], (err) => {
    if (err) {
      console.error('Error creating project:', err);
      res.status(500).json({ error: 'An error occurred while creating the project.' });
    } else {
      res.status(200).json({ message: 'Project created successfully.' });
    }
  });
});

// Task creation route
app.post('/createTask', (req, res) => {
  const { taskName, description, dueDate, status, assignedTo, projectId } = req.body;

  const sql = 'INSERT INTO tasks (task_name, description, due_date, status, assigned_to, project_id) VALUES (?, ?, ?, ?, ?, ?)';
  db.run(sql, [taskName, description, dueDate, status, assignedTo, projectId], (err) => {
    if (err) {
      console.error('Error creating task:', err);
      res.status(500).json({ error: 'An error occurred while creating the task.' });
    } else {
      res.status(200).json({ message: 'Task created successfully.' });
    }
  });
});

// Comment creation route
app.post('/createComment', (req, res) => {
  const { taskId, userId, commentText } = req.body;

  const sql = 'INSERT INTO comments (task_id, user_id, comment_text) VALUES (?, ?, ?)';
  db.run(sql, [taskId, userId, commentText], (err) => {
    if (err) {
      console.error('Error creating comment:', err);
      res.status(500).json({ error: 'An error occurred while creating the comment.' });
    } else {
      res.status(200).json({ message: 'Comment created successfully.' });
    }
  });
});

// Attachment upload route
app.post('/uploadAttachment', (req, res) => {
  const { taskId, userId, filePath } = req.body;

  const sql = 'INSERT INTO attachments (task_id, user_id, file_path) VALUES (?, ?, ?)';
  db.run(sql, [taskId, userId, filePath], (err) => {
    if (err) {
      console.error('Error uploading attachment:', err);
      res.status(500).json({ error: 'An error occurred while uploading the attachment.' });
    } else {
      res.status(200).json({ message: 'Attachment uploaded successfully.' });
    }
  });
});

// Query execution route
app.post('/runQuery', (req, res) => {
  const { query } = req.body;

  // Implement query execution logic here
  db.all(query, (err, result) => {
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).json({ error: 'An error occurred while executing the query.' });
    } else {
      res.status(200).json({ result });
    }
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
