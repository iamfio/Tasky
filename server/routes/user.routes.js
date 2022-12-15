const Task = require('../models/Task.model')
const User = require('../models/User.model')

const router = require('express').Router()

router.get('/', async (req, res) => {
  const { userId } = req.query

  try {
    const currentUser = await User.findById(userId)
    res.status(200).json(currentUser)
  } catch (err) {
    res.status(400).json({ message: 'can not get user by id' })
  }
})

// /api/user - UPDATE User
router.put('/', async (req, res) => {
  const { _id: userId, fullName, userpic } = req.body
  const updateUser = { userpic, fullName }

  try {
    const user = await User.findByIdAndUpdate(userId, updateUser)
    res.status(200).json({ message: 'User successfully updated', user })
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

// /api/user/tasks - get all user's tasks
router.get('/tasks', async (req, res) => {
  const { userId } = req.query

  try {
    const user = await User.findById(userId).populate('tasks')
    res.status(200).json(user.tasks)
    // res.status(200).json(tasks)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

// /api/user/task/:taskId - GET Task by taskId
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
  const { taskId, userId } = req.body

  try {
    const user = await User.findOne({ _id: userId })
    user.tasks.splice(taskId, 1)
    user.save()
    await Task.findByIdAndDelete(taskId)

    res.status(200).json({ message: 'Task successfully deleted' })
  } catch (err) {
    res.status(400).json({ message: err })
  }
})

router.put('/task/alarm', async (req, res) => {
  const { taskId, alertTime, userId } = req.body

  try {
  } catch (err) {}
})

// /api/user/task/:taskId - UPDATE Task by taskId
router.put('/task', async (req, res) => {
  const { taskId, text, description, alertTime } = req.body

  try {
    const task = await Task.findOneAndUpdate(
      { _id: taskId },
      {
        text,
        description,
        alertTime,
      }
    )
    res.status(200).json({ message: 'Task successfully updated', task })
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
