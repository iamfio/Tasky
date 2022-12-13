import { useContext } from 'react'
import { TasksContext } from '../../context/tasks.context'

export default function TaskForm({ handleSubmit, isEdit }) {
  const { task, setTask } = useContext(TasksContext)

  const handleChange = (e) => {
    const { name, value } = e.target

    setTask((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-control py-4">
        <input
          type="text"
          name="text"
          placeholder="Task"
          className="input input-bordered w-full my-2"
          value={'' || (isEdit && task?.text)}
          onChange={handleChange}
        />

        <textarea
          name="description"
          placeholder="Description"
          className="textarea textarea-bordered w-full my-2"
          value={ '' || (isEdit && task?.description)}
          onChange={handleChange}
        />

        <input
          name="alertTime"
          type="datetime-local"
          className="input-bordered my-2"
          value={ '' || (isEdit && task?.alertTime)}
          onChange={handleChange}
        />

        <button type="submit" className="btn  btn-primary my-2">
          {isEdit ? 'Update' : 'Add'}
        </button>
      </div>
    </form>
  )
}
