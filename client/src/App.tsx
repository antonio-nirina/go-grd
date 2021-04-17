import { BrowserRouter } from "react-router-dom"
import Router from "./views/commons/router"

function App() {
  return (
    <div className="App">
      <header className="app-header">
      	<BrowserRouter>
		  <Router />
		</BrowserRouter>
      </header>
    </div>
  );
}

export default App
