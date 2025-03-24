import express from "express";
import productRoutes from "./routers/product.routes";

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.use("/api",productRoutes);


const port = 4400;
app.listen(port, ()=>{
    console.log(`server is running in ${port}`);
})

