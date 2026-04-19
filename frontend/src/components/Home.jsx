import ListGroup from "./ListGroup";
import NavBar from "./Navbar.jsx";
import AddNotes from "./addNote.jsx";
import EditModal from "./EditModal";
import { useContext ,useEffect} from "react";
import { TaskContext } from "../TaskContext";
function Home() {
  const { getAllTasks } = useContext(TaskContext);
  console.log(getAllTasks);
  useEffect(() => {
    getAllTasks();
  }, []);
  return (
    <div className="app-layout">
      <NavBar/>
      <AddNotes/>
      <ListGroup/>
      <EditModal/>
    </div>
  );
}
export default Home;
