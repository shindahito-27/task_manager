import { useContext, useState, useEffect } from "react";
import { TaskContext } from "../TaskContext";
function EditModal() {
    const { tasks,getAllTasks,showEdit, setShowEdit, setCurrentTask,currentTask, settasks } = useContext(TaskContext);
    let task = tasks.find(t => t._id === currentTask);
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    
    //  Load selected task into inputs
    useEffect(() => {
        if (currentTask) {
            task = tasks.find(t => t._id === currentTask);
            setTitle(task.title);
            setDesc(task.description);
        }
    }, [currentTask,tasks]);

    if (!showEdit) return null; //  hide modal

    const handleUpdate = async () => {
        const token = localStorage.getItem("auth-token");

        const res = await fetch(`http://localhost:8080/task/${currentTask}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({
                title,
                description: desc
            })
        });

        const data = await res.json();

        if (data.success) {
            //  update UI instantly (NO refetch)
            console.log("succesful update");
            settasks(prev =>
                prev.map(t =>
                    t._id === currentTask ? data.task : t
                )
            );
            setCurrentTask(null);

            setShowEdit(false); // close modal
            await getAllTasks()
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal-box">
                <h3>Edit Task</h3>
                <br />
                <input 
                    value={title} 
                    onChange={(e) => setTitle(e.target.value)} 
                />

                <textarea 
                    value={desc} 
                    onChange={(e) => setDesc(e.target.value)} 
                />
                <br />
                <button type="button" onClick={handleUpdate}>Save</button>
                <button onClick={() => setShowEdit(false)}>Cancel</button>
            </div>
        </div>
    );
}

export default EditModal;