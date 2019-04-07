const uuidv4 = require('uuid/v4');

const emptyForm = {
    questionTitle: 'Title of the question',
    columns: [
        { id: uuidv4(), title: 'col 1', image: null },
        { id: uuidv4(), title: 'col 2', image: null },
        { id: uuidv4(), title: 'col 3', image: null },
        { id: uuidv4(), title: 'col 4', image: null },
        { id: uuidv4(), title: 'col 5', image: null },
    ],
    rows: [
        { id: uuidv4(), title: 'row 1', image: null },
        { id: uuidv4(), title: 'row 2', image: null },
        { id: uuidv4(), title: 'row 3', image: null },
        { id: uuidv4(), title: 'row 4', image: null },
        { id: uuidv4(), title: 'row 5', image: null },
    ],
    takenValues: [],
};

const formId = '5ca8820de54d4511ecbd854f';

module.exports = {
    emptyForm,
    formId,
};
