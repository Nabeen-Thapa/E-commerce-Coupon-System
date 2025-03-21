import express from "express";

const app = express();
const port = 5600;
app.listen(port, ()=>{
    console.log(`server is running in ${port}`);
})

