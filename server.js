const express = require('express');
const path = require('path');
const fs = require('fs');
// Helper method for generating unique ids
// const uuid = require('./helpers/uuid');

const htmlRoutes = require('./Routes/html');
const apiRoutes = require('./Routes/api');
const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

app.use(htmlRoutes);
app.use(apiRoutes);


app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);