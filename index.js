const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const routes = require('./routes/routes');

const PORT = process.env.PORT || 3500;

const app = express();
app.use(bodyParser.json());
routes(app);

app.listen(PORT, () => {
  console.log(`Listening on Port ${PORT}`);
});

module.exports = app;
