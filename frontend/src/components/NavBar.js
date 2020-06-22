import React from "react";
import {Navbar} from "react-bootstrap";
import {Link} from "react-router-dom";
import store from "../globals/store";
import {FaDoorOpen} from "react-icons/fa";

function NavBar() {
    const exit = () => {
        localStorage.clear();
        window.location.reload();
    }

    return (

        <Navbar bg='light' expand='lg' className={'mb-2'}>
            <Link to={'/'}><Navbar.Brand>Диплом</Navbar.Brand></Link>
            <Navbar.Toggle aria-controls="basic-navbar-nav"/>

            <Navbar.Collapse id="basic-navbar-nav">
                <ul className="navbar-nav mr-auto">
                    <li><Link className={'nav-link'} to={'/catalog'}>Каталог</Link></li>
                    <li>
                        <Link
                            className={'nav-link'}
                            to={'/users_ratings'}
                        >
                            Оцененные автомобили
                        </Link>
                    </li>
                    <li>
                        <Link
                            className={'nav-link'}
                            to={'/about'}
                        >
                            О работе
                        </Link>
                    </li>
                </ul>

                <Navbar.Text>
                    Привет, <Link to={'/account_settings'}>{store.getState().username}</Link>
                    <FaDoorOpen className={'mx-2 exit-button'} onClick={exit}/>
                </Navbar.Text>
            </Navbar.Collapse>
        </Navbar>
    )
}

export default NavBar