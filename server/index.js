const dotenv = require("dotenv");
const express = require("express");
const mongoose = require("mongoose"); 
const cors = require("cors");
const morgan = require('morgan')
const app = express();

dotenv.config();
app.use(express.json());
app.use(cors());
app.use(morgan("common"));
/* ROUTES */
app.get("/test",(req,res)=>{
    res.status(200).json({title:"example"})
} );



app.use("/auth", require('./routes/authRoute'));

const PORT = process.env.PORT || 3001;

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));
  })
  .catch((error) => console.log(`${error} did not connect`));



