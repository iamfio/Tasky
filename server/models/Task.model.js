const { Schema, model } = require('mongoose')

const taskSchema = new Schema(
  {
    text: {
      type: String,
      required: [true, 'Task Text is required'],
      trim: true,
    },
    description: {
      type: String,
    },
    alertTime: {
      type: Date,
    },
    user: { type: Schema.Types.ObjectId, ref: 'User' },
  },
  {
    timestamps: true,
  }
)

module.exports = model('Task', taskSchema)
