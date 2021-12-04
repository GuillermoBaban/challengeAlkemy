import { Home } from "./components/Home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import PrivateRoute from "./Routes/PrivateRoute";
import { Signin } from "./components/Signin";
import { NoToken } from "./components/NoToken";

function App() {
  return (
    <Router>
      <Switch>
        <PrivateRoute exact path="/home">
          <Home />
        </PrivateRoute>
        <Route path="/noToken">
          <NoToken />
        </Route>
        <Route exact path="/">
          <Signin />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
