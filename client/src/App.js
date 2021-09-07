import './App.css';
import Main from './components/Main/Main'
import Login from './components/Login/Login'

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

function App() {
  return (
    <Router>
      <Switch>
        {/* <Login /> */}
        {/* <Main /> */}
        <Route exact path="/"><Redirect to="/login" /></Route>
        <Route exact path="/login" component={Login} />
        <Route exact path="/overview" component = {Main} />
        <Route exact path="/users" component = {Main} />
        <Route exact path="/session" component = {Main} />

      </Switch>
      
    </Router>
    
  );
}

export default App;
