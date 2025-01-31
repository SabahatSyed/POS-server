const express = require("express");
const cors = require("cors");
const logger = require("morgan");
const axios = require('axios');
const FormData = require('form-data');
const multer = require('multer');
const upload = multer();

require("dotenv").config();
require("express-async-errors");
// const multer = require("multer");
require("./models/index.js");
const { fallBack, errorHandler } = require("./middlewares/error.middleware");
const router = require("./routes/index.js");
const { responseHandler } = require("./middlewares/response.middleware.js");
// const engines = require("consolidate");
const app = express();

/**Start Using Middlewares */
/**Parse requests of content-type: application/json*/
app.use(express.json({ extended: true, limit: "50mb" }));
/**Parse requests of content-type: application/x-www-form-urlencoded*/
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
/**Allow cross origin access*/
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);
/**Node Request Logger */
app.use(logger("dev"));
/**End Using Middlewares */

app.use(responseHandler);
/**Main application router*/
app.use(router);


// Example using Express


app.post('/upload-image', upload.single('file'), async (req, res) => {
  const formData = new FormData();
  formData.append('file', req.file.buffer, req.file.originalname);
  formData.append('upload_preset', 'preset1'); // Cloudinary upload preset

  try {
    const response = await axios.post(
      `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/image/upload`,
      formData,
      {
        headers: formData.getHeaders(),
      }
    );
    res.json({ imageUrl: response.data.secure_url }); // Send URL back to client
  } catch (error) {
    res.status(500).json({ error: 'Failed to upload image' });
  }
});



// For static assets
app.use("/public", express.static(__dirname + "/public"));

//For EJS views
// app.engine("ejs", engines.ejs);
// app.set("views", "./public/views");
// app.set("view engine", "ejs");

/**If Route Not Exits Then Show Message */
app.use(fallBack);
/**For Catching and Handling Default Errors */
app.use(errorHandler);

module.exports = app;
