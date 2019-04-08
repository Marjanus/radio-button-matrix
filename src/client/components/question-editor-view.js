import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { MAX_NUMBER_OF_ROWS_OR_COLUMNS, LABEL_TYPES } from 'src/client/constants';
import QUESTION_DATA_SHAPE from 'src/client/shapes';

import RadioInput from './inputs/radio-input';
import LabelRemoveWrapper from './label-remove-wrapper';
import TextInput from './inputs/text-input';
import Button from './inputs/button';
import ImageWrapper from './image-wrapper';

import styles from './question-editor-view.scss';

class QuestionEditorView extends Component {
    constructor(props) {
        super(props);

        this.submitIsDisabled = this.submitIsDisabled.bind(this);
        this.renderAddMoreButton = this.renderAddMoreButton.bind(this);
        this.renderColumnLabels = this.renderColumnLabels.bind(this);
        this.renderRows = this.renderRows.bind(this);
        this.renderRadioInputs = this.renderRadioInputs.bind(this);
    }

    submitIsDisabled() {
        const {
            data: {
                columns,
                rows,
                questionTitle,
            },
        } = this.props;


        const emptyColumnsLabels = columns.filter(column => !column.title.length);
        const emptyRowLabels = rows.filter(row => !row.title.length);
        return !questionTitle.length || !!emptyColumnsLabels.length || !!emptyRowLabels.length;
    }

    renderAddMoreButton(type) {
        const {
            data,
            onAddColumnOrRow,
        } = this.props;

        return data[type].length < MAX_NUMBER_OF_ROWS_OR_COLUMNS
            ? <Button onClick={() => onAddColumnOrRow(type)} label="+" square />
            : null;
    }

    renderColumnLabels() {
        const {
            data: {
                columns,
            },
            onChangeLabel,
            onRemoveColumnOrRow,
            onAddFile,
        } = this.props;

        return columns.map(column => (
            <div className={styles['column']} key={column.id}>
                <ImageWrapper
                    image={column.image}
                    disabled={this.submitIsDisabled()}
                    type={LABEL_TYPES.columns}
                    id={column.id}
                    onAddFile={onAddFile}
                />
                <LabelRemoveWrapper
                    id={column.id}
                    onRemoveColumnOrRow={onRemoveColumnOrRow}
                    type={LABEL_TYPES.columns}
                    numberOfTypeLabels={columns.length}
                >
                    <TextInput
                        value={column.title}
                        onChange={event => onChangeLabel(event, column.id, LABEL_TYPES.columns)}
                    />
                </LabelRemoveWrapper>
            </div>
        ));
    }

    renderRows() {
        const {
            data: {
                rows,
            },
            onChangeLabel,
            onRemoveColumnOrRow,
            onAddFile,
        } = this.props;

        return rows.map(row => (
            <div key={row.id} className={styles['row']}>
                <ImageWrapper
                    image={row.image}
                    disabled={this.submitIsDisabled()}
                    type={LABEL_TYPES.rows}
                    id={row.id}
                    onAddFile={onAddFile}
                />
                <div className={styles['row-label']}>
                    <LabelRemoveWrapper
                        id={row.id}
                        onRemoveColumnOrRow={onRemoveColumnOrRow}
                        type={LABEL_TYPES.rows}
                        numberOfTypeLabels={rows.length}
                    >
                        <TextInput
                            value={row.title}
                            onChange={event => onChangeLabel(event, row.id, LABEL_TYPES.rows)}
                        />
                    </LabelRemoveWrapper>
                </div>
                {this.renderRadioInputs(row.id)}
            </div>
        ));
    }

    renderRadioInputs(rowId) {
        const {
            data: {
                columns,
                takenValues,
            },
            onSelectRadioInput,
        } = this.props;

        return columns.map((column => (
            <div key={column.id + rowId} className={styles['radio-input-wrapper']}>
                <RadioInput
                    rowId={rowId}
                    columnId={column.id}
                    takenValues={takenValues}
                    onSelectRadioInput={onSelectRadioInput}
                />
            </div>
        )));
    }

    render() {
        const {
            data: {
                questionTitle,
            },
            onChangeQuestionTitle,
            onSubmitForm,
            onResetForm,
        } = this.props;

        return (
            <div className={styles['question-editor-view']}>
                <h2>Question Editor View</h2>
                <form className={styles['form']} action="/upload">
                    <div className={styles['title']}>
                        <TextInput
                            value={questionTitle}
                            onChange={onChangeQuestionTitle}
                        />
                    </div>
                    <div className={styles['column-container']}>
                        {this.renderColumnLabels()}
                        {this.renderAddMoreButton(LABEL_TYPES.columns)}
                    </div>
                    {this.renderRows()}
                    {this.renderAddMoreButton(LABEL_TYPES.rows)}
                    <div className={styles['form-buttons']}>
                        <Button
                            type="reset"
                            onClick={onResetForm}
                            label="Reset form"
                        />
                        <Button
                            type="submit"
                            disabled={this.submitIsDisabled()}
                            onClick={onSubmitForm}
                            label="Save form"
                        />
                    </div>
                </form>
            </div>
        );
    }
}

QuestionEditorView.propTypes = {
    data: QUESTION_DATA_SHAPE.isRequired,
    onChangeQuestionTitle: PropTypes.func.isRequired,
    onSelectRadioInput: PropTypes.func.isRequired,
    onChangeLabel: PropTypes.func.isRequired,
    onAddColumnOrRow: PropTypes.func.isRequired,
    onRemoveColumnOrRow: PropTypes.func.isRequired,
    onAddFile: PropTypes.func.isRequired,
    onSubmitForm: PropTypes.func.isRequired,
    onResetForm: PropTypes.func.isRequired,
};

export default QuestionEditorView;
