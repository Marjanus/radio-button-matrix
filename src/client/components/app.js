import React from 'react';
import ReactDOM from 'react-dom';

import MatrixContainer from 'src/client/containers/matrix-container';

const App = () => (
    <MatrixContainer />
);

ReactDOM.render(<App />, document.getElementById('app'));

export default App;
