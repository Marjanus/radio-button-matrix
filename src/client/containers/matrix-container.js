import React, { Component } from 'react';
import axios from 'axios';

import QuestionEditorView from 'src/client/components/question-editor-view';
import QuestionSummaryView from 'src/client/components/question-summary-view';
import {
    MIN_NUMBER_OF_ROWS_OR_COLUMNS,
    MAX_NUMBER_OF_ROWS_OR_COLUMNS,
} from 'src/client/constants';

import styles from './matrix-container.scss';

class MatrixContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: null,
            error: null,
            loading: false,
        };

        this.fetchData = this.fetchData.bind(this);
        this.onChangeLabel = this.onChangeLabel.bind(this);
        this.onSelectInput = this.onSelectInput.bind(this);
        this.onAddColumnOrRow = this.onAddColumnOrRow.bind(this);
        this.onRemoveColumnOrRow = this.onRemoveColumnOrRow.bind(this);
        this.onSubmitForm = this.onSubmitForm.bind(this);
        this.onAddFile = this.onAddFile.bind(this);
    }

    componentDidMount() {
        this.fetchData();
    }

    onChangeLabel(event, id, type) {
        const {
            data,
        } = this.state;

        // TODO prevent removing label, error on submit?
        const itemIndex = data[type].findIndex(item => item.id === id);

        const updatedState = {
            ...data,
            [type]: [
                ...data[type].slice(0, itemIndex),
                { id, title: event.target.value, image: null },
                ...data[type].slice(itemIndex + 1),
            ],
        };

        this.setState({ data: updatedState });
    }

    onSelectInput(rowId, columnId) {
        const {
            data,
            data: {
                takenValues,
            },
        } = this.state;

        const clearedSiblingValues = takenValues
            .filter(value => value.rowId !== rowId && value.columnId !== columnId);

        const updatedData = {
            ...data,
            takenValues: [
                ...clearedSiblingValues,
                { rowId, columnId },
            ],
        };

        this.setState({
            data: updatedData,
        });
    }

    onAddColumnOrRow(type) {
        const {
            data,
        } = this.state;

        if (data[type].length < MAX_NUMBER_OF_ROWS_OR_COLUMNS) {
            const numberOfItems = data[type].length;
            // TODO add non dublicate ids
            const id = `${type.slice(0, 2)}${numberOfItems}`;
            // probably, labels should be unique, however, this was not specified in the task
            const title = `${type.slice(0, 3)}${numberOfItems + 1}`;

            const updatedState = {
                ...data,
                [type]: [
                    ...data[type],
                    { id, title, image: null },
                ],
            };

            this.setState({ data: updatedState });
        }
    }

    onRemoveColumnOrRow(type, id) {
        const {
            data,
        } = this.state;

        if (data[type].length > MIN_NUMBER_OF_ROWS_OR_COLUMNS) {
            const filteredValues = data[type].filter(item => item.id !== id);

            const updatedState = {
                ...data,
                [type]: [
                    ...filteredValues,
                ],
            };

            this.setState({ data: updatedState });
        }
    }

    onSubmitForm(event) {
        const {
            data,
        } = this.state;

        event.preventDefault();

        const fileData = new FormData();
        const updatedState = { ...data };

        //images = images.filter(image => image.name.match(/\.(png|jpe?g|gif|svg)$/))

        data.selectedImages.forEach((item) => {
            fileData.append('files', item.file);
            fileData.append('filename', item.name);

            // TODO refactor
            const value = updatedState[item.type].find(someItem => someItem.id === item.name);
            value.image = item.imageName;
        });

        fileData.append('state', JSON.stringify(updatedState));

        this.setState({ loading: true });

        axios.post('http://localhost:4000/submit', fileData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
            .then((returnData) => {
                this.setState({
                    data: returnData.data.state,
                    loading: false,
                });
            })
            .catch((error) => {
                this.setState({
                    loading: false,
                    error,
                });
            });
    }

    onAddFile(image) {
        const {
            data,
        } = this.state;

        // todo filter out same field images
        const updatedData = {
            ...data,
            selectedImages: [
                ...data.selectedImages,
                image,
            ],
        };

        this.setState({ data: updatedData });
    }


    fetchData() {
        this.setState({ loading: true });
        axios.get('http://localhost:4000/')
            .then((data) => {
                this.setState({
                    loading: false,
                    data: data.data,
                });
            })
            .catch((error) => {
                this.setState({
                    loading: false,
                    error,
                });
            });
    }

    render() {
        const {
            data,
            loading,
            error,
        } = this.state;

        if (loading) {
            return <div>Loading</div>;
        }

        if (error) {
            return <div>Error</div>;
        }

        if (!data) {
            return null;
        }

        return (
            <div id="matrix" className={styles['matrix-container']}>
                <QuestionEditorView
                    data={data}
                    onSelectInput={this.onSelectInput}
                    onChangeLabel={this.onChangeLabel}
                    onAddColumnOrRow={this.onAddColumnOrRow}
                    onRemoveColumnOrRow={this.onRemoveColumnOrRow}
                    onAddFile={this.onAddFile}
                    onSubmitForm={this.onSubmitForm}
                />
                <QuestionSummaryView data={data} />
            </div>
        );
    }
}

export default MatrixContainer;
