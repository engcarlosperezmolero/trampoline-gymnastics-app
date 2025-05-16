import { createRoot } from 'react-dom/client'
import { StrictMode } from 'react'
import App from './App'
import { AppProviders } from './AppProviders'
import './index.css'
// Import i18n instance (must be imported before components that use it)
import './i18n'

console.log("Script loaded - attempting to render application");

const rootElement = document.getElementById("root");
if (rootElement) {
  try {
    console.log("Root element found, creating React root");
    
    const root = createRoot(rootElement);
    console.log("Rendering App with proper providers");
    
    root.render(
      <StrictMode>
        <AppProviders>
          <App />
        </AppProviders>
      </StrictMode>
    );
    
    console.log("Render call completed");
  } catch (error) {
    console.error("Error rendering the app:", error);
    rootElement.innerHTML = `
      <div style="padding: 20px; font-family: sans-serif;">
        <h1>Error Rendering App</h1>
        <p>Please check the browser console for details.</p>
      </div>
    `;
  }
}
