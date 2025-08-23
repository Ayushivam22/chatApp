import express, { Request, Response } from "express"
import router from "./routes/auth.route";
import dotenv from "dotenv";
import connectDB from "./lib/db"
import cookieParse from "cookie-parser"

dotenv.config();

const app = express();

const PORT = process.env.PORT;

app.use(express.json());
app.use(cookieParse());

app.get('/', (req: Request, res: Response) => {
    res.send("Hello world");
})
app.use('/auth', router)

app.listen(PORT, () => {
    console.log("Listening to port :", PORT);
    connectDB();
})