import "bootstrap/dist/css/bootstrap.min.css";
import { useContext } from "react";
import { TaskContext } from "../TaskContext";
function TaskItem({title, description, _id}) {
  const { getAllTasks,task,BASE_URL,setShowEdit,setCurrentTask}=useContext(TaskContext);
  const token = localStorage.getItem("auth-token");
  const handledel = async () => {
    const res = await fetch(`${BASE_URL}/task/${_id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    getAllTasks();
  };
  return (
    <div className="note-card">
      <div className="note-title">{title}</div>
      <div className="note-text">{description}</div>

      <div className="note-actions">
        <button className="btn-delete" type="button" onClick={handledel}>
          Delete
        </button>
        <button
          className="btn-edit"
          type="button"
          onClick={() => {
            setCurrentTask(_id);
            setShowEdit(true);
          }}>
          Edit
        </button>
      </div>
    </div>
  );
}
export default TaskItem;
