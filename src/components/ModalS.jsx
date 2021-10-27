import { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { Formik } from "formik";
import { getMethod } from "../services/index";

export const ModalS = ({
  show,
  onHide,
  onFetchResult,
  goodCharacter,
  badCharacter,
}) => {
  const [isLoad, setIsLoad] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const [goodTeamFull, setGoodTeamFull] = useState(false);
  const [badTeamFull, setBadTeamFull] = useState(false);

  //if not load and not notfound OK, else load and notFound not OK
  const buttonClose = ({ isLoad, notFound, goodTeamFull, badTeamFull }) => {
    if (isLoad && !notFound && !goodTeamFull && !badTeamFull) {
      return (
        <Button
          variant="primary"
          onClick={() => {
            onHide();
            setIsLoad(false);
          }}
        >
          Close
        </Button>
      );
    } else if (isLoad && notFound) {
      return <p>Name not Found</p>;
    } else if (isLoad && goodTeamFull) {
      return <p>The good team is full</p>;
    } else if (isLoad && badTeamFull) {
      return <p>The bad team is full</p>;
    }
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Holis</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik
          initialValues={{
            name: "",
          }}
          validate={(values) => {
            let errors = {};

            if (!values.name) {
              errors.name = "Please enter a valid name";
            }

            return errors;
          }}
          onSubmit={({ name }) => {
            getMethod(name).then((response) => {
              try {
                setNotFound(false);
                setGoodTeamFull(false);
                setBadTeamFull(false);
                if (
                  goodCharacter <= 2 &&
                  response.data.response === "success" &&
                  response.data.results[0].biography.alignment === "good"
                ) {
                  onFetchResult(response);
                } else if (
                  badCharacter <= 2 &&
                  response.data.response === "success" &&
                  response.data.results[0].biography.alignment === "bad"
                ) {
                  onFetchResult(response);
                } else if (response.data.response === "error") {
                  console.log(response);
                  setNotFound(true);
                } else if (goodCharacter === 3) {
                  setGoodTeamFull(true);
                } else if (badCharacter === 3) {
                  setBadTeamFull(true);
                }
                setIsLoad(true);
              } catch (e) {
                console.log(e);
              }
            });
          }}
        >
          {({
            values,
            touched,
            errors,
            handleSubmit,
            handleChange,
            handleBlur,
          }) => (
            <Form
              className=" square border border-2 p-3"
              onSubmit={handleSubmit}
            >
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Enter name of character</Form.Label>
                <Form.Control
                  type="name"
                  name="name"
                  placeholder="name"
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {touched.name && errors.name && (
                  <div
                    className="error text-danger mt-2"
                    style={{ fontSize: 13 }}
                  >
                    {errors.name}
                  </div>
                )}
              </Form.Group>
              <div className="text-center">
                <Button variant="primary" type="submit">
                  Search
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </Modal.Body>
      <Modal.Footer>
        {buttonClose({ isLoad, notFound, goodTeamFull, badTeamFull })}
      </Modal.Footer>
    </Modal>
  );
};
