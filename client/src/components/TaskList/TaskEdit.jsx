import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../context/auth.context'
import InnerLayout from '../Layout/InnerLayout'
import TaskForm from './TaskForm'

export default function TaskEdit() {
  const navigate = useNavigate()
  const { user } = useContext(AuthContext)

  const [text, setText] = useState('')
  const [description, setDescription] = useState('')
  const [alertTime, setAlertTime] = useState('')

  const handleSubmit = (e) => {}
  return (
    <InnerLayout>
      <TaskForm
      text={text}
      setText={setText}
      description={description}
      setDescription={setDescription}
      alertTime={alertTime}
      setAlertTime={setAlertTime}
      handleSubmit={handleSubmit}
    />
    </InnerLayout>
  )
}
