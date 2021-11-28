import { Home } from "./components/Home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import PrivateRoute from "./Routes/PrivateRoute";
import { Signin } from "./components/Signin";
import { NoToken } from "./components/NoToken";
import { Provider } from "react-redux";
import store from "./store";

function App() {
  return (
    <Router>
      <Switch>
        <PrivateRoute exact path="/home">
          <Provider store={store}>
            <Home />
          </Provider>
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
