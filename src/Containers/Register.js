import React, { useState } from "react";
import {Button, FormGroup, Label, Input, Col, Row, ButtonGroup} from "reactstrap";

export default function Register(props) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [userType, setUserType] = useState("guest");

    function validateForm() {
        return username.length > 0 && password.length > 0;
    }

    function handleSubmit(e) {
        e.preventDefault();
        fetch('http://localhost:3000/register', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username,
                password,
                userType
            }),
            credentials: "include"
        })
            .then(r => {
                if(r.status === 500) {
                    alert('Invalid username or password');
                }
                else if(r.status === 200) {
                    props.history.push('/projects');
                }
            })
            .catch(err => console.log(err));
    }

    return (
        <Row>
            <Col lg={{ size: 6, offset: 3 }}>
                <div className="Login">
                    <form onSubmit={handleSubmit}>
                        <FormGroup>
                            <Label>Username</Label>
                            <Input
                                autoFocus
                                value={username}
                                onChange={e => setUsername(e.target.value)}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label>Password</Label>
                            <Input
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                type="password"
                            />
                        </FormGroup>
                        <FormGroup>
                            <ButtonGroup>
                                <Button color="primary" onClick={() => setUserType("guest")} active={userType === "guest"}>Guest</Button>
                                <Button color="primary" onClick={() => setUserType("admin")} active={userType === "admin"}>Admin</Button>
                            </ButtonGroup>
                        </FormGroup>
                        <Button block disabled={!validateForm()} type="submit">
                            Register
                        </Button>
                    </form>
                </div>
            </Col>
        </Row>
    );
}