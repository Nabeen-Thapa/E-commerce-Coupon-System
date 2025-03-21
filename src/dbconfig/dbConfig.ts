import { DataSource } from "typeorm";
import dotenv from "dotenv";
dotenv.config();
export const smartConnection = new DataSource({
    type:"postgres",
    host : process.env.HOST ||"localhost",
    port: 5432,
    username :"postgres",
    password : process.env.password ||"Nt@post",
    database : process.env.database,
    synchronize: true,
    logging: false,
    entities : [],
})


smartConnection.initialize()
  .then(() => {
    console.log("Database connected successfully!");
  })
  .catch((error) => {
    console.log("Error during Data Source initialization:", error);
  });

