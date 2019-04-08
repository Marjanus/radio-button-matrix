import React from 'react';
import PropTypes from 'prop-types';

import classnames from 'classnames';

import styles from './text-input.scss';

const TextInput = ({ value, onChange }) => {
    const className = classnames(
        styles['text-input'],
        !value.length && styles['error'],
    );

    return (
        <input
            className={className}
            type="text"
            value={value}
            onChange={onChange}
            maxLength="48"
        />
    );
};

TextInput.propTypes = {
    value: PropTypes.string,
    onChange: PropTypes.func.isRequired,
};

TextInput.defaultProps = {
    value: '',
};

export default TextInput;
