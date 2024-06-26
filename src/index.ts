import express,{Request,Response} from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import myUserRoute from "./routes/MyUserRoute"
//import path from "path";

mongoose.connect(process.env.MONGODB_CONNECTION_STRING as string)
.then(() => {
  console.log("Connected to Database!");
})
.catch(() => {
 console.log("Connection to Database failed!");
});

const app = express();
const port = 7000;
app.use(express.json());
app.use(cors());

//app.use(express.static(path.join(__dirname, "../../frontend/dist")));

app.get("/health", async(req:Request, res:Response) => {
      res.json({message: "Health OK!"});
});

app.use("/api/my/user", myUserRoute);

app.listen(port, () => {
    console.log(`Server started on localhost:${port}`)
});
// start again