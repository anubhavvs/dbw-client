import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { RouterProvider } from 'react-router-dom';
import { SnackbarProvider } from 'notistack';
import { Provider } from 'react-redux';
import routes from './routes/routes.jsx';
import store from './store.js';

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <SnackbarProvider
      maxSnack={3}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      autoHideDuration={4000}
    >
      <RouterProvider router={routes}>
        <App />
      </RouterProvider>
    </SnackbarProvider>
  </Provider>
);
