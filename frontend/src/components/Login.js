import React, { useState } from 'react';
import axios from 'axios';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:5000/api/users/login', { email, password });

            if (response.status === 200) {
                const token = response.data.token;
                localStorage.setItem('accessToken', token);
                navigate('/BystatusTasks');
            } else {
                setError('Login failed. Please try again.');
                console.error('Login failed:', response.data.message);
            }
        } catch (error) {
            console.error('An error occurred during login:', error);
            setError('An error occurred during login. Please try again later.');
        }
    };

    return (
        <Container fluid className="d-flex justify-content-center align-items-center vh-100 bg-primary">
            <div className="login-form p-5 rounded shadow bg-white text-dark" style={{ width: '400px', maxWidth: '90%', border: 'none' }}>
                <h3 className="text-center mb-4">Welcome Back!</h3>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="formUsername" className="mb-3">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group controlId="formPassword" className="mb-3">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </Form.Group>

                    <Button variant="dark" type="submit" className="w-100 mb-3">
                        Login
                    </Button>

                    <Button variant="outline-dark" className="w-100" onClick={() => navigate('/register')}>
                        Sign Up
                    </Button>
                </Form>
                {error && <Alert variant="danger" className="mt-3">{error}</Alert>}
            </div>
        </Container>
    );
};

export default Login;
