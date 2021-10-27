import { Signin } from "./components/Signin";
import { Home } from "./components/Home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          <Signin />
        </Route>
        <Route path="/home" exact>
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
