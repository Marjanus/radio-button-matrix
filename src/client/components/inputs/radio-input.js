import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import { TAKEN_VALUE_SHAPE } from 'src/client/shapes';

import styles from './radio-input.scss';

const RadioInput = ({ rowId, columnId, takenValues, onSelectRadioInput }) => {
    const isSelectedOption = () => (
        takenValues.find(value => value.rowId === rowId && value.columnId === columnId)
    );

    const className = classnames(
        styles['radio-button'],
        isSelectedOption(rowId, columnId) && styles['selected'],
    );

    return (
        <div
            name={`${columnId}-${rowId}`}
            className={className}
            onClick={() => onSelectRadioInput(rowId, columnId)}
        />
    );
};

RadioInput.propTypes = {
    rowId: PropTypes.string.isRequired,
    columnId: PropTypes.string.isRequired,
    takenValues: PropTypes.arrayOf(TAKEN_VALUE_SHAPE),
    onSelectRadioInput: PropTypes.func.isRequired,
};

RadioInput.defaultProps = {
    takenValues: [],
};

export default RadioInput;
