import React from 'react';
import PropTypes from 'prop-types';

import { MIN_NUMBER_OF_ROWS_OR_COLUMNS } from 'src/client/constants';

const LabelRemoveWrapper = ({ id, onRemoveColumnOrRow, type, numberOfTypeLabels, children }) => (
    <div key={id}>
        {numberOfTypeLabels > MIN_NUMBER_OF_ROWS_OR_COLUMNS
            && <div onClick={() => { onRemoveColumnOrRow(type, id); }}>-</div>
        }
        {children}
    </div>
);

LabelRemoveWrapper.propTypes = {
    id: PropTypes.string.isRequired,
    onRemoveColumnOrRow: PropTypes.func.isRequired,
    type: PropTypes.string.isRequired,
    numberOfTypeLabels: PropTypes.number.isRequired,
    children: PropTypes.node.isRequired,
};

export default LabelRemoveWrapper;
