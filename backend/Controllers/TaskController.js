const TaskModel = require('../Models/task');
const add=async (req,res)=>{
    try{
        const {title,description} = req.body;
        const task=new TaskModel({title,description,userId:req.user._id});
        await task.save();
        res.json({success:true,task});
    }catch(err){
        res.status(500)
            .json({
                message:"Internal Server Error",
                success:false,
            })
    }
} 

const get = async (req, res) => {
    const task = await TaskModel.find({ userId: req.user._id });
    res.json({ success: true, task });
};



const del = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedTask = await TaskModel.findOneAndDelete({
            _id: id,
            userId: req.user._id //  ownership check
        });

        if (!deletedTask) {
            return res.status(404).json({
                success: false,
                message: "Task not found or unauthorized"
            });
        }

        res.json({
            success: true,
            message: "Task deleted successfully"
        });

    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Error deleting note"
        });
    }
};



const edit = async (req, res) => {
    try {
        const { id } = req.params; // note id from URL
        const { title, description } = req.body;

        const updatedTask = await TaskModel.findOneAndUpdate(
            {
                _id: id,
                userId: req.user._id // ensures only owner can update
            },
            {
                title,
                description
            },
            {
                new: true // return updated doc
            }
        );

        if (!updatedTask) {
            return res.status(404).json({
                success: false,
                message: "Task not found or unauthorized"
            });
        }

        res.json({
            success: true,
            task: updatedTask
        });

    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Error updating note"
        });
    }
};


module.exports ={
    add,
    del,
    edit,
    get,
}