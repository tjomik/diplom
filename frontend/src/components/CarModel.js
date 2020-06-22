import React, {useEffect, useState} from "react";
import {Accordion, Card, Row, Image, Col} from "react-bootstrap";
import {makeRequest} from "../globals/api";
import Loading from "./Loading";
import {FaStar, FaRegStar} from "react-icons/fa";
import RatingWrap from "./RatingWrap";
import Recommendation from "./Recommendation";






function CarModel(props) {
    const [specs, setSpecs] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [ratings, setRatings] = useState({});
    const [prices, setPrices] = useState({});
    const [recommendations, setRecommendations] = useState({});

    useEffect(() => {
        async function f() {
            try {
                const cars = await makeRequest('car/' + props.match.params.id, {method: 'GET'})
                setSpecs(cars.data);
                setRatings(cars.data.ratings)
                setPrices(cars.data.prices)
                setRecommendations(cars.data.recommendations)
                setIsLoading(false);
                console.log(cars.data.recommendations)
                console.log(recommendations)
            } catch (e) {
                console.log(e.message)
            }
        }

        f();
    }, [])

    const toTop = (event) => {
        //event.currentTarget.nextSibling.scrollIntoView({block: "end", behavior: "smooth"})
    }


    return (
        <>
            {isLoading ? <Loading/> :
                <>
                    <Row className={'mb-2'}>
                        <Col md={8}>
                            <h2>{specs.make} {specs.model}</h2>
                            <Row><Col className='label'>Поколение</Col><Col
                                className='value'>{specs.generation}</Col></Row>
                            <Row><Col className='label'>Кузов</Col><Col className='value'>{specs.car_body}</Col></Row>
                            <Row><Col className='label'>Страна</Col><Col className='value'>{specs.country}</Col></Row>
                            <Row><Col className='label'>Класс</Col><Col className='value'>{specs.auto_class}</Col></Row>
                            <Row><Col className='label'>Кол-во дверей</Col><Col
                                className='value'>{specs.door_quantity}</Col></Row>
                            <Row><Col className='label'>Кол-во мест</Col><Col
                                className='value'>{specs.number_of_seats}</Col></Row>


                            <a href={specs.link} target='_blank'>Ссылка на auto.ru</a>

                        </Col>
                        <Col md={4}>
                            <Image src={'http://127.0.0.1:8000/static/cars/' + specs.image}
                                   style={{width: '100%', borderRadius: 10}}/>
                        </Col>
                    </Row>

                    <Accordion defaultActiveKey={0}>
                        {Object.entries(specs.modifications).map(([id, car], index) =>
                            <Card>
                                <Accordion.Toggle as={Card.Header} variant="link" eventKey={index} onClick={(event)=>toTop(event)}>
                                    {car['Двигатель']['Тип двигателя']} {car['Двигатель']['Объем двигателя, см³']}см³ {car['Двигатель']['Максимальная мощность, л.с./кВт при об/мин'].slice(0, car['Двигатель']['Максимальная мощность, л.с./кВт при об/мин'].search('/'))} л.с. {car['Трансмиссия']['Коробка передач']}
                                </Accordion.Toggle>

                                <Accordion.Collapse eventKey={index} >
                                    <Card.Body>
                                        <Row>
                                            <Col>
                                                <RatingWrap
                                                    carId={id}
                                                    initialRating={ratings[id] ? ratings[id] : 0}
                                                    emptySymbol={<FaRegStar size={25}/>}
                                                    fullSymbol={<FaStar size={25} style={{color: 'yellow'}}/>}
                                                    className={'float-right'}
                                                />
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col>
                                                {prices[id] ? <h4 className={'float-right'}>{prices[id] | 0} ₽ </h4> : null}

                                            </Col>
                                        </Row>

                                        <Row>
                                            <Col>

                                            {Object.entries(car).slice(0,4).map(([parameter_group, parameters], index) =>
                                                <Row>
                                                <Col>
                                                    <h3 className='mt-4 mb-2'>{parameter_group}</h3>
                                                    {Object.entries(parameters).map(([name, value], index) =>
                                                        <Row><Col className='label'>{name}</Col><Col
                                                            className='value'> {value}</Col></Row>
                                                    )}
                                                </Col>
                                                </Row>
                                            )
                                            }
                                            </Col>
                                            <Col>
                                            {Object.entries(car).slice(4, Object.entries(car).length).map(([parameter_group, parameters], index) =>
                                                <Row>
                                                <Col>
                                                    <h3 className='mt-4 mb-2'>{parameter_group}</h3>
                                                    {Object.entries(parameters).map(([name, value], index) =>
                                                        <Row><Col className='label'>{name}</Col><Col
                                                            className='value'> {value}</Col></Row>
                                                    )}
                                                </Col>
                                                </Row>
                                            )
                                            }
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col md={12}><h3>Рекомендации</h3></Col>
                                            <Recommendation recommendations={recommendations[id]}/>
                                        </Row>

                                        {/*
                                            <h3 className='mt-4 mb-2'>Размеры</h3>
                                            {car.length ? <Row><Col className='label'>Длина</Col><Col
                                                className='value'> {car.length}</Col></Row> : null}
                                            {car.width ? <Row><Col className='label'>Ширина</Col><Col
                                                className='value'> {car.width}</Col></Row> : null}
                                            {car.height ? <Row><Col className='label'>Высота</Col><Col
                                                className='value'> {car.height}</Col></Row> : null}
                                            {car.wheelbase ? <Row><Col className='label'>Колёсная база</Col><Col
                                                className='value'> {car.wheelbase}</Col></Row> : null}
                                            {car.clearance ? <Row><Col className='label'>Клиренс</Col><Col
                                                className='value'> {car.clearance}</Col></Row> : null}
                                            {car.front_track_width ?
                                                <Row><Col className='label'>Ширина передней колеи</Col><Col
                                                    className='value'> {car.front_track_width}</Col></Row> : null}
                                            {car.rear_track_width ?
                                                <Row><Col className='label'>Ширина задней колеи</Col><Col
                                                    className='value'> {car.rear_track_width}</Col></Row> : null}
                                            {car.wheel_size ? <Row><Col className='label'>Размер колёс</Col><Col
                                                className='value'> {car.wheel_size}</Col></Row> : null}

                                                <h3 className='mt-4 mb-2'>Трансмиссия</h3>
                                            {car.transmission?<Row><Col className='label'>Коробка передач</Col><Col className='value'> {car.transmission}</Col></Row>:null}
                                            {car.number_of_gears?<Row><Col className='label'>Количество передач</Col><Col className='value'> {car.number_of_gears}</Col></Row>:null}
                                            {car.type_of_drive?<Row><Col className='label'>Тип привода</Col><Col className='value'> {car.type_of_drive}</Col></Row>:null}

                                            <h3 className='mt-4 mb-2'>Объем и масса</h3>
                                            {car.boot_volume_min?<Row><Col className='label'>Объем багажника мин, л</Col><Col className='value'> {car.boot_volume_min}</Col></Row>:null}
                                            {car.boot_volume_max?<Row><Col className='label'>Объем багажника макс, л</Col><Col className='value'> {car.boot_volume_max}</Col></Row>:null}
                                            {car.trunk_volume?<Row><Col className='label'>Объём топливного бака, л</Col><Col className='value'> {car.trunk_volume}</Col></Row>:null}
                                            {car.curb_weight?<Row><Col className='label'>Снаряженная масса, кг</Col><Col className='value'> {car.curb_weight}</Col></Row>:null}
                                            {car.full_weight?<Row><Col className='label'>Полная масса, кг</Col><Col className='value'> {car.full_weight}</Col></Row>:null}

                                            <h3 className='mt-4 mb-2'>Подвеска и тормоза</h3>
                                            {car.front_suspension?<Row><Col className='label'>Тип передней подвески</Col><Col className='value'> {car.front_suspension}</Col></Row>:null}
                                            {car.back_suspension?<Row><Col className='label'>Тип задней подвески</Col><Col className='value'> {car.back_suspension}</Col></Row>:null}
                                            {car.front_breaks?<Row><Col className='label'>Передние тормоза</Col><Col className='value'> {car.front_breaks}</Col></Row>:null}
                                            {car.rear_breaks?<Row><Col className='label'>Задние тормоза</Col><Col className='value'> {car.rear_breaks}</Col></Row>:null}
                                        </Col>
                                        <Col xs={12} md={6}>
                                            <h3 className='mt-4 mb-2'>Эксплуатационные показатели</h3>
                                            {car.top_speed?<Row><Col className='label'>Максимальная скорость, км/ч</Col><Col className='value'> {car.top_speed}</Col></Row>:null}
                                            {car.acceleration?<Row><Col className='label'>Разгон до 100 км/ч, с</Col><Col className='value'> {car.acceleration}</Col></Row>:null}
                                            {car.fuel_grade?<Row><Col className='label'>Марка топлива</Col><Col className='value'> {car.fuel_grade}</Col></Row>:null}
                                            {car.eco_class?<Row><Col className='label'>Экологический класс</Col><Col className='value'> {car.eco_class}</Col></Row>:null}
                                            {car.emissions?<Row><Col className='label'>Выбросы CO2, г/км</Col><Col className='value'> {car.emissions}</Col></Row>:null}
                                            {car.fuel_consumption_mixed?<Row><Col className='label'>Расход топлива, л смешанный</Col><Col className='value'> {car.fuel_consumption_mixed}</Col></Row>:null}
                                            {car.fuel_consumption_track?<Row><Col className='label'>Расход топлива, л трасса</Col><Col className='value'> {car.fuel_consumption_track}</Col></Row>:null}
                                            {car.fuel_consumption_city?<Row><Col className='label'>Расход топлива, л город</Col><Col className='value'> {car.fuel_consumption_city}</Col></Row>:null}

                                            <h3 className='mt-4 mb-2'>Двигатель</h3>
                                            {car.engine_type?<Row><Col className='label'>Тип двигателя</Col><Col className='value'> {car.engine_type}</Col></Row>:null}
                                            {car.engine_location?<Row><Col className='label'>Расположение двигателя</Col><Col className='value'> {car.engine_location}</Col></Row>:null}
                                            {car.engine_capacity?<Row><Col className='label'>Объем двигателя, см³</Col><Col className='value'> {car.engine_capacity}</Col></Row>:null}
                                            {car.type_of_boost?<Row><Col className='label'>Тип наддува</Col><Col className='value'> {car.type_of_boost}</Col></Row>:null}
                                            {car.maximum_power?<Row><Col className='label'>Максимальная мощность, л.с./кВт при об/мин</Col><Col className='value'> {car.maximum_power}</Col></Row>:null}
                                            {car.maximum_torque?<Row><Col className='label'>Максимальный крутящий момент, Н*м при об/мин</Col><Col className='value'> {car.maximum_torque}</Col></Row>:null}
                                            {car.cylinder_arrangement?<Row><Col className='label'>Расположение цилиндров</Col><Col className='value'> {car.cylinder_arrangement}</Col></Row>:null}
                                            {car.cylinder_quantity?<Row><Col className='label'>Количество цилиндров</Col><Col className='value'> {car.cylinder_quantity}</Col></Row>:null}
                                            {car.number_of_valves?<Row><Col className='label'>Число клапанов на цилиндр</Col><Col className='value'> {car.number_of_valves}</Col></Row>:null}
                                            {car.compression_ratio?<Row><Col className='label'>Степень сжатия</Col><Col className='value'> {car.compression_ratio}</Col></Row>:null}
                                            {car.bore_stroke?<Row><Col className='label'>Диаметр цилиндра и ход поршня, мм</Col><Col className='value'> {car.bore_stroke}</Col></Row>:null}
                                            {car.engine_power_system?<Row><Col className='label'>Система питания двигателя</Col><Col className='value'> {car.engine_power_system}</Col></Row>:null}

                                            <h3 className='mt-4 mb-2'>Безопасность</h3>
                                            {car.safety_rating?<Row><Col className='label'>Оценка безопасности</Col><Col className='value'> {car.safety_rating}</Col></Row>:null}
                                            {car.name_of_rating?<Row><Col className='label'>Название рейтинга</Col><Col className='value'> {car.name_of_rating}</Col></Row>:null}

                                        </Col>
                                        </Row>
                                        */}
                                    </Card.Body>
                                </Accordion.Collapse>
                            </Card>
                        )}
                    </Accordion>

                </>
            }</>
    );
}
export default CarModel



