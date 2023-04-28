import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

export const LogoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background-color: #000;
  z-index: 100;
`;

export const Nav = styled.nav`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem 0;
`;

export const NavItem = styled(NavLink)`
  margin: 0 1rem;
  text-decoration: none;
  font-size: 1rem;
  font-weight: bold;
  color: #fff;

  &.active {
    color: #fff;
  }
`;
