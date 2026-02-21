const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const profileRoutes = require("./routes/profile");
// const postsRoutes = require("./routes/post");
// const testRoutes = require("./routes/test");
// const mailRoutes = require("./routes/mail");
// const userRoutes = require("./routes/user");
// const commentsRoutes = require("./routes/comments");
// const weatherRoutes = require("./routes/weather");
// const replyRoutes = require("./routes/reply");
// const videoRoutes = require("./routes/video");
// const disabilityRoutes = require("./routes/disability");
// const likeRoutes = require("./routes/like");
// const dislikeRoutes = require("./routes/dislike");
// const friendRoutes = require("./routes/friend");
// const repliesAmtRoutes = require("./routes/replies_amt");
// const mediaRoutes = require("./routes/media");
// const profilepicRoutes = require("./routes/profilepic");



const app = express();

mongoose
.connect(
  "mongodb+srv://jermain:" + 
  process.env.MONGO_ATLAS_PW +
   "@cluster0.q16uh.mongodb.net/handimatched?retryWrites=true&w=majority")
  .then(() => {
    console.log("Connected to database!");
  })
  .catch(() => {
    console.log("Connection failed!");
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/images", express.static(path.join("images")));
app.use("/videos", express.static(path.join("videos")));
app.use("/", express.static(path.join("angular")));
// app.use(cors());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});

app.use("/api/profile", profileRoutes);
// app.use("/api/posts", postsRoutes);
// app.use("/api/test", testRoutes);
// app.use("/api/media", mediaRoutes);
// app.use("/api/mail", mailRoutes);
// app.use("/api/user", userRoutes);
// app.use("/api/comments", commentsRoutes);
// app.use("/api/reply", replyRoutes);
// app.use("/api/video", videoRoutes);
// app.use("/api/disability", disabilityRoutes);
// app.use("/api/like", likeRoutes);
// app.use("/api/dislike", dislikeRoutes);
// app.use("/api/friend", friendRoutes);
// app.use("/api/replies", repliesAmtRoutes);
// app.use("/api/profilepic", profilepicRoutes);
// app.use("/api/weather", weatherRoutes);
// app.use((req, res, next) => {
//   res.sendFile(path.join(__dirname, "angular", "index.html"));
// });

module.exports = app;
