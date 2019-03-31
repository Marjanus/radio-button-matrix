import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import {
    MAX_NUMBER_OF_ROWS_OR_COLUMNS,
    LABEL_TYPES,
} from 'src/client/constants';
import QUESTION_DATA_SHAPE from 'src/client/shapes';

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
        onSelectInput,
        onChangeLabel,
        onAddColumnOrRow,
        onRemoveColumnOrRow,
        onAddFile,
        onSubmitForm,
    } = props;

    const isSelectedOption = (rowId, columnId) => (
        takenValues.filter(value => value.rowId === rowId && value.columnId === columnId).length
    );

    const renderFileInputs = () => columns.map(column => (
        <div className={styles['column']}>
            <FileUpload key={`file-upload-${column.id}`} onAddFile={onAddFile} name={column.id} />
        </div>
    ));

    const renderColumnLabels = () => columns.map(column => (
        <div className={styles['column']} key={column.id}>
            <LabelRemoveWrapper
                id={column.id}
                onRemoveColumnOrRow={onRemoveColumnOrRow}
                type={LABEL_TYPES.columns}
                numberOfTypeLabels={columns.length}
            >
                { /*
                {column.image &&
                    <img
                        width="200"
                        height="200"
                        src={require(`src/client/public/images/${column.image}`)}
                        alt="image"
                    />
                }
            */ }
                <input
                    type="text"
                    value={column.title}
                    onChange={event => onChangeLabel(event, column.id, LABEL_TYPES.columns)}
                />
            </LabelRemoveWrapper>
        </div>
    ));

    const renderRadioInput = (rowId, columnId) => {
        const isSelected = isSelectedOption(rowId, columnId);

        const radioClassName = classnames(
            'radio-button',
            isSelected && 'selected',
        );

        return (
            <input
                type="radio"
                name={`${columnId}-${rowId}`}
                className={radioClassName}
                checked={isSelected}
                onChange={() => onSelectInput(rowId, columnId)}
            />
        );
    };

    const renderColumnData = rowId => columns.map((column => (
        <div className={styles['column']} key={column.id + rowId}>{renderRadioInput(rowId, column.id)}</div>
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
            { /* TODO make editable */}
            <div>{questionTitle}</div>
            <div className={styles['column-container']}> {renderFileInputs()}</div>
            <form action="/upload">
                <div className={styles['column-container']}>
                    <div>`empty    `</div>
                    {renderColumnLabels()}
                    {columns.length < MAX_NUMBER_OF_ROWS_OR_COLUMNS
                        && <div onClick={() => onAddColumnOrRow(LABEL_TYPES.columns)}>+</div>
                    }
                </div>
                <div>{renderRows()}</div>
                {rows.length < MAX_NUMBER_OF_ROWS_OR_COLUMNS
                    && <div onClick={() => onAddColumnOrRow(LABEL_TYPES.rows)}>+</div>
                }
                <button type="submit" onClick={onSubmitForm}> Submit</button>
            </form>
        </div>
    );
};

export default QuestionEditorView;

QuestionEditorView.propTypes = {
    data: QUESTION_DATA_SHAPE.isRequired,
    onSelectInput: PropTypes.func.isRequired,
    onChangeLabel: PropTypes.func.isRequired,
    onAddColumnOrRow: PropTypes.func.isRequired,
    onRemoveColumnOrRow: PropTypes.func.isRequired,
    onAddFile: PropTypes.func.isRequired,
    onSubmitForm: PropTypes.func.isRequired,
};
