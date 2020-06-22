import React, {useState} from "react";
import {Button, Col, Form, Row} from "react-bootstrap";
import store, {actions} from "../globals/store";
import {makeGuestRequest} from "../globals/api";

function AccountSettings() {
    const [credentials, setCredentials] = useState({oldPassword: '', newPassword: '', newPasswordConfirmation: ''});
    const [showSuccessfulMessage, setShowSuccessfulMessage] = useState(false);

    const inputValue = (event) => {
        setCredentials({...credentials, [event.target.name]: event.target.value})
    };

    const changePassword = async () => {
        setShowSuccessfulMessage(false);
        if(credentials.newPassword.length < 6)
            store.dispatch(actions.showErrorAction('Новый пароль не может быть меньше 6 символов'))
        else if(credentials.newPassword !== credentials.newPasswordConfirmation)
            store.dispatch(actions.showErrorAction('Проверьте введенные данные'))
        else{
            try{
                const response = await makeGuestRequest('change_password',
                    {
                        method: 'POST',
                        data: {old_password: credentials.oldPassword, new_password: credentials.newPassword}
                    })
                if(response.data.message === 'Введен неправильный пароль') store.dispatch(actions.showErrorAction(response.data.message))
                else if(response.data.message === 'Новый пароль успешно установлен') {
                    setShowSuccessfulMessage(true);
                    setCredentials({oldPassword: '', newPassword: '', newPasswordConfirmation: ''})
                }

            }
            catch (e) {
                store.dispatch(actions.showErrorAction('Сервер не отвечает'))
            }
        }
    }

    return (
        <>
            <Row className='justify-content-center'>
                <Col xs={12} sm={8} md={6} lg={5} xl={4} className='text-center border rounded'>
                    <h1 className='mb-3'>Поменять пароль</h1>
                    <Form>
                        <Form.Control className='mb-2' placeholder='Текущий пароль' type='password' name='oldPassword' value={credentials.oldPassword} onChange={inputValue}/>
                        <Form.Control className='mb-2' placeholder='Новый пароль' type='password' name='newPassword' value={credentials.newPassword} onChange={inputValue}/>
                        <Form.Control className='mb-2' placeholder='Повторите новый пароль' type='password' name='newPasswordConfirmation' value={credentials.newPasswordConfirmation} onChange={inputValue}/>
                        {showSuccessfulMessage ? <div><small className={'text-success'}>Пароль успешно изменен</small></div> : null}
                        <Button className='mb-2' onClick={changePassword}>Поменять пароль</Button>
                    </Form>
                </Col>
            </Row>
        </>
    );
}

export default AccountSettings;
