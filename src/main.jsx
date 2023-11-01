import React from 'react'
import ReactDOM from 'react-dom/client'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import {router} from './router';
import {RouterProvider} from 'react-router-dom';
import StateUser from './context/UserContext';
import { CssBaseline } from '@mui/material';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <StateUser>
      <CssBaseline/>
      <RouterProvider router={router}/>
    </StateUser>
  </React.StrictMode>,
)
