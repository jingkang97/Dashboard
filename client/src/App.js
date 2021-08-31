import './App.css';
import Main from './components/Main/Main'
import {
  BrowserRouter as Router,
  Switch,
  useLocation
} from "react-router-dom";

function App() {
  return (
    <Router>
      <Main />
    </Router>
    
  );
}

export default App;
