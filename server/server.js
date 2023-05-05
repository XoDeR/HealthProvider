const express = require("express");

const app = express();
require("dotenv").config();

app.use(express.json());
const userRoute = require("./routes/userRoute");
app.use("/api/user", userRoute);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started at port ${port}`));
