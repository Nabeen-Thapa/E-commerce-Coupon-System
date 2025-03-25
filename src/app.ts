import express from "express";
import couponRoutes from "./routers/coupon.routes";
import dotenv from "dotenv";
dotenv.config();

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.use("/api",couponRoutes);


const port =process.env.PORT || 3400;
app.listen(port, ()=>{
    console.log(`server is running in ${port}`);
})

