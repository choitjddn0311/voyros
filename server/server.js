import express from "express";
import cors from "cors";

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

app.get('/testApi' , (req,res) => {
    res.json({message: "hello world! here is backend!"});
});

app.listen(port , () => {
    console.log(`the server is running on ${port} port`)
});