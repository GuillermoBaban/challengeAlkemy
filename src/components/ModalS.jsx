import { Button, Modal, Form, Spinner } from "react-bootstrap";
import { Formik } from "formik";
import { fetchCharacters } from "../store/slices/characters";
import { useSelector, useDispatch } from "react-redux";

export const ModalS = ({ show, onHide, cardId }) => {
  const {
    rootReducer: { character },
  } = useSelector((state) => state);

  const {
    rootReducer: { spinner },
  } = useSelector((state) => state);

  const {
    rootReducer: { error },
  } = useSelector((state) => state);

  let fullGoodCharacter = false;

  let fullBadCharacter = false;

  const goodCharacters = character.filter(
    (character) => character.alignment === "good" && character.value !== ""
  );

  const badCharacters = character.filter(
    (character) => character.alignment === "bad" && character.value !== ""
  );

  const dispatch = useDispatch();

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton></Modal.Header>
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
            if (goodCharacters.length === 3) {
              fullGoodCharacter = true;
            } else if (badCharacters.length === 3) {
              fullBadCharacter = true;
            }
            // dispatch(
            //   fetchCharacters(name, cardId, fullGoodCharacter, fullBadCharacter)
            // );
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
                <div className="mb-3">
                  {spinner ? <Spinner animation="border" /> : <p></p>}
                </div>
                <Button variant="primary" type="submit" className="mb-3">
                  Search
                </Button>
                {error !== "" ? <p>{error}</p> : <p></p>}
                {goodCharacters.length === 3 ? (
                  <p>Team good is full</p>
                ) : (
                  <p>Good team: {goodCharacters.length}</p>
                )}
                {badCharacters.length === 3 ? (
                  <p>Team bad is full</p>
                ) : (
                  <p>Bad team:{badCharacters.length}</p>
                )}
              </div>
              <div className="text-center mt-3"></div>
            </Form>
          )}
        </Formik>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="primary"
          onClick={() => {
            onHide();
          }}
        >
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
