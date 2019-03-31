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
            name,
        } = this.props;

        const file = event.target.files[0];

        this.setState({ selectedFile: event.target.files[0] });
        onAddFile({ file, name, type: 'columns', imageName: `IMAGE-${file.name}` });
    }

    render() {
        const {
            selectedFile,
        } = this.state;

        const {
            name,
        } = this.props;

        return (
            <div>
                {selectedFile && <div>Selected</div>}
                <input type="file" name={name} onChange={this.onChange} />
            </div>
        );
    }
}

FileUpload.propTypes = {
    onAddFile: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
};

export default FileUpload;
