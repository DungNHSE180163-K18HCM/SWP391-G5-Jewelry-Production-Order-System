import axios from "axios";
import React, { useState } from "react";
import { Container, Form, Button, Row, Col, Alert } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import ServerUrl from "../reusable/ServerUrl";
import { RiArrowLeftLine } from "react-icons/ri";

export default function Information() {
  const [validated, setValidated] = useState(false);
  const [dobError, setDobError] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [birthDate, setBirthDate] = useState();
  const [gender, setGender] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    const form = e.currentTarget;
    e.preventDefault();

    const formValid = form.checkValidity();
    const dobValid = validateDob(form.elements.dob.value);

    if (!formValid || !dobValid) {
      e.stopPropagation();
    } else {
      const email = localStorage.getItem("email");

      axios({
        method: "POST",
        url: `${ServerUrl}/api/registration/user-info`,
        headers: {
          "Content-Type": "application/json",
          key: email,
        },
        data: { firstName, lastName, birthDate, gender, phoneNumber, address },
      })
        .then((response) => {
          if (response.status === 200) {
            localStorage.removeItem("purpose");
            localStorage.removeItem("email");
            navigate("/login");
          } else if (response.status === 400) {
            throw new Error(response.message);
          }
        })
        .catch((error) => {
          alert(error);
          console.log("There is an error: " + error);
        });
    }

    setValidated(true);
  };

  const validateDob = (dob) => {
    const dobDate = new Date(dob);
    const today = new Date();
    const age = today.getFullYear() - dobDate.getFullYear();
    const monthDifference = today.getMonth() - dobDate.getMonth();
    const dayDifference = today.getDate() - dobDate.getDate();

    if (
      age > 18 ||
      (age === 18 && monthDifference > 0) ||
      (age === 18 && monthDifference === 0 && dayDifference >= 0)
    ) {
      setDobError("");
      return true;
    } else {
      setDobError("You must be at least 18 years old.");
      return false;
    }
  };

  return (
    <Container
      style={{ height: "90vh" }}
      className="d-flex justify-content-center align-items-center"
    >
      <div
        className="position-relative p-4 rounded-4"
        style={{
          width: "35%",
          backgroundColor: "rgba(217, 217, 217, 0.7)",
        }}
      >
        <Link
          to="/login"
          className="position-absolute"
          style={{ top: "5%" }}
        >
          <RiArrowLeftLine size={30} color="black" />
        </Link>
        <h2 className="text-center mb-4">Information</h2>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Row className="mb-3">
            <Col>
              <Form.Group>
                <Form.Label>First Name:</Form.Label>
                <Form.Control
                  required
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  name="firstName"
                  placeholder="First Name"
                />
                <Form.Control.Feedback type="invalid">
                  Please provide a first name.
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group>
                <Form.Label>Last Name:</Form.Label>
                <Form.Control
                  required
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  name="lastName"
                  placeholder="Last Name"
                />
                <Form.Control.Feedback type="invalid">
                  Please provide a last name.
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>
          <Form.Group className="mb-3">
            <Form.Label>Date of birth:</Form.Label>
            <Form.Control
              required
              type="date"
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
              name="dob"
            />
            <Form.Control.Feedback type="invalid">
              Please provide a date of birth.
            </Form.Control.Feedback>
            {dobError && (
              <Alert variant="danger" className="mt-2">
                {dobError}
              </Alert>
            )}
          </Form.Group>
          <Form.Group className="d-flex">
            <Form.Label className="mt-1">Gender:</Form.Label>
            <div className="d-flex align-items-center ms-3">
              <Form.Check
                required
                type="radio"
                label="Male"
                name="gender"
                value="MALE"
                onChange={(e) => setGender("MALE")}
                className="me-3"
              />
              <Form.Check
                required
                type="radio"
                label="Female"
                name="gender"
                value="FEMALE"
                onChange={(e) => setGender("FEMALE")}
              />
            </div>
            <Form.Control.Feedback type="invalid" className="ms-3">
              Please select a gender.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3 mt-3">
            <Form.Label>Phone:</Form.Label>
            <Form.Control
              required
              type="tel"
              pattern="[0-9]{10}"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="Phone"
            />
            <Form.Control.Feedback type="invalid">
              Please provide a valid phone number (10 digits).
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-4">
            <Form.Label>Address:</Form.Label>
            <Form.Control
              required
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Address"
            />
            <Form.Control.Feedback type="invalid">
              Please provide an address.
            </Form.Control.Feedback>
          </Form.Group>
          <div className="d-flex justify-content-center">
            <Button type="submit" className="w-100">
              Submit
            </Button>
          </div>
        </Form>
      </div>
    </Container>
  );
}
