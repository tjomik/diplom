import Rating from "react-rating";
import React from "react";
import {makeRequest} from "../globals/api";



function RatingWrap(props) {
    const rate = async (value) => {
        const response = await makeRequest('set_rating' , {method: 'POST', data: {id: props.carId, value: value}});
        console.log(response)
    }
    return (
        <Rating
            initialRating={props.initialRating}
            emptySymbol={props.emptySymbol}
            fullSymbol={props.fullSymbol}
            className={props.className}
            onChange={(value) => {rate(value)}}
        />
    );
}

export default RatingWrap;

