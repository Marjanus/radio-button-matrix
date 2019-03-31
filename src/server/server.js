const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const mongoose = require('mongoose');

const configs = require('./../../configs/configs');
const questionData = require('./../mock-data');

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());

mongoose.connect(configs.mongoDbUrl, { useNewUrlParser: true })
    .then(() => console.log('Database connected successfully'))
    .catch(err => console.log(err));

const storage = multer.diskStorage({
    destination: path.resolve('src/client/public/images/'),
    filename: (req, file, cb) => {
        cb(null, `IMAGE-${file.originalname}`);
    },
});

const imageFilter = (req, file, cb) => {
    if (!file.originalname.match(/\.(png|jpe?g|gif|svg)$/)) {
        return cb(new Error('Only image files are allowed!'), false);
    }

    return cb(null, true);
};

const upload = multer({
    storage,
    // limits: { fileSize: 1000000 },
    fileFilter: imageFilter,
});

app.get('/', (req, res) => {
    res.json(questionData.data);
});

// TODO handle and save form data
app.post('/submit', upload.array('files', 7), (req, res) => {
    if (req.files && req.body) {
        const {
            files,
            body: {
                state,
            },
        } = req;

        const parsedState = JSON.parse(state);

        res.json({
            files,
            state: parsedState,
        });
    } else if (req.body) {
        const data = req.body;

        res.json({
            data,
        });
    }
    else {
        res.status('500').json('Unable to process form data');
    }
})

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});
