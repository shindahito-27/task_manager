import {useState} from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useContext } from "react";
import { TaskContext } from "../TaskContext";
function AddNotes() {
  const {tasks,settasks,getAllTasks,BASE_URL}=useContext(TaskContext);
  const handleadd = async () => {
    const token = localStorage.getItem("auth-token");
    const t = document.getElementById("task-title").value;
    const d = document.getElementById("task-body").value;
    const res = await fetch(`${BASE_URL}/task/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        title: t,
        description: d,
      }),
    });
    await getAllTasks();
  };
  return (
    <section className="panel-card">
      <h2>Create a new note</h2>
      <p>
        Capture ideas, reminders, and quick todos in one cheerful workspace.
      </p>
      <div className="form-group">
        <label htmlFor="note-title">Title</label>
        <br />
        <input id="task-title" placeholder="Enter your note title" />
      </div>

      <div className="form-group">
        <label htmlFor="note-body">Note</label>
        <br />
        <textarea
          id="task-body"
          placeholder="Write something worth remembering..."
        />
      </div>

      <button className="btn-primary-solid" type="button" onClick={handleadd}>
        Add Note
      </button>
    </section>
  );
}
export default AddNotes;
