import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./facilities.css"; // Import custom CSS

import libraryImage from "../categories/library.png";
import sn101Image from "../categories/sn101.jpg";
import rj101Image from "../categories/rj101.jpg";
import sn201Image from "../categories/sn201.jpg";
import nb301Image from "../categories/nb301.png";
import sv101Image from "../categories/sv101.jpg";

const facilities = [
  {
    name: "Central Library",
    image: libraryImage,  
    location: "SN block ground floor",
    capacity: 300,
    inCharge: "lib@rmkec.ac.in",
  },
  {
    name: "SN 101",
    image: sn101Image,
    location: "SN block 1st floor",
    capacity: 70,
    inCharge: "sn@rmkec.ac.in",
  },
  {
    name: "RJ 101",
    image: rj101Image,
    location: "RJ block 1st floor",
    capacity: 250,
    inCharge: "rj@rmkec.ac.in",
  },
  {
    name: "NB 301",
    image: nb301Image,
    location: "New block 3rd floor",
    capacity: 250,
    inCharge: "nb@rmkec.ac.in",
  },
  {
    name: "SN 201",
    image: sn201Image,
    location: "SN block 2nd floor",
    capacity: 80,
    inCharge: "sn@rmkec.ac.in",
  },
  {
    name: "SV 101",
    image: sv101Image,
    location: "SV block 1st floor",
    capacity: 60,
    inCharge: "sv@rmkec.ac.in",
  },
];

const RoomCard = ({ room }) => {
  const navigate = useNavigate();

  const handleBook = () => {
    navigate("/booking-confirmation", { state: { room } });
  };

  return (
    <Card className="facility-card">
      <Card.Img variant="top" src={room.image} alt={room.name} className="facility-image" />
      <Card.Body>
        <Card.Title className="facility-title">{room.name}</Card.Title>
        <Card.Text className="facility-details">
          <strong>Located:</strong> {room.location} <br />
          <strong>Capacity:</strong> {room.capacity} <br />
          <strong>Person Incharge:</strong> {room.inCharge}
        </Card.Text>
        <Button className="book-btn" onClick={handleBook}>Book</Button>
      </Card.Body>
    </Card>
  );
};

const RoomsPage = () => {
  return (
    <div className="facilities-container">
      <Container className="mt-4">
        <h2 className="title">AVAILABLE SEMINAR HALLS</h2>
        <Row>
          {facilities.map((room, index) => (
            <Col key={index} md={4} sm={6} xs={12}>
              <RoomCard room={room} />
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default RoomsPage;