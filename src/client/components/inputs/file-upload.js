import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import Button from './button';

import styles from './file-upload.scss';

class FileUpload extends Component {
    constructor(props) {
        super(props);

        this.onChange = this.onChange.bind(this);
    }

    onChange(event) {
        const {
            onAddFile,
            id,
            type,
        } = this.props;

        const file = event.target.files[0];

        onAddFile({ file, id, type });
    }

    render() {
        const {
            disabled,
        } = this.props;

        const className = classnames(
            styles['file-upload'],
            disabled && styles['disabled'],
        );

        return (
            <div className={className}>
                <Button
                    disabled={disabled}
                    onClick={null}
                    label="upload"
                />
                <input type="file" disabled={disabled} onChange={this.onChange} />
            </div>
        );
    }
}

FileUpload.propTypes = {
    onAddFile: PropTypes.func.isRequired,
    id: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    disabled: PropTypes.bool,
};

FileUpload.defaultProps = {
    disabled: false,
};

export default FileUpload;
