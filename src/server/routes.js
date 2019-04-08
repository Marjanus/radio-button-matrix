const express = require('express');

const Form = require('./models');
const upload = require('./multer-config');
const formData = require('./../constants');

const router = express.Router();

const emptyForm = {
    questionTitle: formData.emptyForm.questionTitle,
    columns: formData.emptyForm.columns,
    rows: formData.emptyForm.rows,
    takenValues: formData.emptyForm.takenValues,
};

const setResponseFormData = data => ({
    questionTitle: data.questionTitle,
    columns: data.columns,
    rows: data.rows,
    takenValues: data.takenValues,
});

const saveUpdatedForm = state => (
    Form.updateOne({ _id: formData.formId }, {
        $set: {
            questionTitle: state.questionTitle,
            columns: state.columns,
            rows: state.rows,
            takenValues: state.takenValues,
        },
    })
);

/*
    Presumebly this app is a single form edit page, form ID should dynamicaly come from URL,
    however, for a DEMO without routing, ID currently is hardcoded
*/

router.get('/', (req, res) => {
    Form.findById(formData.formId)
        .exec()
        .then((data) => {
            if (data) {
                res.status(200).json(setResponseFormData(data));
            } else {
                res.status(404).json({ error: 'No valid form was found' });
            }
        })
        .catch(() => {
            res.status(500).json({ error: 'Unable to load form' });
        });
});

router.put('/upload-image', upload.single('files'), (req, res) => {
    if (req.file && req.body) {
        const {
            file: {
                filename,
            },
            body: {
                state,
                type,
                id,
            },
        } = req;

        const parsedState = JSON.parse(state);
        const updatedField = parsedState[type].find(field => field.id === id);
        updatedField.image = `http://localhost:4000/uploads/${filename}`;


        saveUpdatedForm(parsedState)
            .then(() => {
                res.status(200).json(setResponseFormData(parsedState));
            })
            .catch(() => {
                res.status(500).json({ error: 'Unable to save form to database' });
            });
    } else if (!req.file && req.body) {
        const {
            body: {
                state,
            },
        } = req;

        const parsedState = JSON.parse(state);

        res.status(200).json(setResponseFormData(parsedState));
    } else {
        res.status(500).json({ error: 'Invalid file upload' });
    }
});

router.put('/submit', upload.none(), (req, res) => {
    if (req.body) {
        const {
            body: {
                state,
            },
        } = req;
        const parsedState = JSON.parse(state);

        saveUpdatedForm(parsedState)
            .then(() => {
                res.status(200).json(setResponseFormData(parsedState));
            })
            .catch(() => {
                res.status(500).json({ error: 'Unable to save form to database' });
            });
    } else {
        res.status(500).json({ error: 'Invalid form data' });
    }
});

router.put('/reset', (req, res) => {
    Form.updateOne({ _id: formData.formId }, {
        $set: emptyForm,
    })
        .then(() => {
            res.status(200).json(emptyForm);
        })
        .catch(() => {
            res.status(500).json({ error: 'Unable to save form to database' });
        });
});

module.exports = router;
