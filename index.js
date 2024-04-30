import express from "express";
import 'dotenv/config';


const app=express();
const port=process.env.PORT;


app.get('/', (req, res)=>{
    res.status(200).send(" Welcome to KOINX BACKEND server ! ");
})

app.listen(port,()=>{
    console.log(`Server is running on PORT ${port}`);
})