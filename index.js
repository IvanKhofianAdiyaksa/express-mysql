const express = require ('express');
const app = express();
app.use('/assets', express.static('assets'));

const cors = require('cors');
app.use(cors());

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const fileUpload = require('express-fileupload');
app.use(fileUpload());

const routes = require('./routes');
app.use('/', routes)

app.listen(3004);