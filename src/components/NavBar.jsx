import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button, Form, FormControl, Nav, Navbar, NavDropdown} from 'react-bootstrap';

class NavBar extends React.Component{
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <>
              <br />
              <Navbar bg="light" variant="light">
                <Navbar.Brand href="#trainerpage">Hello Shachar reinis</Navbar.Brand>
                <Nav className="mr-auto">
                  <Nav.Link href="#home">Calendar + new training</Nav.Link>
                  <Nav.Link href="#Training Log">Trainee</Nav.Link>
                  <Nav.Link href="#pricing">Empowerment Layout</Nav.Link>
                </Nav>
                {/*<Form inline>*/}
                {/*  <FormControl type="text" placeholder="Search" className="mr-sm-2" />*/}
                {/*  <Button variant="outline-primary">Search</Button>*/}
                {/*</Form>*/}
              </Navbar>
            </>
        )
    }

}
export default NavBar