import React, { useState } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap';
import { NavLink as RRNavLink } from 'react-router-dom';

const HeaderNavbar = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <Navbar color="dark" dark expand="md">
        <div className="container">
            <NavbarToggler onClick={toggle} />
            <Collapse isOpen={isOpen} navbar>
            <Nav className="mr-auto" navbar>
                <NavItem>
                    <NavLink 
                    tag={RRNavLink} 
                    exact 
                    to="/" 
                    activeClassName="active"
                    >Find Player</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink 
                     tag={RRNavLink} 
                     to="/user" 
                     activeClassName="active"
                    >Player Statistics</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink 
                     tag={RRNavLink} 
                     to="/match" 
                     activeClassName="active"
                    >Player Information</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink 
                     tag={RRNavLink} 
                     to="/details" 
                     activeClassName="active"
                    >Match Detais</NavLink>
                </NavItem>
            </Nav>
            </Collapse>
        </div>
    </Navbar>
  );
}

export default HeaderNavbar;