import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import styles from './button.scss';

const Button = ({ type, label, disabled, onClick, square }) => {
    const className = classnames(
        styles['button'],
        styles[type],
        square && styles['square'],
        disabled && styles['disabled'],
    );

    return (
        <button
            className={className}
            type={type}
            disabled={disabled}
            onClick={onClick}
        >
            {label}
        </button>
    );
};

Button.propTypes = {
    type: PropTypes.oneOf(['button', 'submit', 'reset']),
    label: PropTypes.string.isRequired,
    disabled: PropTypes.bool,
    square: PropTypes.bool,
    onClick: PropTypes.func,
};

Button.defaultProps = {
    type: 'button',
    disabled: false,
    square: false,
    onClick: null,
};

export default Button;
