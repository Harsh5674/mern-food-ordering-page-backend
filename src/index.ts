import express,{Request,Response} from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import myUserRoute from "./routes/MyUserRoute"
import { v2 as cloudinary } from "cloudinary";
import myRestaurantRoute from "./routes/MyRestaurantRoute";
import restaurantRoute from "./routes/RestaurantRoute";
import orderRoute from "./routes/OrderRoutes";

mongoose.connect(process.env.MONGODB_CONNECTION_STRING as string)
.then(() => {
  console.log("Connected to Database!");
})
.catch(() => {
 console.log("Connection to Database failed!");
});

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });

const app = express();
const port = 7000;

app.use(cors());
app.use("api/order/checkout/webhook", express.raw({ type: "*/*" }));
app.use(express.json());
//app.use(express.static(path.join(__dirname, "../../frontend/dist")));

app.get("/health", async(req:Request, res:Response) => {
      res.json({message: "Health OK!"});
});

app.use("/api/my/user", myUserRoute);
app.use("/api/my/restaurant", myRestaurantRoute);
app.use("/api/restaurant", restaurantRoute);
app.use("/api/order",orderRoute);

app.listen(port, () => {
    console.log(`Server started on localhost:${port}`)
});
// start again