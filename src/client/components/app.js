import React from 'react';
import ReactDOM from 'react-dom';

import MatrixContainer from 'src/client/containers/matrix-container';

import styles from './app.scss';

const App = () => (
    <div className={styles['app']}>
        <MatrixContainer />
    </div>
);

ReactDOM.render(<App />, document.getElementById('app'));

export default App;
