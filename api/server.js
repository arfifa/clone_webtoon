require('express-group-routes');
require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 3004;


const AuthRoute = require("./routes/AuthRoute");
const UserRoute = require("./routes/UserRoute");

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: false
  })
)

app.group('/api/v1', (routing) => {
  routing.use('/auth', AuthRoute)
  routing.use('/user', UserRoute)
})

app.listen(port, () => console.log(`Server is running on port ${port}!`))