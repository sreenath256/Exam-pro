const dotenv = require("dotenv");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");
const multer = require("multer");
const path = require("path");

const { createExamWithFile } = require("./controllers/examController");

const authMiddleware = require("./middleware/authMiddleware");
const app = express();

dotenv.config();

app.use(express.json());
app.use(cors());
app.use(morgan("common"));
app.use("/assets", express.static(path.join(__dirname, "public/assets")));

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/assets");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

app.post("/exam/create-exam-with-file", authMiddleware, upload.single("file"), createExamWithFile);

// Test route
app.get("/test", (req, res) => {
  res.status(200).json({ title: "example" });
});

// Import routes
app.use("/auth", require("./routes/authRoute"));
app.use("/user", authMiddleware, require("./routes/userRoute"));
app.use("/subject", authMiddleware, require("./routes/subjectRoute"));
app.use("/classes", authMiddleware, require("./routes/classRoute"));
app.use("/exam", authMiddleware, require("./routes/examRoute"));

const PORT = process.env.PORT || 3001;

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
  })
  .catch((error) => console.log(`${error} did not connect`));
