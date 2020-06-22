import React, {useEffect, useState} from "react";
import {Col, Form, Row} from "react-bootstrap";
import {makeRequest} from "../globals/api";
import CatalogCard from "./CatalogCard";
import InfiniteScroll from 'react-infinite-scroller';
import Loading from "./Loading";


function Catalog() {
    const [car, setCar] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [nextPage, setNextPage] = useState('?limit=15&offset=0')
    const [hasMore, setHasMore] = useState(true)
    const [searchFlag, setSearchFlag] = useState(false)
    const [searchText, setSearchText] = useState('')

    const searchOnChange = async (event) => {
        setSearchText(event.currentTarget.value)
        if (event.currentTarget.value.length === 0 && searchFlag){
            setSearchFlag(false);
            setNextPage('?limit=15&offset=0')
            setHasMore(true)
            setIsLoading(true)
            //await fetchData()
        }
        else if(event.currentTarget.value.length > 2) {
            setSearchFlag(true);
            setNextPage('?limit=15&offset=0')
            setHasMore(true)
            setIsLoading(true)
            //await fetchData()
        }
    }
    async function fetchData() {
        try {
            let response = {}
            if (nextPage === '?limit=15&offset=0') setCar([])
            if(searchFlag === true) {response = await makeRequest('search/'+searchText+nextPage, {method: 'GET'});}
            else {response = await makeRequest('cars'+nextPage, {method: 'GET'});}

            setCar(car => car.concat(response.data.results));
            if(response.data.next == null) setHasMore(false);
            else {
                setNextPage(response.data.next.slice(response.data.next.search('\\?')))
            }
            setIsLoading(false);

        } catch (e) {
            console.log(e.message)
        }
    }
    useEffect(()=>{
       async function f() {
            await fetchData();
       }
       f();
    }, [isLoading])


    return (
        <>
            <Form.Control onChange={searchOnChange} placeholder={'Поиск'} />

            {isLoading ? <Loading/> :
            <>
        <InfiniteScroll
            pageStart={0}
            hasMore={hasMore}
            loadMore={fetchData}
            loader={<Loading/>}
        >
            <Row>
                {car.map((value) =>
                <Col sm={12} md={6} lg={4}>
                    <CatalogCard
                        brand={value.generation.model.make.make_name}
                        model={value.generation.model.model_name}
                        generation={value.generation.generation_name}
                        config={value.car_body.type}
                        image={value.image}
                        id={value.id}
                    />
                </Col>
                )}
            </Row>
        </InfiniteScroll>
                </>

        }</>
    );
}

export default Catalog;
