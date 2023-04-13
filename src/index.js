import React from 'react';
import {Provider} from 'react-redux'
import ReactDOM from 'react-dom/client';
import './styles.css';

import { JournalApp } from './JournalApp'; 
import { BrowserRouter } from 'react-router-dom';
import { store } from './store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>

    <Provider store={store}> {/* proveedor de mi store  */}

    <BrowserRouter>  {/* BrowserRouter para navegar dentro de JournalApp que tiene el componenete donde esta la estructura de mis rutas  */}
    <JournalApp />
    </BrowserRouter>

    </Provider>
   
  </React.StrictMode>
);

