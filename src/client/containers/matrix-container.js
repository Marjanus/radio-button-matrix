import React, { Component } from 'react';
import axios from 'axios';
import uuidv4 from 'uuid/v4';

import QuestionEditorView from 'src/client/components/question-editor-view';
import QuestionSummaryView from 'src/client/components/question-summary-view';
import { MIN_NUMBER_OF_ROWS_OR_COLUMNS, MAX_NUMBER_OF_ROWS_OR_COLUMNS } from 'src/client/constants';

import styles from './matrix-container.scss';

class MatrixContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: null,
            error: null,
            loading: false,
        };

        this.onChangeQuestionTitle = this.onChangeQuestionTitle.bind(this);
        this.onChangeLabel = this.onChangeLabel.bind(this);
        this.onSelectInput = this.onSelectInput.bind(this);
        this.onAddColumnOrRow = this.onAddColumnOrRow.bind(this);
        this.onRemoveColumnOrRow = this.onRemoveColumnOrRow.bind(this);
        this.onAddFile = this.onAddFile.bind(this);
        this.onSubmitForm = this.onSubmitForm.bind(this);
        this.onResetForm = this.onResetForm.bind(this);
        this.fetchData = this.fetchData.bind(this);
    }

    componentDidMount() {
        this.fetchData();
    }

    onChangeQuestionTitle(event) {
        const {
            data,
        } = this.state;

        const updatedState = {
            ...data,
            questionTitle: event.target.value,
        };

        this.setState({
            data: updatedState,
        });
    }

    onChangeLabel(event, id, type) {
        const {
            data,
        } = this.state;

        const itemIndex = data[type].findIndex(item => item.id === id);
        const itemImage = data[type].find(item => item.id === id).image;

        const updatedState = {
            ...data,
            [type]: [
                ...data[type].slice(0, itemIndex),
                { id, title: event.target.value, image: itemImage },
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

        const removedSiblingValues = takenValues
            .filter(value => value.rowId !== rowId && value.columnId !== columnId);

        const updatedData = {
            ...data,
            takenValues: [
                ...removedSiblingValues,
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
            const id = uuidv4();
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

    onAddFile(image) {
        const {
            data,
        } = this.state;

        const fileData = new FormData();

        fileData.append('files', image.file);
        fileData.append('type', image.type);
        fileData.append('id', image.id);
        fileData.append('state', JSON.stringify(data));

        this.setState({ loading: true });

        axios.put('http://localhost:4000/upload-image', fileData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
            .then((returnData) => {
                this.setState({
                    loading: false,
                    data: {
                        ...returnData.data,
                    },
                });
            })
            .catch((error) => {
                this.setState({
                    loading: false,
                    error,
                });
            });
    }

    onSubmitForm(event) {
        const {
            data,
        } = this.state;

        event.preventDefault();
        this.setState({ loading: true });

        const fileData = new FormData();
        fileData.append('state', JSON.stringify(data));

        axios.put('http://localhost:4000/submit', fileData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
            .then((returnData) => {
                this.setState({
                    loading: false,
                    data: {
                        ...returnData.data,
                    },
                });
            })
            .catch((error) => {
                this.setState({
                    loading: false,
                    error,
                });
            });
    }

    onResetForm(event) {
        event.preventDefault();
        this.setState({ loading: true });

        axios.put('http://localhost:4000/reset')
            .then((data) => {
                this.setState({
                    loading: false,
                    data: {
                        ...data.data,
                    },
                });
            })
            .catch((error) => {
                this.setState({
                    loading: false,
                    error,
                });
            });
    }

    fetchData() {
        this.setState({ loading: true });

        axios.get('http://localhost:4000/')
            .then((data) => {
                this.setState({
                    loading: false,
                    data: {
                        ...data.data,
                    },
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
            return <div className={styles['matrix-container']}>Loading</div>;
        }

        if (error) {
            return <div className={styles['matrix-container']}>Error</div>;
        }

        if (!data) {
            return null;
        }

        return (
            <div className={styles['matrix-container']}>
                <QuestionEditorView
                    data={data}
                    onChangeQuestionTitle={this.onChangeQuestionTitle}
                    onSelectInput={this.onSelectInput}
                    onChangeLabel={this.onChangeLabel}
                    onAddColumnOrRow={this.onAddColumnOrRow}
                    onRemoveColumnOrRow={this.onRemoveColumnOrRow}
                    onAddFile={this.onAddFile}
                    onSubmitForm={this.onSubmitForm}
                    onResetForm={this.onResetForm}
                />
                <QuestionSummaryView data={data} />
            </div>
        );
    }
}

export default MatrixContainer;
