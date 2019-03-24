import React, { Component } from 'react';

import Statistics from 'src/components/statistics';
import data from 'src/mock-data';

class MatrixContainer extends Component {
    componentDidMount() {
        // TODO fetch data from BE
    }

    render() {
        return (
            <Statistics data={data} />
        );
    }
}

export default MatrixContainer;
