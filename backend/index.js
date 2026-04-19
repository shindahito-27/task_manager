const express =require('express');
const app=express();
const bodyParser=require('body-parser');
const cors=require('cors');
const AuthRouter=require('./Routes/AuthRouter');
const TaskRouter=require('./Routes/TaskRouter');


require('dotenv').config();
require("./Models/db");


const PORT =process.env.PORT || 8080;


// parsing and cors(to allow frontend to access other port ) middleware
app.use(bodyParser.json());
app.use(cors())

// routes
app.use('/auth',AuthRouter);
app.use('/task',TaskRouter);


//server starting 
app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`);
})