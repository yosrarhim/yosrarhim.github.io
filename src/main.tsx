import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import { App } from './App';
import './styles/index.css';

const container = document.getElementById('root');
if (!container) throw new Error('Missing #root element');

const app = (
  <StrictMode>
    <App />
  </StrictMode>
);

// Production HTML is pre-rendered at build time (scripts/prerender.mjs): hydrate it.
// The dev server serves the empty template: render from scratch.
if (container.firstElementChild) hydrateRoot(container, app);
else createRoot(container).render(app);
