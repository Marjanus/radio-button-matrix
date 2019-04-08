import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import { MIN_NUMBER_OF_ROWS_OR_COLUMNS } from 'src/client/constants';

import styles from './label-remove-wrapper.scss';

const LabelRemoveWrapper = ({ id, onRemoveColumnOrRow, type, numberOfTypeLabels, children }) => {
    const showRemoveIcon = numberOfTypeLabels > MIN_NUMBER_OF_ROWS_OR_COLUMNS;
    const className = classnames(
        styles['label-remove-wrapper'],
        !showRemoveIcon && styles['without-icon'],
    );

    return (
        <div key={id} className={className}>
            {showRemoveIcon
                && (
                    <div
                        className={styles['icon']}
                        onClick={() => { onRemoveColumnOrRow(type, id); }}
                    >
                        +
                    </div>
                )
            }
            {children}
        </div>
    );
};

LabelRemoveWrapper.propTypes = {
    id: PropTypes.string.isRequired,
    onRemoveColumnOrRow: PropTypes.func.isRequired,
    type: PropTypes.string.isRequired,
    numberOfTypeLabels: PropTypes.number.isRequired,
    children: PropTypes.node.isRequired,
};

export default LabelRemoveWrapper;
