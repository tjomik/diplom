import LoadingAnimation from '../images/loading.gif'
import React from "react";
import {Image, Row} from "react-bootstrap";
import Col from "react-bootstrap/esm/Col";

function Loading() {
    return <Row><Col className={'text-center'}><Image alt='Загрузка' src={LoadingAnimation} className='loader'/></Col></Row>
}

export default Loading