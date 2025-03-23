import { createRoot } from "react-dom/client"
import "./styles/index.css"
import "./styles/globals.css"
import "./styles/App.css"
import "./styles/main.css"
import "./styles/quiz.css"
import "./styles/result.css"
import "./styles/admin.css"
import App from "./components/App.jsx"

/*Redux store here */
import store from "./redux/store.js"
import { Provider } from "react-redux"

document.addEventListener('contextmenu', (event) => {
  event.preventDefault();
});
document.addEventListener('keydown', (event) => {
  if (event.ctrlKey && (event.key === 'c' || event.key === 'x' || event.key === 'u') || 
      event.metaKey && (event.key === 'c' || event.key === 'x' || event.key === 'u')) {
    event.preventDefault();
  }
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'PrintScreen' || (event.ctrlKey && event.key === 'p')) {
    event.preventDefault();
    alert('Screenshots are disabled on this website.');
  }
});


// Add an error boundary for better debugging
window.addEventListener("error", (event) => {
  console.error("Global error caught:", event.error)
})

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
  </Provider>,
)

