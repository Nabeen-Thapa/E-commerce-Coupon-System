import express from "express";
import productRoutes from "./routers/product.routes";

const app = express();


app.use("/api",productRoutes);
const port = 5600;
app.listen(port, ()=>{
    console.log(`server is running in ${port}`);
})

