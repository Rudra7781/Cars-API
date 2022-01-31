require("dotenv").config();
const express = require("express");
require("express-async-errors");

const notfoundMiddleware = require("./middleware/not-fouund");
const errorHandler = require("./middleware/error_handlers");

//bring auth and cars routes
const authRoutes = require("./routes/auth");
const carRoutes = require("./routes/cars");

//extra security packages
const helmet = require("helmet");
const cors = require("cors");
const xss = require("xss-clean");
const rateLimiter = require("express-rate-limit");

//-
const app = express();
const connectDb = require("./db/connect");

app.use(express.json());
// extra packages
app.set('trust proxy',1);
app.use(
  rateLimiter({
    windowMs: 15*60*1000,//15min
    max:100, //max req u can make in window(15 mins)
  })
  );
app.use(helmet());
app.use(cors());
app.use(xss());
//routes
app.get("/", (req, res) => {
  res.status(200).send("Cars-Api");
});
app.use("/cars-api/v1/auth", authRoutes);
app.use("/cars-api/v1/cars", carRoutes);
//middleware at last
app.use(errorHandler)
app.use(notfoundMiddleware);
const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDb(process.env.MONGO_URI);
    app.listen(port, () => 
      console.log(`Sever listening on port ${port}`)
    );
  } catch (error) {
    console.log("error:", error);
  }
};
start();
