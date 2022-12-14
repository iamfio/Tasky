import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

import { confirmAlert } from 'react-confirm-alert'
import 'react-confirm-alert/src/react-confirm-alert.css'
import TaskForm from './TaskForm'
import apiService from '../../services/api.services'

dayjs.extend(relativeTime)

export default function TaskListItem({
  _id,
  text,
  description,
  alertTime,
  isSingle,
}) {
  const navigate = useNavigate()
  const [edit, setEdit] = useState(false)

  const handleDelete = async () => {
    await apiService.deleteTask({ _id })
    return navigate('/tasks/list')
  }

  const handleClickDelete = () => {
    confirmAlert({
      customUI: ({ onClose }) => (
        <ConfirmDialog onClose={onClose} handleDelete={handleDelete} />
      ),
    })
  }

  // Formatted alertTime string
  const timeIn = dayjs(alertTime).fromNow()

  return (
    // {isSingle &&()}
    <li className="py-2 px-3 my-4 border rounded-lg shadow-sm hover:shadow-lg shadow-primary-content hover:shadow-primary-content">
      <div className="flex">
        <div className="flex-col">
          <h3 className="mb-1 text-lg text-primary font-bold capitalize">
            {text}
          </h3>
          {isSingle && <p className="text-sm">{description}</p>}
          <div className="pt-2">
            <code className="text-xs text-gray-400">{timeIn}</code>
          </div>
          <div className="flex-row ">
            {!isSingle && (
              <Link to={`/tasks/${_id}`}>
                <button className="btn btn-xs">more...</button>
              </Link>
            )}
            {isSingle && (
              <div className="action-buttons">
                <button
                  onClick={() => setEdit((current) => !current)}
                  className="btn btn-xs btn-outline my-2 mr-2"
                >
                  Edit
                </button>

                <button
                  onClick={handleClickDelete}
                  className="btn btn-xs btn-outline btn-warning my-2"
                >
                  Delete
                </button>

                {edit && <TaskForm taskId={_id} />}
              </div>
            )}
          </div>
        </div>
      </div>
    </li>
  )
}

const ConfirmDialog = ({ onClose, handleDelete }) => (
  <div className="py-2 px-3 my-4 border rounded-lg shadow-sm hover:shadow-lg shadow-primary-content hover:shadow-primary-content text-center">
    <h1 className="text-xl text-primary">Are you sure?</h1>
    <p className="py-2">You want to delete this task?</p>
    <div className="text-center">
      <button onClick={onClose} className="btn btn-info p-2 mr-2">
        No
      </button>
      <button
        onClick={() => {
          handleDelete()
          onClose()
        }}
        className="btn btn-warning p-2"
      >
        Yes
      </button>
    </div>
  </div>
)
