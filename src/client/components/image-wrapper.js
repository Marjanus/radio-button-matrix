import React from 'react';
import PropTypes from 'prop-types';

import { LABEL_TYPES } from 'src/client/constants';

import FileUpload from './inputs/file-upload';

import styles from './image-wrapper.scss';

const ImageWrapper = ({ type, image, id, disabled, onAddFile }) => {
    if (!image) {
        return (
            <div className={styles['image-wrapper']}>
                <FileUpload
                    disabled={disabled}
                    type={type}
                    id={id}
                    onAddFile={onAddFile}
                />
            </div>
        );
    }

    return (
        <div className={styles['image-wrapper']}>
            <img src={image} alt={`${type}-header`} />
        </div>
    );
};

ImageWrapper.propTypes = {
    type: PropTypes.oneOf([LABEL_TYPES.columns, LABEL_TYPES.rows]).isRequired,
    image: PropTypes.string,
    id: PropTypes.string.isRequired,
    disabled: PropTypes.bool,
    onAddFile: PropTypes.func.isRequired,
};

ImageWrapper.defaultProps = {
    image: null,
    disabled: false,
};

export default ImageWrapper;
