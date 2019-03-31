import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import { TAKEN_VALUE_SHAPE } from 'src/client/shapes';

import styles from './radio-input.scss';

const RadioInput = ({ rowId, columnId, takenValues, onSelectInput }) => {
    const isSelectedOption = () => (
        takenValues.find(value => value.rowId === rowId && value.columnId === columnId)
    );

    const isSelected = isSelectedOption(rowId, columnId);

    const radioClassName = classnames(
        'radio-button',
        isSelected && 'selected',
    );

    return (
        <input
            type="radio"
            name={`${columnId}-${rowId}`}
            className={styles[radioClassName]}
            checked={isSelected}
            onChange={() => onSelectInput(rowId, columnId)}
        />
    );
};

RadioInput.propTypes = {
    rowId: PropTypes.string.isRequired,
    columnId: PropTypes.string.isRequired,
    takenValues: PropTypes.arrayOf(TAKEN_VALUE_SHAPE),
    onSelectInput: PropTypes.func.isRequired,
};

RadioInput.defaultProps = {
    takenValues: [],
};

export default RadioInput;
