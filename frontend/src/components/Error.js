import React from 'react';
import {Button, Modal} from 'react-bootstrap';
import {connect} from 'react-redux';
import store, {actions} from "../globals/store";

function Error(props) {
    const handleClose = () => {
            store.dispatch(actions.hideErrorAction());
    };

        return (
            <Modal show={props.showError} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Ошибка</Modal.Title>
                </Modal.Header>
                <Modal.Body>{props.errorMessage}</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Закрыть
                    </Button>
                </Modal.Footer>
            </Modal>
        )
}
function mapStateToProps(state) {
    return {
        showError: state.showError,
        errorMessage: state.errorMessage,
    };
}
export default connect(mapStateToProps)(Error);
