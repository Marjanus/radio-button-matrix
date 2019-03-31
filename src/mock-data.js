const uuidv4 = require('uuid/v4');

const data = {
    questionTitle: 'Title of the question',
    columns: [
        { id: uuidv4(), title: 'first column', image: null },
        { id: uuidv4(), title: 'second column', image: null },
        { id: uuidv4(), title: 'third column', image: null },
        { id: uuidv4(), title: 'fourth column', image: null },
        { id: uuidv4(), title: 'fifth column', image: null },
    ],
    rows: [
        { id: uuidv4(), title: 'first row', image: null },
        { id: uuidv4(), title: 'second row', image: null },
        { id: uuidv4(), title: 'third row', image: null },
        { id: uuidv4(), title: 'fourth row', image: null },
        { id: uuidv4(), title: 'fifth row', image: null },
    ],
    takenValues: [],
    selectedImages: [],
};

module.exports = {
    data,
};
