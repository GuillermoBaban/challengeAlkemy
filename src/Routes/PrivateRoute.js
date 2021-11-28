import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({ children, ...props }) => {
  const token = localStorage.getItem("token");

  return <Route {...props}>{token ? children : <Redirect to="/" />}</Route>;
};

export default PrivateRoute;
