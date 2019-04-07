import React from 'react';
import PropTypes from 'prop-types';

import {
    MAX_NUMBER_OF_ROWS_OR_COLUMNS,
    LABEL_TYPES,
} from 'src/client/constants';
import QUESTION_DATA_SHAPE from 'src/client/shapes';

import RadioInput from './inputs/radio-input';
import LabelRemoveWrapper from './label-remove-wrapper';
import TextInput from './inputs/text-input';
import FileUpload from './inputs/file-upload';
import Button from './inputs/button';

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
    const disabledSubmit = !questionTitle.trim().length || !!emptyColumnsLabels.length
        || !!emptyRowLabels.length;

    const renderColumnLabels = () => columns.map(column => (
        <div className={styles['column']} key={column.id}>
            {column.image &&
                <img width="40" height="40" src={column.image} />
            }
            {!column.image && (
                <FileUpload
                    disabled={!!disabledSubmit}
                    key={`file-upload-${column.id}`}
                    type="columns"
                    id={column.id}
                    onAddFile={onAddFile}
                />
            )
            }
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
                {row.image &&
                    <img width="40" height="40" src={row.image} />
                }
                {!row.image && (
                    <FileUpload
                        disabled={!!disabledSubmit}
                        key={`file-upload-${row.id}`}
                        type="rows"
                        id={row.id}
                        onAddFile={onAddFile}
                    />
                )
                }
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
                {renderColumnData(row.id)}
            </div>
        ))
    );

    return (
        <div className={styles['question-editor-view']}>
            <div>Question Editor View</div>
            <form action="/upload">
                <TextInput
                    value={questionTitle}
                    onChange={onChangeQuestionTitle}
                />
                <div className={styles['column-container']}>
                    {renderColumnLabels()}
                    {columns.length < MAX_NUMBER_OF_ROWS_OR_COLUMNS
                        && (
                            <Button
                                onClick={() => onAddColumnOrRow(LABEL_TYPES.columns)}
                                label="+"
                                square
                            />
                        )
                    }
                </div>
                <div>{renderRows()}</div>
                {rows.length < MAX_NUMBER_OF_ROWS_OR_COLUMNS
                    && (
                        < Button onClick={() => onAddColumnOrRow(LABEL_TYPES.rows)} label="+" square />
                    )
                }
                <Button
                    type="reset"
                    disabled={disabledSubmit}
                    onClick={onResetForm}
                    label="Reset form"
                />
                <Button
                    type="submit"
                    disabled={disabledSubmit}
                    onClick={onSubmitForm}
                    label="Save form"
                />
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
