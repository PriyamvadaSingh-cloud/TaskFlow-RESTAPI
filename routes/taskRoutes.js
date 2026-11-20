
const express = require('express');
const router = express.Router();

// Import JWT authentication middleware
const authMiddleware = require('../middleware/authMiddleware');

// Import task controller functions
const {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask
} = require('../controllers/taskController');

// Protect all task routes with authentication
router.use(authMiddleware);

// 1. Create a new task
router.post('/', createTask);

// 2. Get all tasks
router.get('/', getTasks);

// 3. Get a single task by ID
router.get('/:id', getTaskById);

// 4. Update an existing task
router.put('/:id', updateTask);

// 5. Delete a task
router.delete('/:id', deleteTask);

// Export router
module.exports = router;
