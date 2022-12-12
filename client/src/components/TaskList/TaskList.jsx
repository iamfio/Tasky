import { useState } from 'react'
import { useContext, useEffect } from 'react'
import { AuthContext } from '../../context/auth.context'
import apiService from '../../services/api.services'
import TaskListItem from './TaskListItem'

export default function TaskList() {
  const { user } = useContext(AuthContext)
  const [tasks, setTasks] = useState([])

  useEffect(() => {
    const getTasks = async () => {
      try {
        const userId = user._id
        const { data } = await apiService.getTasks(userId)
        setTasks(data)
      } catch (err) {
        console.warn(err.message)
      }
    }

    getTasks()
  }, [])

  return (
    <>
      {!tasks && <EmptyTaskListAlert />}

      <ul className="my-4 border rounded-lg p-2 border-primary-content">
        {tasks?.map((task) => (
          <TaskListItem key={task._id} {...task} />
        ))}
      </ul>
    </>
  )
}

const EmptyTaskListAlert = () => (
  <div className="alert shadow-lg">
    <div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        className="stroke-info flex-shrink-0 w-6 h-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        ></path>
      </svg>
      <span>No tasks yet. Maybe add one now?</span>
    </div>
  </div>
)
