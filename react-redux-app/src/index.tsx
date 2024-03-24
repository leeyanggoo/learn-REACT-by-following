import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { applyMiddleware, createStore } from 'redux';
import rootReducer from './reducer';
import { Provider } from 'react-redux';
import { thunk } from 'redux-thunk';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const loggerMiddleware = (store: any) => (next: any) => (action: any) => {
  console.log(`store`, store);
  console.log(`action`, action);
  next(action);
};

const middleWare = applyMiddleware(loggerMiddleware, thunk);

const store = createStore(rootReducer, {}, middleWare);

const render = () =>
  root.render(
    <React.StrictMode>
      <Provider store={store}>
        <App
          value={store.getState()}
          onIncrement={() => store.dispatch({ type: 'INCREMENT' })}
          onDecrement={() => store.dispatch({ type: 'DECREMENT' })}
        />
      </Provider>
    </React.StrictMode>
  );
render();
store.subscribe(render);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
