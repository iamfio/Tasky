import { useContext, useEffect } from 'react'
import { createContext, useState } from 'react'
import apiService from '../services/api.services'
import { AuthContext } from './auth.context'

const TasksContext = createContext()

function TasksProvider({ children }) {
  const { user } = useContext(AuthContext)
  
  const [tasks, setTasks] = useState([])
  const [task, setTask] = useState(null)

  useEffect(() => {
    console.log('getTasks HIT')
    const getTasks = async () => {
      try {
        const { data } = await apiService.getTasks(user?._id)
        setTasks(data)
      } catch (err) {
        console.warn(err.message)
      }
    }

    getTasks()
  }, [user])

  return (
    <TasksContext.Provider
      value={{
        task,
        setTask,
        tasks,
        setTasks,
      }}
    >
      {children}
    </TasksContext.Provider>
  )
}

export { TasksProvider, TasksContext }
