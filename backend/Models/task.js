const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const TaskSchema=Schema({
    title:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
})

const TaskModel = mongoose.model('tasks',TaskSchema);
module.exports =TaskModel;