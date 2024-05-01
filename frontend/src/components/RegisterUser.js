import React, { useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const RegisterUser = () => {
  const navigate = useNavigate();
  const [Name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userRole, setUserRole] = useState("");
  const [profilePic, setProfilePic] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("Name", Name);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("userRole", userRole);
    formData.append("profilePic", profilePic);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/register/user",
        formData,
        {
          withCredentials: true,
        }
      );

      if (response.data.message === "success") {
        setName("");
        setEmail("");
        setPassword("");
        setUserRole("");
        setProfilePic("");
        navigate("/login");
      } else if (response.data.message === "email_exists") {
        console.error("Email already exists");
      } else {
        console.error("Error:", response.data.message);
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const MAX_FILE_SIZE_MB = 1;
  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    console.log(file);
    if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
      console.error(`File size should be less than ${MAX_FILE_SIZE_MB}MB`);
      return;
    } else if (!file.type.includes("image")) {
      console.error(`File should be of Image type only`);
    } else {
      setProfilePic(file);
    }
  };

  return (
    <Container className="vh-100 d-flex justify-content-center align-items-center">
      <Row className="justify-content-center">
        <Col md={6}>
          <div className="p-4 shadow rounded bg-light">
            <h3 className="text-center mb-4">Sign Up</h3>
            <Form onSubmit={handleFormSubmit}>
              <Form.Group controlId="Name" className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  value={Name}
                  placeholder="Enter your name"
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group controlId="email" className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  value={email}
                  placeholder="Enter your email"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group controlId="password" className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  value={password}
                  placeholder="Enter your password"
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group controlId="userRole" className="mb-3">
                <Form.Label>User Role</Form.Label>
                <Form.Control
                  as="select"
                  value={userRole}
                  onChange={(e) => setUserRole(e.target.value)}
                  required
                >
                  <option value="">Select your role</option>
                  <option value="assigner">Assigner</option>
                  <option value="assignee">Assignee</option>
                </Form.Control>
              </Form.Group>

              <Form.Group controlId="profilePic" className="mb-3">
                <Form.Label>Profile Picture</Form.Label>
                <Form.Control
                  type="file"
                  accept="image/*"
                  onChange={handleProfilePicChange}
                  required
                />
              </Form.Group>

              <Button
                variant="primary"
                type="submit"
                className="w-100"
                disabled={loading}
              >
                {loading ? "Registering..." : "Register"}
              </Button>
            </Form>
            <p className="text-center mt-3">
              Already have an account?{" "}
              <span className="text-primary" onClick={() => navigate("/login")}>
                Login
              </span>
            </p>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default RegisterUser;
