const { Schema, model } = require('mongoose')
const Task = require('./Task.model')

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, 'Username is required'],
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required.'],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, 'Password is required.'],
    },
    name: {
      type: String,
    },
    userpic: {
      type: String,
      default: 'http://placekitten.com/300/300',
    },
    tasks: [{ type: Schema.Types.ObjectId, ref: 'Task' }],
  },
  {
    timestamps: true,
  }
)

const User = model('User', userSchema)

module.exports = User
