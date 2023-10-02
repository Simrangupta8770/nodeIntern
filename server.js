const express = require("express");
const dotenv = require("dotenv");
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes.js');
const communityRoutes = require('./routes/communityRoutes.js');
const roleRoutes = require('./routes/roleRoutes.js');
const memberRoutes = require('./routes/memberRoutes.js');

const { notFound, errorHandler } = require('./middleware/errorMiddleware');
const Cors = require("cors");
const path = require("path");

const app = express();
app.use(Cors());

dotenv.config();
connectDB();
app.use(express.json());
app.use("/v1/auth", userRoutes);
app.use("/v1", communityRoutes);
app.use("/v1", roleRoutes);
app.use("/v1", memberRoutes);

const __dirname1 = path.resolve();


app.use('*', (req, res) => {
    res.send("api is running");
});


const PORT = process.env.PORT || 5000;

app.use(notFound);
app.use(errorHandler);
const server = app.listen(
    PORT,
    console.log(`Server running on PORT ${PORT}...`)
  );
  