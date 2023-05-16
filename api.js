require('dotenv').config();
const express = require("express")
const app = express();
const port = process.env.PORT || 3000;
const sticky = require('sticky-session');

// Enable sticky sessions
if (!sticky.listen(server)) {
  // Master process
  server.once('listening', () => {
    console.log('Master server started on port', server.address().port);
  });
} else {
  // Worker process
  console.log('Worker server started on port', server.address().port);
}


//npm i cookie-parser
const cookieParser = require("cookie-parser");
app.use(express.static('public/build'))

const userRouter = require("./routes/userRoutes");

app.use(express.json());
app.use(cookieParser());
app.use("/api/v1/user", userRouter);
app.use((req, res, next) => {
    res.status(404).json({ message: 'Endpoint not found' });
});
app.use((err, req, res, next) => {
    console.error(err); 
    // Log the error for debugging purposes
    res.status(500).json({ message: 'Internal Server Error' });
});

app.listen(port, function () {
    console.log("server started at " + port);
})