import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../context/auth.context'
import apiService from '../../services/api.services'

export default function TaskNew() {
  const navigate = useNavigate()
  const { user } = useContext(AuthContext)

  const [text, setText] = useState('')
  const [description, setDescription] = useState('')
  const [alertTime, setAlertTime] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const { data } = await apiService.addTask({
        text,
        description,
        alertTime,
        user,
      })
      console.log(data)
      return navigate('/tasks')
    } catch (err) {
      console.warn(err.message)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-control py-4">
        <input
          type="text"
          name="text"
          placeholder="Task"
          className="input input-bordered w-full my-2"
          value={text || ''}
          onChange={(e) => setText(e.target.value)}
        />

        <textarea
          name="description"
          placeholder="Description"
          className="textarea textarea-bordered w-full my-2"
          value={description || ''}
          onChange={(e) => setDescription(e.target.value)}
        />

        <input
          name="alertTime"
          type="datetime-local"
          className="input-bordered my-2"
          value={alertTime || ''}
          onChange={(e) => setAlertTime(e.target.value)}
        />

        <button type="submit" className="btn  btn-primary my-2">
          Add
        </button>
      </div>
    </form>
  )
}
