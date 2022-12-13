import { useContext } from 'react'
import { TasksContext } from '../../context/tasks.context'
import { EmptyTaskListAlert } from '../Alert/EmptyListAlert'
import TaskListItem from './TaskListItem'

export default function TaskList() {
  const { tasks } = useContext(TasksContext)

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


