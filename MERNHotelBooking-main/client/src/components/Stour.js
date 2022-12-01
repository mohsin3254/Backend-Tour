import React, { useState, useEffect } from "react";
import { Modal, Button, Carousel } from "react-bootstrap";
import { BrowserRouter, Route, Link } from "react-router-dom";

function Stour({ stour }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div className="row bs">
      <div className="col-md-4">
        <img src={stour.imageurls[0]} className="smallimg" alt="" />
      </div>
      <div className="col-md-7">
        <h1>{stour.name}</h1>
        <b>
          <p>Phone Number : {stour.phonenumber}</p>
        </b>

        <div style={{ float: "right" }}>
          {
            <Link to={`/bookstour/${stour._id}`}>
              <button className="btn btn-primary m-2">Book Now</button>
            </Link>
          }

          <button className="btn btn-primary" onClick={handleShow}>
            View Detail
          </button>
        </div>
      </div>

      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header>
          <Modal.Title>{stour.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Carousel prevLabel="" nextLabel="">
            {stour.imageurls.map((url) => {
              return (
                <Carousel.Item>
                  <img
                    className="d-block w-100 bigimg"
                    src={url}
                    alt="First slide"
                  />
                </Carousel.Item>
              );
            })}
          </Carousel>
          <p>{stour.description}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Stour;
