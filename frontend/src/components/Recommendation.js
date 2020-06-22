import React from "react";
import {Col} from "react-bootstrap";
import CatalogCard from "./CatalogCard";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";



function Recommendation(props) {
    return (
        <Col>
            <Slider
                accessibility={true}
                infinite={true}
                dots={true}
                speed={500}
                slidesToShow={4}
                slidesToScroll={1}
            >
                {props.recommendations.map(car  =>
                    <CatalogCard
                        brand={car.make}
                        model={car.model}
                        generation={car.generation}
                        config={car.car_body}
                        image={car.image}
                        id={car.id}
                    />
                )}
            </Slider>
        </Col>
    );
}

export default Recommendation;

