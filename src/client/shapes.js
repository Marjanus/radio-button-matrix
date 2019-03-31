import PropTypes from 'prop-types';

const ROW_OR_COLUMN_SHAPE = PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    image: PropTypes.string,
});

const TAKEN_VALUE_SHAPE = PropTypes.shape({
    columnId: PropTypes.string.isRequired,
    rowId: PropTypes.string.isRequired,
});

const QUESTION_DATA_SHAPE = PropTypes.shape({
    questionTitle: PropTypes.string.isRequired,
    columns: PropTypes.arrayOf(ROW_OR_COLUMN_SHAPE),
    rows: PropTypes.arrayOf(ROW_OR_COLUMN_SHAPE),
    takenValues: PropTypes.arrayOf(TAKEN_VALUE_SHAPE),
});

export default QUESTION_DATA_SHAPE;
