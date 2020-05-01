const express = require('express');
const app = express();
const bodyParser = require('body-parser')

app.use(bodyParser.json())

require('./routes/user')(app);
require('./routes/resume')(app);

module.exports = app;
