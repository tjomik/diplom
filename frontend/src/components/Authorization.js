import React, {useState} from "react";
import {Button, Col, Form, Row} from "react-bootstrap";
import {Link} from "react-router-dom";
import {Authorize} from "../globals/auth";

function Authorization() {
    const [credentials, setCredentials] = useState({username: '', password: ''});


    const inputValue = (event) => {
        setCredentials({...credentials, [event.target.name]: event.target.value})
    };

    return (
        <>
            <Row className='justify-content-center'>
                <Col xs={12} sm={6} md={5} lg={4} xl={3} className='text-center border rounded'>
                    <h1 className='mb-3'>Авторизация</h1>
                    <Form>
                        <Form.Control className='mb-2' placeholder='Логин' name='username' value={credentials.username} onChange={inputValue}/>
                        <Form.Control className='mb-2' placeholder='Пароль' type='password' name='password' value={credentials.password} onChange={inputValue}/>
                        <Button className='mb-2' onClick={() => Authorize(credentials.username, credentials.password)}>Войти</Button>
                        <p><small><Link to='/registration'>Еще нет аккаунта? <br/>Зарегистрироваться</Link></small></p>
                    </Form>
                </Col>
            </Row>
        </>
    );
}

export default Authorization;
