import express from "express";
import multer from "multer";
import cors from "cors";
import path from "path";
import fs from "fs";

const app = express();
app.use(cors());

// 🔹 absolute uploads folder
const uploadDir = path.join(process.cwd(), "uploads");

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// 🔹 multer config (keep original filename)
const storage = multer.diskStorage({
  destination: uploadDir,
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

// 🔹 serve uploads as static files
app.use("/uploads", express.static(uploadDir));


function normalizeWindowsPath(pathStr) {
  return pathStr.replace(/\\\\/g, "\\");
}


// 🔹 upload route
app.post("/upload", upload.single("video"), (req, res) => {
  console.log("REQ FILE:", req.file);

  const congempath = normalizeWindowsPath(req.file.path);

  if (!req.file) {
    return res.status(400).json({ message: "No video uploaded" });
  }

  const videoUrl = `http://localhost:5000/uploads/${req.file.filename}`;

  res.json({
    success: true,
    message: "Video uploaded",
    congempath, // 🔥 OPEN THIS IN BROWSER
  });
});
console.log(gempath);


app.listen(5000, "0.0.0.0", () => {
  console.log("Server running on port 5000");
});
