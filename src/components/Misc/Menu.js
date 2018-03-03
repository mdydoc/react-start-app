import React, {Component} from 'react';
import {Navbar, Nav, NavItem} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import {LinkContainer} from 'react-router-bootstrap';

export default class Menu extends Component {
    render() {
        return (
            <Navbar>
                <Navbar.Header>
                    <Navbar.Brand>
                        <Link to="/">Home</Link>
                    </Navbar.Brand>
                </Navbar.Header>
                <Nav>
                    <LinkContainer to="/login">
                        <NavItem eventKey={1}>
                            Login
                        </NavItem>
                    </LinkContainer>
                    <LinkContainer to="/register">
                        <NavItem eventKey={2}>
                            Register
                        </NavItem>
                    </LinkContainer>
                </Nav>
            </Navbar>
        );
    }
}