import React, { Component } from 'react';
import { connect } from "react-redux";
import {
  Navbar,
  Nav,
  Form,
  FormControl,
  Button
} from 'react-bootstrap'

//components
import Links from './Links'

class NavBar extends Component {
  handleclick = () => {
    let button = document.getElementById('button-open-menu')
    let menu = document.getElementById('responsive-navbar-nav')
    button.classList.toggle('collapsed')   
  }
  render() {
    return (
      <Navbar collapseOnSelect expand="true" className="position-navbar">
        <div className="position-menu">
          <Navbar.Brand href="/home">S.O.S. Pet</Navbar.Brand>  
          <Navbar.Toggle aria-controls="responsive-navbar-nav" id="button-open-menu" onClick={this.handleclick} />
          {/* <Nav className="ml-auto justify-content-end show-md" id="navMenu">
            <Links />
          </Nav> */}
        </div>
        <div className="hidden-md">
          <Navbar.Collapse id="responsive-navbar-nav" >
            <Nav>
              <Links />
            </Nav>
          </Navbar.Collapse>
        </div>
        <Nav className="margin-search justify-content-end">
          <Form inline>
            <FormControl type="text" placeholder="Search" className="mr-sm-2" />
            <Button variant="outline-success" className="search-button">Search</Button>
          </Form>
        </Nav>
      </Navbar>
    );
  }
}

const mapStateToProps = state => {
  return {state}
};

export default connect(mapStateToProps)(NavBar);