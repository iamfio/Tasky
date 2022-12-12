import { Link } from 'react-router-dom'

export default function TaskListItem({
  _id,
  text,
  description,
  alertTime,
  isSingle,
}) {
  const alertFormat = new Date(alertTime).toLocaleString('de-DE', {
    timeZone: 'UTC',
  })

  return (
    <li className="py-2 px-3 my-4 border rounded-lg shadow-sm hover:shadow-lg shadow-primary hover:shadow-primary flex">
      <div className="flex">
        <div className="flex-col">
          <h3 className="mb-1 text-lg text-primary font-bold capitalize">
            {text}
          </h3>
          {isSingle && <p className="text-sm">{description}</p>}
          <div className="pt-2">
            <code className="text-xs text-gray-400">{alertFormat}</code>
          </div>
          <div className="flex-row ">
            {!isSingle && (
              <Link to={`/tasks/${_id}`}>
                <button className="btn  btn-xs">more...</button>
              </Link>
            )}
            {isSingle && (
              <div className='action-buttons'>

              </div>
            )}
          </div>
        </div>
      </div>
    </li>
  )
}
