import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../context/auth.context'
import apiService from '../../services/api.services'
import TaskForm from './TaskForm'

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
    <TaskForm
      text={text}
      setText={setText}
      description={description}
      setDescription={setDescription}
      alertTime={alertTime}
      setAlertTime={setAlertTime}
      handleSubmit={handleSubmit}
    />
  )
}

