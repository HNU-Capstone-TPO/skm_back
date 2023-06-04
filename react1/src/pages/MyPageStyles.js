import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Container = styled.div`
  display: flex;
  width: 100%;
  background-color: #f5f5f5;
  margin-top: 20px;
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  top: 0;
  width: 100%;
  background-color: white;
  padding: 10px 20px;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
  z-index: 1;
`;

const Nav = styled.nav`
  display: flex;
  justify-content: flex-end;
  margin-left: auto;
  margin-right: 20px;
`;

const NavItem = styled(Link)`
  font-weight: bold;
  color: black;
  margin-right: 20px;
  text-decoration: none;
`;

const Title = styled.h1`
  font-weight: bold;
  font-size: 30px;
  color: black;
  margin-left: 20px;
  margin-top: 60px;
  position: absolute;
`;

const Main = styled.main`
  display: flex;
  flex-grow: 1;
  margin-top: 0px;
  overflow-y: auto;
  height: calc(100vh - 80px);
  margin-left: 200px;
  
`;

//사이드 table
const Sidebar = styled.div`
  display: flex;
  flex-direction: column;
  padding: 40px;
  border: 3px solid #e6e6e6;
  width: 210px;
  margin-top: 80px;
  height: 480px;
  justify-content: center;
`;

// 사이드쪽 이름 넣는칸
const SidebarItem = styled(Link)`
  font-weight: bold;
  color: black;
  font-size: 18px;
  margin-top: 20px;
  margin-bottom: 20px;
  text-decoration: none;
  white-space: nowrap;
  display: inline-block;
  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    padding: 5px 10px;
    transition: all 0.3s ease;
  }
`;

const Content = styled.div`
  flex-grow: 1;
  padding: 20px;
  padding-left: 40px;
`;

const PageContainer = styled.div`
  background-color: white;
  padding: 20px;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  margin-top: 60px;
  width: 1060px;
  max-width: 1060px;
`;

export {
  Container,
  Header,
  Nav,
  NavItem,
  Title,
  Main,
  Sidebar,
  SidebarItem,
  Content,
  PageContainer,
};