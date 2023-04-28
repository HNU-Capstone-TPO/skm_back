import React from 'react';
import { NavLink } from 'react-router-dom';
import { Nav, NavItem, LogoWrapper } from './NavbarStyles';

const Navbar = () => {
  return (
    <LogoWrapper>
      <Nav>
        <NavItem exact to="/" activeClassName="active">
          StyleMaker
        </NavItem>
        <NavItem to="/login" activeClassName="active">
          로그인
        </NavItem>
        <NavItem to="/signup" activeClassName="active">
          회원가입
        </NavItem>
        <NavItem to="/mypage" activeClassName="active">
          마이 페이지
        </NavItem>
      </Nav>
    </LogoWrapper>
  );
};

export default Navbar;
