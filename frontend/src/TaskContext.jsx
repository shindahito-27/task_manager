import {createContext, useState} from "react";

export const TaskContext = createContext();

export const TaskProvider = ({children}) => {
  const [tasks, settasks] = useState([]);
  const [showEdit, setShowEdit] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);
  const getAllTasks = async () => {
    const token = localStorage.getItem("auth-token");
    // console.log(token);
    const response = await fetch("http://localhost:8080/task/", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    console.log(data);
    if (data.success) { 
      await settasks(data.task);
      console.log(data.task);
    } else {
      console.log("Could not fetch the tasks");
    }
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        settasks,
        showEdit,
        setShowEdit,
        currentTask,
        setCurrentTask,
        getAllTasks,
      }}>
      {children}
    </TaskContext.Provider>
  );
};
