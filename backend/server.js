import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import userRouter from "./routers/userRouters.js";
import productRouter from "./routers/productRouter.js";
import orderRouter from "./routers/orderRouter.js";


 

dotenv.config();

const app = express();
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
mongoose.connect(process.env.MONGODB_URL || "mongodb://localhost/shoper", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});
// app.get("/api/products", (req, res) => {
//   res.send(data.products);
// });

// app.get("/api/products/:id", (req, res) => {
//   const product = data.products.find((x) => x._id === req.params.id);
//   console.log(product);
//   if (product) {
//     res.send(product);
//   } else {
//     res.status(404).sent({ message: "Product Not Found" });
//   }
// });

app.use("/api/users", userRouter);
app.use("/api/products", productRouter);
app.use("/api/orders", orderRouter);
app.get("/api/config/paypal", (req, res) => {
  res.send(process.env.PAYPAL_CLIENT_ID || "sb");
});
app.get("/", (req, res) => {
  res.send("Server is Ready");
});

app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
