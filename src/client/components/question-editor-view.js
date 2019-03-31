import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
    MAX_NUMBER_OF_ROWS_OR_COLUMNS,
    LABEL_TYPES,
} from 'src/client/constants';
import QUESTION_DATA_SHAPE from 'src/client/shapes';

import LabelRemoveWrapper from './label-remove-wrapper';
import FileUpload from './file-upload';

const columnStyle = {
    display: 'flex',
};

const radioStyle = {
    borderRadius: '50%',
    border: '1px solid green',
    width: '20px',
    height: '20px',
    marginRight: '10px',
};

const activeRadioStyle = {
    ...radioStyle,
    backgroundColor: 'green',
};

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
        <FileUpload key={`file-upload-${column.id}`} onAddFile={onAddFile} name={column.id} />
    ));

    const renderColumnLabels = () => columns.map(column => (
        <LabelRemoveWrapper
            key={column.id}
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
    ));

    const renderRadioInput = (rowId, columnId) => {
        const isSelected = isSelectedOption(rowId, columnId);

        return (
            <input
                type="radio"
                name={`${columnId}-${rowId}`}
                style={isSelected ? activeRadioStyle : radioStyle}
                checked={isSelected}
                onChange={() => onSelectInput(rowId, columnId)}
            />
        );
    };

    const renderColumnData = rowId => columns.map((column => (
        <div key={column.id + rowId}>{renderRadioInput(rowId, column.id)}</div>
    )));


    const renderRows = () => (
        rows.map(row => (
            <div key={row.id} style={columnStyle}>
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
        <div>
            <div>Question Editor View</div>
            { /* TODO make editable */}
            <div>{questionTitle}</div>
            <div style={columnStyle}>{renderFileInputs()}</div>
            <form action="/upload">
                <div style={columnStyle}>
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
