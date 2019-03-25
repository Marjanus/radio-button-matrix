import React from 'react';

import QUESTION_DATA_SHAPE from 'src/shapes';

const Statistics = ({ data }) => {
    const renderStatisticsRow = (text, dataPart) => `${text}${dataPart}`;

    const numberOfImagesUploaded = data.rows.filter(row => row.image).length
        + data.columns.filter(column => column.image).length;

    const getLongestLabel = (key) => {
        const labelsLengths = data[key].map(item => item.title.trim().length);
        return Math.max(...labelsLengths);
    }

    return (
        <div>
            <div>-----------------------------------------------</div>
            <div>Question Summary View</div>
            <div>Summary</div>
            <ul>
                <li>{renderStatisticsRow('Number of rows: ', data.rows.length)}</li>
                <li>{renderStatisticsRow('Number of colums: ', data.columns.length)}</li>
                <li>{renderStatisticsRow('Number of images uploaded: ', numberOfImagesUploaded)}</li>
                <li>{renderStatisticsRow('Longest row label: ', getLongestLabel('rows'))}</li>
                <li>{renderStatisticsRow('Longest column label: ', getLongestLabel('columns'))}</li>
            </ul>
        </div>
    );
}

Statistics.propTypes = {
    data: QUESTION_DATA_SHAPE.isRequired,
};

export default Statistics;
