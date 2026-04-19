import {useState} from "react";
import TaskItem from "./TaskItem.jsx";
import { useContext } from "react";
import { TaskContext } from "../TaskContext";
function ListGroup() {
    const {tasks, getAllTasks}=useContext(TaskContext);
  return (
    <section className="panel-card notes-container">
      <h2>Your colorful board</h2>
      <p className="panel-copy">
        A softer, brighter layout makes each task easier to scan at a glance.
      </p>
      <ul className="notes-grid">
        {tasks.map((item) => (
          <li>
            <TaskItem
              title={item.title}
              description={item.description}
              _id={item._id}
            />
          </li>
        ))}
      </ul>
    </section>
  );
}
export default ListGroup;
