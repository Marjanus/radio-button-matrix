import React, { Component } from 'react';
import PropTypes from 'prop-types';

class FileUpload extends Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedFile: null,
        };

        this.onChange = this.onChange.bind(this);
    }

    onChange(event) {
        const {
            onAddFile,
            id,
            type,
        } = this.props;

        const file = event.target.files[0];

        this.setState({ selectedFile: event.target.files[0] });

        onAddFile({
            file,
            id,
            type,
        });
    }

    render() {
        const {
            selectedFile,
        } = this.state;

        const {
            disabled,
        } = this.props;

        return (
            <div>
                {selectedFile && <div>Selected</div>}
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
