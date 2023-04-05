import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles.css';
import { JournalApp } from './JournalApp'; 
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>

    <BrowserRouter>  {/* defino mi BrowserRouter para navegar dentro de JournalApp que tiene el componenete donde esta la estructura de mis rutas  */}
    <JournalApp />
    </BrowserRouter>
   
  </React.StrictMode>
);

