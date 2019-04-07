import React from 'react';
import PropTypes from 'prop-types';

import {
    MAX_NUMBER_OF_ROWS_OR_COLUMNS,
    LABEL_TYPES,
} from 'src/client/constants';
import QUESTION_DATA_SHAPE from 'src/client/shapes';

import RadioInput from './radio-input';
import LabelRemoveWrapper from './label-remove-wrapper';
import FileUpload from './file-upload';

import styles from './question-editor-view.scss';

const QuestionEditorView = (props) => {
    const {
        data: {
            columns,
            rows,
            questionTitle,
            takenValues,
        },
        onChangeQuestionTitle,
        onSelectInput,
        onChangeLabel,
        onAddColumnOrRow,
        onRemoveColumnOrRow,
        onAddFile,
        onSubmitForm,
        onResetForm,
    } = props;

    const emptyColumnsLabels = columns.filter(column => !column.title.trim().length);
    const emptyRowLabels = rows.filter(row => !row.title.trim().length);
    const disabledSubmit = !questionTitle.trim().length || emptyColumnsLabels.length
        || emptyRowLabels.length;

    const renderColumnLabels = () => columns.map(column => (
        <div className={styles['column']} key={column.id}>

            <img width="200" height="200" src={column.image} />
            <FileUpload
                disabled={!!disabledSubmit}
                key={`file-upload-${column.id}`}
                type="columns"
                id={column.id}
                onAddFile={onAddFile}
            />
            <LabelRemoveWrapper
                id={column.id}
                onRemoveColumnOrRow={onRemoveColumnOrRow}
                type={LABEL_TYPES.columns}
                numberOfTypeLabels={columns.length}
            >
                <input
                    type="text"
                    value={column.title}
                    onChange={event => onChangeLabel(event, column.id, LABEL_TYPES.columns)}
                />
            </LabelRemoveWrapper>
        </div>
    ));

    const renderColumnData = rowId => columns.map((column => (
        <div key={column.id + rowId}>
            <RadioInput
                rowId={rowId}
                columnId={column.id}
                takenValues={takenValues}
                onSelectInput={onSelectInput}
            />
        </div>
    )));


    const renderRows = () => (
        rows.map(row => (
            <div key={row.id} className={styles['row']}>
                <LabelRemoveWrapper
                    id={row.id}
                    onRemoveColumnOrRow={onRemoveColumnOrRow}
                    type={LABEL_TYPES.rows}
                    numberOfTypeLabels={rows.length}
                >
                    <input
                        type="text"
                        value={row.title}
                        onChange={event => onChangeLabel(event, row.id, LABEL_TYPES.rows)}
                    />
                </LabelRemoveWrapper>
                {renderColumnData(row.id)}
            </div>
        ))
    );

    return (
        <div className={styles['question-editor-view']}>
            <div>Question Editor View</div>
            <form action="/upload">
                <input
                    type="text"
                    value={questionTitle}
                    onChange={onChangeQuestionTitle}
                />
                <div className={styles['column-container']}>
                    {renderColumnLabels()}
                    {columns.length < MAX_NUMBER_OF_ROWS_OR_COLUMNS
                        && <div onClick={() => onAddColumnOrRow(LABEL_TYPES.columns)}>+</div>
                    }
                </div>
                <div>{renderRows()}</div>
                {rows.length < MAX_NUMBER_OF_ROWS_OR_COLUMNS
                    && <div onClick={() => onAddColumnOrRow(LABEL_TYPES.rows)}>+</div>
                }
                <button
                    type="button"
                    disabled={disabledSubmit}
                    onClick={onResetForm}
                >
                    Reset form
                </button>
                <button
                    type="submit"
                    disabled={disabledSubmit}
                    onClick={onSubmitForm}
                >
                    Submit
                </button>
            </form>
        </div>
    );
};

export default QuestionEditorView;

QuestionEditorView.propTypes = {
    data: QUESTION_DATA_SHAPE.isRequired,
    onChangeQuestionTitle: PropTypes.func.isRequired,
    onSelectInput: PropTypes.func.isRequired,
    onChangeLabel: PropTypes.func.isRequired,
    onAddColumnOrRow: PropTypes.func.isRequired,
    onRemoveColumnOrRow: PropTypes.func.isRequired,
    onAddFile: PropTypes.func.isRequired,
    onSubmitForm: PropTypes.func.isRequired,
    onResetForm: PropTypes.func.isRequired,
};
