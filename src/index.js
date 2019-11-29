import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';



const initialState = {
  selectedWidget: null,
  widgets: [
    {
      id: '1',
      kind: 'number',
      data: 55,
    },
    {
      id: '2',
      kind: 'timelapse',
      data: [3, 14, 16, 54, 28, 14]
    }
  ]
}

ReactDOM.render(<App initialData={initialState} />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
