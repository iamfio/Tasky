import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import apiService from '../../services/api.services'
import InnerLayout from '../Layout/InnerLayout'
import TaskListItem from './TaskListItem'

export default function TaskSingle() {
  const [task, setTask] = useState(null)
  const { taskId } = useParams()

  console.log(taskId)

  useEffect(() => {
    const getTaskById = async (id) => {
      try {
        const data = await apiService.getTaskById(id)
        console.log(data)
        setTask(data.data)
      } catch (err) {
        console.warn(err.message)
      }
    }
    getTaskById(taskId)
  }, [])
  
  return (
    <InnerLayout>
      <TaskListItem {...task} isSingle />
    </InnerLayout>
  )
}
