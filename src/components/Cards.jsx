import { useState } from "react";
import { Button, Card, Col, ListGroup, Badge, Modal } from "react-bootstrap";
import { ModalS } from "./ModalS";
import { ModalDetail } from "./ModalDetail";
import { v4 as uuid_v4 } from "uuid";

export const Cards = ({ value, sumPower, onDelete, cardId }) => {
  const [show, setShow] = useState(false);
  const [showDetail, setShowDetail] = useState(false);
  const handleShow = () => setShow(true);
  const handleDetail = () => setShowDetail(true);
  return (
    <>
      {value ? (
        <>
          <Col>
            <Card border="secondary">
              <Card.Body className="text-center">
                <Card.Img variant="top" src={value.image.url} />
                <Card.Title className="mt-2 text-center">
                  {value.name}
                </Card.Title>
                <div>
                  {Object.entries(value.powerstats).map(([key, powers]) => (
                    <ListGroup key={uuid_v4()}>
                      <ListGroup.Item className="d-flex justify-content-between align-items-start">
                        <div className="ms-2 me-auto">
                          <div className="fw-bold">{key}</div>
                        </div>
                        <Badge bg="secondary" pill>
                          {powers !== "null" ? powers : "unknow"}
                        </Badge>
                      </ListGroup.Item>
                    </ListGroup>
                  ))}
                </div>
                <div className="d-flex justify-content-evenly">
                  <Button className="mt-3" variant="primary" onClick={onDelete}>
                    Delete
                  </Button>
                  <Button className="mt-3" onClick={handleDetail}>
                    Details
                  </Button>
                </div>
              </Card.Body>
              <Modal.Footer className="d-block text-center">
                <span>PowerStats Total:</span>
                <span>{sumPower}</span>
              </Modal.Footer>
            </Card>
          </Col>
          <ModalS show={show} onHide={() => setShow(false)} cardId={cardId} />
          <ModalDetail
            show={showDetail}
            onHide={() => setShowDetail(false)}
            value={value}
          />
        </>
      ) : (
        <>
          <Col>
            <Card border="secondary">
              <Card.Body className="d-flex justify-content-center">
                <Button variant="primary" onClick={handleShow}>
                  Add Character
                </Button>
              </Card.Body>
            </Card>
          </Col>
          <ModalS show={show} onHide={() => setShow(false)} cardId={cardId} />
        </>
      )}
    </>
  );
};
