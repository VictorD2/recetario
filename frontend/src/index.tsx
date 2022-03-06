import React, { lazy, Suspense } from "react";
import ReactDOM from 'react-dom';
import './styles/index.css';
import reportWebVitals from './reportWebVitals';

import PageLoading from "./shared/PageLoading";

const App = lazy(() => import("./app/App"));

ReactDOM.render(
  <React.StrictMode>
     <Suspense fallback={<PageLoading />}>
      <App />
    </Suspense>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
