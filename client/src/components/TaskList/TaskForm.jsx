import dayjs from "dayjs";

export default function TaskForm({
  _id,
  text,
  description,
  alertTime,
  setText,
  setDescription,
  setAlertTime,
  handleSubmit,
  isEdit
}) {
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
          // value={new Date("yyyy-MM-ddThh:mm").toString()}
          onChange={(e) => setAlertTime(e.target.value)}
        />

        <button type="submit" className="btn  btn-primary my-2">
          {isEdit ? 'Update' : 'Add'}
        </button>
      </div>
    </form>
  )
}
