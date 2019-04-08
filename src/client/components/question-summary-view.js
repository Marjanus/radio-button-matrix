import React from 'react';

import QUESTION_DATA_SHAPE from 'src/client/shapes';

import styles from './question-summary-view.scss';

const QuestionSummaryView = ({ data }) => {
    const renderStatisticsRow = (text, number) => `${text}${number}`;

    const numberOfImagesUploaded = data.rows.filter(row => row.image).length
        + data.columns.filter(column => column.image).length;

    const getLongestLabel = (type) => {
        const labelsLengths = data[type].map(item => item.title.length);
        return Math.max(...labelsLengths);
    };

    const getShortestLabel = (type) => {
        const labelsLengths = data[type].map(item => item.title.length);
        return Math.min(...labelsLengths);
    };

    return (
        <div className={styles['question-summary-view']}>
            <h2>Question Summary View</h2>
            <div className={styles['content']}>
                <h4>Summary</h4>
                <ul className={styles['list']}>
                    <li>
                        {renderStatisticsRow('Number of rows: ', data.rows.length)}
                    </li>
                    <li>
                        {renderStatisticsRow('Number of colums: ', data.columns.length)}
                    </li>
                    <li>
                        {renderStatisticsRow('Number of images uploaded: ', numberOfImagesUploaded)}
                    </li>
                    <li>
                        {renderStatisticsRow('Longest row label: ', getLongestLabel('rows'))}
                    </li>
                    <li>
                        {renderStatisticsRow('Shortest row label: ', getLongestLabel('rows'))}
                    </li>
                    <li>
                        {renderStatisticsRow('Longest column label: ', getShortestLabel('columns'))}
                    </li>
                    <li>
                        {renderStatisticsRow('Shortest column label: ', getShortestLabel('rows'))}
                    </li>
                </ul>
            </div>
        </div>
    );
};

QuestionSummaryView.propTypes = {
    data: QUESTION_DATA_SHAPE.isRequired,
};

export default QuestionSummaryView;
