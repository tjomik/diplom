import React from "react";
import {Card, Col, Row} from "react-bootstrap";
import {Link} from "react-router-dom";


function CatalogCard(props) {
    return (
        <Link to={'/catalog/'+props.id}>
            <Row className='my-2'>
                <Col>
                    <Card className={'border-dark'}>
                        <Card.Img alt='car' src={'http://127.0.0.1:8000/static/cars/' + props.image}/>
                        <Card.Body>
                            <Card.Title>{props.brand} {props.model}</Card.Title>
                            <Card.Text>{props.generation}</Card.Text>
                            <Card.Text>{props.config}</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Link>
    );
}

export default CatalogCard;
