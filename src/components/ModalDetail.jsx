import { Modal, Button, ListGroup } from "react-bootstrap";
import { v4 as uuid_v4 } from "uuid";

export const ModalDetail = ({ show, onHide, value }) => {
  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Modal heading</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ListGroup>
          <ListGroup.Item>Weight: {value.appearance.weight[1]}</ListGroup.Item>
          <ListGroup.Item>Height: {value.appearance.height[1]}</ListGroup.Item>
          <ListGroup.Item>Name: {value.name}</ListGroup.Item>
          <ListGroup.Item>
            <p>Aliases :</p>
            {value.biography.aliases.map((powers) =>
              powers === "-" ? (
                "No aliases"
              ) : (
                <ul key={uuid_v4()}>
                  <li key={uuid_v4()}>{powers}</li>
                </ul>
              )
            )}
          </ListGroup.Item>
          <ListGroup.Item>
            Eye Color: {value.appearance["eye-color"]}
          </ListGroup.Item>
          <ListGroup.Item>
            Hair Color: {value.appearance["hair-color"]}
          </ListGroup.Item>
          <ListGroup.Item>Workplace: {value.work.base}</ListGroup.Item>
        </ListGroup>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
