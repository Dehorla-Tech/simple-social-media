import express  from "express"; 

const app = express();

app.use(express.json());

const PORT = process.env.PORT || 3000;

app.listen(PORT, function () {
    console.log("this sever is running on port: ", PORT )});

app.get("/status", (req, res) => {
     const status = {
        "status": "Running"
     };
     res.send(status);
});
