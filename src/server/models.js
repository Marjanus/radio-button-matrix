const mongoose = require('mongoose');

const formSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    questionTitle: { type: String, required: true },
    columns: [{
        id: { type: String, required: true },
        title: { type: String, required: true },
        image: String,
    }],
    rows: [{
        id: { type: String, required: true },
        title: { type: String, required: true },
        image: String,
    }],
    takenValues: [{
        rowId: { type: String, required: true },
        columnId: { type: String, required: true },
    }],
});

module.exports = mongoose.model('Form', formSchema);
