const Task = require('../models/Task.model')
const User = require('../models/User.model')

const router = require('express').Router()

router.post('/', async (req, res) => {
  // const { userId } = req.params
  const { userpic, userId } = req.body

  try {
    const user = await User.findByIdAndUpdate(userId, {
      userpic,
    })
    res.status(200).json(user)
  } catch (err) {
    res.status(400).json({
      error: err,
    })
  }
})

// /api/user/tasks - get all user's tasks
router.get('/tasks', async (req, res) => {
  const { userId } = req.query
  console.log('USER ID: ', userId)

  try {
    const user = await User.findById(userId).populate('tasks')
    res.status(200).json(user.tasks)
    // res.status(200).json(tasks)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

// /api/user/task/:taskId - get Task by taskId
router.get('/task', async (req, res) => {
  const { taskId } = req.query

  try {
    const task = await Task.findById(taskId)
    res.status(200).json(task)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

// /api/user/task/:taskId - DELETE Task by taskId
router.delete('/task', async (req, res) => {
  const {
    taskId: { _id },
  } = req.body

  try {
    await Task.findByIdAndDelete(_id)
    res.status(200).json({ message: 'Task successfully deleted' })
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

// /api/user/task - add new Task
router.post('/task', async (req, res) => {
  const { text, description, alertTime, user } = req.body

  try {
    const task = await Task.create({
      text,
      description,
      alertTime,
      user: user._id,
    })

    await User.findByIdAndUpdate({ _id: user._id }, { $push: { tasks: task } })

    res.status(201).json(task)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

module.exports = router
