const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const configs = require('./../../configs/configs');
const routes = require('./routes');

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use('/', routes);
app.use('/uploads', express.static('uploads'));

mongoose.connect(configs.mongoDbUrl, { useNewUrlParser: true })
    .then(() => console.log('Database connected successfully'))
    .catch(err => console.log(err));

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});
