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
          <ListGroup.Item>
            Weight: {value.data.results[0].appearance.weight[1]}
          </ListGroup.Item>
          <ListGroup.Item>
            Height: {value.data.results[0].appearance.height[1]}
          </ListGroup.Item>
          <ListGroup.Item>Name: {value.data.results[0].name}</ListGroup.Item>
          <ListGroup.Item>
            <p>Aliases :</p>
            {value.data.results[0].biography.aliases.map((powers) =>
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
            Eye Color: {value.data.results[0].appearance["eye-color"]}
          </ListGroup.Item>
          <ListGroup.Item>
            Hair Color: {value.data.results[0].appearance["hair-color"]}
          </ListGroup.Item>
          <ListGroup.Item>
            Workplace: {value.data.results[0].work.base}
          </ListGroup.Item>
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
