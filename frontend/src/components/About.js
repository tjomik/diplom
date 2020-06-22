import React from "react";
import {Col, Row, Image} from "react-bootstrap";
import BMSTU from "../images/bmstu_logo.png";
import AutoRu from "../images/auto_ru_logo";


function About(props) {
    return (
        <Row className='my-2'>
            <Col>
                <Row className={'my-4'}>
                    <Col md={2}>
                        <Image alt='bmstu' src={BMSTU} style={{width: '100%'}}/>
                    </Col>
                    <Col>
                        <h5>Тема: Рекомендательная система по выбору автомобиля.</h5>
                        <h5>Автор: студент МГТУ им. Н.Э. Баумана группы ИУ5И-83Б Кареникс Артёмс.</h5>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <h5>Данные, использующиеся в проекте были собраны автоматизированным путем на сайте auto.ru,
                            предварительно получив согласие представителями портала.</h5>

                    </Col>
                    <Col md={2}>
                        <Image alt='auto.ru' src={AutoRu} style={{width: '100%'}}/>
                    </Col>
                </Row>
            </Col>
        </Row>
    );
}

export default About;
