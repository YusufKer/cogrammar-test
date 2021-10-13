import {
  BrowserRouter as Router,
  Route
} from "react-router-dom";

import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";

import './App.css';

function App() {

  return (
    <div className="App">
      <Router>
        <Route path="/login">
          <Login/>
        </Route>
        <Route path="/register">
          <Register/>
        </Route>
        <Route path="/dashboard">
          <Dashboard/>
        </Route>
      </Router>
    </div>
  );
}

export default App;
