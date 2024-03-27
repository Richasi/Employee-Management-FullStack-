import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Nav = styled.nav`
  background-color: #333;
  color: #fff;
  padding: 10px;
`;

const NavList = styled.ul`
  list-style: none;
  display: flex;
  justify-content: center;
  padding: 0;
`;

const NavItem = styled.li`
  margin: 0 10px;
`;

const NavLink = styled(Link)`
  color: #fff;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

export const Navbar = () => {
  return (
    <Nav>
      <NavList>
        <NavItem>
          <NavLink to="/">Home</NavLink>
        </NavItem>
        <NavItem>
          <NavLink to="/login">Login</NavLink>
        </NavItem>
        <NavItem>
          <NavLink to="/signup">Signup</NavLink>
        </NavItem>
        <NavItem>
          <NavLink to="/dashboard">Dashboard</NavLink>
        </NavItem>
      </NavList>
    </Nav>
  );
};