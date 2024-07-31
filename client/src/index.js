import React from 'react'
import ReactDOM from 'react-dom/client';
import {Provider} from 'react-redux';
import { store } from './app/store';
import { GoogleOAuthProvider } from '@react-oauth/google';
import './style.css'
import App from './App.js'


 const root=ReactDOM.createRoot(document.getElementById("root"));
 root.render(
  <GoogleOAuthProvider clientId ='679552614686-5mbe1jq39cq7t2miliq6q5qt4j1phioj.apps.googleusercontent.com'  >
    <React.StrictMode>
      <Provider store={store}>
        <App/>
      </Provider>
    </React.StrictMode>
    </GoogleOAuthProvider>
 )
