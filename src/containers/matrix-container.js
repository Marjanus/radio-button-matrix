import React, { Component } from 'react';

import QuestionEditorView from 'src/components/question-editor-view';
import QuestionSummaryView from 'src/components/question-summary-view';
import questionData from 'src/mock-data';
import {
    MIN_NUMBER_OF_ROWS_OR_COLUMNS,
    MAX_NUMBER_OF_ROWS_OR_COLUMNS,
} from 'src/constants';

class MatrixContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: null,
        };

        this.onChangeLabel = this.onChangeLabel.bind(this);
        this.onSelectInput = this.onSelectInput.bind(this);
        this.onAddColumnOrRow = this.onAddColumnOrRow.bind(this);
        this.onRemoveColumnOrRow = this.onRemoveColumnOrRow.bind(this);
    }

    componentDidMount() {
        // TODO fetch data from BE
        this.setState({ data: questionData.data });
    }

    onChangeLabel(event, id, type) {
        const {
            data,
        } = this.state;

        // prevent removing label
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

    render() {
        const {
            data,
        } = this.state;

        if (!data) {
            return null;
        }

        return (
            <div>
                <QuestionEditorView
                    data={data}
                    onSelectInput={this.onSelectInput}
                    onChangeLabel={this.onChangeLabel}
                    onAddColumnOrRow={this.onAddColumnOrRow}
                    onRemoveColumnOrRow={this.onRemoveColumnOrRow}
                />
                <QuestionSummaryView data={data} />
            </div>
        );
    }
}

export default MatrixContainer;
