import { Form, Button } from "react-bootstrap";
import { ErrorMessage, Formik } from "formik";
import { passAndEmail } from "../services/index";
import { useHistory } from "react-router-dom";
import { useState } from "react";
export const Signin = () => {
  const [incorretUser, setIncorrectUser] = useState(false);
  const history = useHistory();
  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ height: "100vh" }}
    >
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validate={(values) => {
          let errors = {};

          if (!values.email) {
            errors.email = "Please enter a valid email";
          } else if (
            !/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(
              values.email
            )
          ) {
            errors.email = "Please enter a valid email";
          }

          if (!values.password) {
            errors.password = "Please enter a valid password";
          }

          return errors;
        }}
        onSubmit={async (values, { resetForm }) => {
          if ((await passAndEmail(values)) !== 401) {
            history.push("/home");
          } else {
            setIncorrectUser(true);
          }
        }}
      >
        {({ errors, handleSubmit, handleChange, handleBlur }) => (
          <Form
            className="w-50 square border border-2 p-3"
            onSubmit={handleSubmit}
          >
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                name="email"
                placeholder="Enter email"
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <ErrorMessage
                name="email"
                component={() => (
                  <div
                    className="error text-danger mt-2"
                    style={{ fontSize: 13 }}
                  >
                    {errors.email}
                  </div>
                )}
              />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                placeholder="Password"
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <ErrorMessage
                name="password"
                component={() => (
                  <div
                    className="error text-danger mt-2"
                    style={{ fontSize: 13 }}
                  >
                    {errors.password}
                  </div>
                )}
              />
            </Form.Group>
            {!incorretUser ? (
              <div></div>
            ) : (
              <p className="error text-danger mt-2" style={{ fontSize: 13 }}>
                User or password incorrect
              </p>
            )}
            <div className="text-center">
              <Button variant="primary" type="submit">
                Signin
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};
