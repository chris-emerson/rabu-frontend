import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './app/store';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './index.css';
import {theme} from './theme'
import { CssBaseline, ThemeProvider } from '@mui/material';
import { MapProvider } from 'react-map-gl/maplibre';

const container = document.getElementById('root')!;
const root = createRoot(container);

root.render(
  <>
    <Provider store={store}>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <MapProvider>
      <App />
      </MapProvider>
      </ThemeProvider>
    </Provider>
  </>
);


reportWebVitals();
