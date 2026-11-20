
const db = require('../config/db');

// 1. CREATE TASK

// 1. CREATE TASK
exports.createTask = async (req, res) => {
  try {
    const { title, description, status, priority } = req.body;

    // Validate title
    if (!title || typeof title !== 'string' || !title.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Task title is required'
      });
    }

    // Validate description
    if (description !== undefined &&
        description !== null &&
        typeof description !== 'string') {
      return res.status(400).json({
        success: false,
        message: 'Description must be a string'
      });
    }

    // Validate status
    const allowedStatuses = ['pending', 'in_progress', 'completed'];

    if (status !== undefined && !allowedStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid task status'
      });
    }

    // Validate priority
    const allowedPriorities = ['low', 'medium', 'high'];

    if (priority !== undefined && !allowedPriorities.includes(priority)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid task priority'
      });
    }

    // Insert task into database
    const result = await db.query(
      `INSERT INTO tasks
       (user_id, title, description, status, priority)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING id`,
      [
        req.user.id,
        title.trim(),
        description || null,
        status || 'pending',
        priority || 'medium'
      ]
    );

    res.status(201).json({
      success: true,
      message: 'Task created successfully',
      taskId: result.rows[0].id
    });

  } catch (error) {
    console.error('CREATE TASK ERROR:', error);

    res.status(500).json({
      success: false,
      message: 'Failed to create task'
    });
  }
};


// 2. GET ALL TASKS
exports.getTasks = async (req, res) => {
  try {
    const result = await db.query(
      `SELECT * FROM tasks
       WHERE user_id = $1
       ORDER BY created_at DESC`,
      [req.user.id]
    );

    res.status(200).json({
      success: true,
      count: result.rows.length,
      tasks: result.rows
    });

  } catch (error) {
    console.error('GET TASKS ERROR:', error);

    res.status(500).json({
      success: false,
      message: 'Failed to fetch tasks'
    });
  }
};

// 3. GET SINGLE TASK
exports.getTaskById = async (req, res) => {
  try {
    const result = await db.query(
      `SELECT * FROM tasks
       WHERE id = $1 AND user_id = $2`,
      [req.params.id, req.user.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Task not found'
      });
    }

    res.status(200).json({
      success: true,
      task: result.rows[0]
    });

  } catch (error) {
    console.error('GET TASK ERROR:', error);

    res.status(500).json({
      success: false,
      message: 'Failed to fetch task'
    });
  }
};

// 4. UPDATE TASK
exports.updateTask = async (req, res) => {
  try {
    const allowedFields = ['title', 'description', 'status', 'priority'];
    const updates = [];
    const values = [];

    for (const field of allowedFields) {
      if (req.body[field] !== undefined) {
        const value = req.body[field];

        if (field === 'title' &&
            (typeof value !== 'string' || !value.trim())) {
          return res.status(400).json({
            success: false,
            message: 'Task title cannot be empty'
          });
        }

        if (field === 'status' &&
            !['pending', 'in_progress', 'completed'].includes(value)) {
          return res.status(400).json({
            success: false,
            message: 'Invalid task status'
          });
        }

        if (field === 'priority' &&
            !['low', 'medium', 'high'].includes(value)) {
          return res.status(400).json({
            success: false,
            message: 'Invalid task priority'
          });
        }

        values.push(field === 'title' ? value.trim() : value);
        updates.push(`${field} = $${values.length}`);
      }
    }

    if (updates.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Provide at least one field to update'
      });
    }

    updates.push('updated_at = NOW()');

    values.push(req.params.id);
    const taskIdPosition = values.length;

    values.push(req.user.id);
    const userIdPosition = values.length;

    const result = await db.query(
      `UPDATE tasks
       SET ${updates.join(', ')}
       WHERE id = $${taskIdPosition}
       AND user_id = $${userIdPosition}
       RETURNING id`,
      values
    );

    if (result.rowCount === 0) {
      return res.status(404).json({
        success: false,
        message: 'Task not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Task updated successfully'
    });

  } catch (error) {
    console.error('UPDATE TASK ERROR:', error);

    res.status(500).json({
      success: false,
      message: 'Failed to update task'
    });
  }
};

// 5. DELETE TASK
exports.deleteTask = async (req, res) => {
  try {
    const result = await db.query(
      `DELETE FROM tasks
       WHERE id = $1 AND user_id = $2
       RETURNING id`,
      [req.params.id, req.user.id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({
        success: false,
        message: 'Task not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Task deleted successfully'
    });

  } catch (error) {
    console.error('DELETE TASK ERROR:', error);

    res.status(500).json({
      success: false,
      message: 'Failed to delete task'
    });
  }
};
