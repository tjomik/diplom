import React, {useEffect, useState} from "react";
import {Col, Row} from "react-bootstrap";
import CatalogCard from "./CatalogCard";
import {makeRequest} from "../globals/api";
import Loading from "./Loading";



function UsersRatings(props) {
    const [isLoading, setIsLoading] = useState(true);
    const [ratings, setRatings] = useState([]);

    async function fetchData() {
        try {
            const response = await makeRequest('user_ratings', {method: 'GET'})
            setRatings(response.data)
        } catch (e) {
            console.log(e.message)
        }
    }
    useEffect(()=>{
        async function f() {
            await fetchData();
            setIsLoading(false);
        }
        f();
    }, [])

    return (
        <>
            {isLoading ? <Loading/> :
                <>
                {
                    Object.entries(ratings).length ?
                        <Row>
                            {Object.entries(ratings).map(([id, car], key) =>
                                <Col sm={12} md={6} lg={4}>
                                <CatalogCard
                                    brand={car.make}
                                    model={car.model}
                                    generation={car.generation}
                                    config={car.car_body}
                                    image={car.image}
                                    id={car.id}
                                />
                                </Col>
                            )}
                        </Row> : <h1>К сожалению, вы еще ничего не оценили</h1>
                }
                </>
            }
        </>
    );
}

export default UsersRatings;

