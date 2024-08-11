import "dotenv/config";
//  dotenv.config();

import express  from "express"; 
import {router} from "./Routes/auth.js";
import {connectDB} from "./config/db.js"


//  // connect DB
   connectDB();


const app = express();

app.use(express.json());

app.use("/api/auth", router)


const PORT = process.env.PORT || 3000;

app.listen(PORT, function () {
    console.log("this sever is running on port: ", PORT )});

app.get("/SSM", (req, res) => {
     const status = {
        "status": "Welcome to SSM"
     };
     res.send(status);
});
