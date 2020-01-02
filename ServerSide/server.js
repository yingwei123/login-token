const express = require('express');
const app = express();


require('./routes/user')(app);

module.exports = app;
