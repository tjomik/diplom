import React, {useState} from "react";
import {Button, Col, Form, Row} from "react-bootstrap";
import {Link} from "react-router-dom";
import store, {actions} from "../globals/store";
import {makeGuestRequest} from "../globals/api";
import {Authorize} from "../globals/auth";

function Registration() {
    const [credentials, setCredentials] = useState({username: '', password: '', passwordConfirmation: ''});

    const inputValue = (event) => {
        setCredentials({...credentials, [event.target.name]: event.target.value})
    };

    const signUp = async () => {
        if(credentials.password.length < 6 || credentials.username.length < 6)
            store.dispatch(actions.showErrorAction('Имя пользователя и пароль не могут быть меньше 6 символов'))
        else if(credentials.password !== credentials.passwordConfirmation)
            store.dispatch(actions.showErrorAction('Проверьте введенные данные'))
        else{
            try{
                const response = await makeGuestRequest('sign_up',
                    {
                        method: 'POST',
                        data: {username: credentials.username, password: credentials.password}
                    })
                if(response.data.message === 'Успешно создан') await Authorize(credentials.username, credentials.password)
                else store.dispatch(actions.showErrorAction(response.data.message))

            }
            catch (e) {
                store.dispatch(actions.showErrorAction('Сервер не отвечает'))
            }

        }

    }

    return (
        <>
            <Row className='justify-content-center'>
                <Col xs={12} sm={6} md={5} lg={4} xl={3} className='text-center border rounded'>
                    <h1 className='mb-3'>Регистрация</h1>
                    <Form>
                        <Form.Control className='mb-2' placeholder='Имя пользователя' name='username' value={credentials.username} onChange={inputValue}/>
                        <Form.Control className='mb-2' placeholder='Пароль' type='password' name='password' value={credentials.password} onChange={inputValue}/>
                        <Form.Control className='mb-2' placeholder='Повторите пароль' type='password' name='passwordConfirmation' value={credentials.passwordConfirmation} onChange={inputValue}/>
                        <Button className='mb-2' onClick={signUp}>Зарегистрироваться</Button>
                        <p><small><Link to='/authorization'>Уже с нами? <br/>Войти</Link></small></p>
                    </Form>
                </Col>
            </Row>
        </>
    );
}

export default Registration;
