import React from 'react';
import { Route, Routes, Link } from 'react-router-dom';
import MyInfo from '../components/Mypage/MyInfo';
import Timeline from '../components/Mypage/Timeline';
import Favorites from '../components/Mypage/Favorites';
import InterestedProducts from '../components/Mypage/InterestedProducts';
import UserSelectItem from '../components/Mypage/UserSelectItem';

import {
  Container,
  Title,
  Main,
  Sidebar,
  SidebarItem,
  Content,
  PageContainer,
} from './MyPageStyles';

const Mypage = () => {
  return (
    <>
      <Container>
        <Main>
          <Sidebar>
            <SidebarItem to="/mypage/myinfo">● 내 정보</SidebarItem>
            <SidebarItem to="/mypage/timeline">● 타임라인</SidebarItem>
            <SidebarItem to="/mypage/favorites">● 찜 목록</SidebarItem>
            <SidebarItem to="/mypage/interested-products">● 추천 상품</SidebarItem>
            <SidebarItem to="/mypage/userselectitem">● 유저 선택</SidebarItem>
          </Sidebar>
          <Content>
            <PageContainer>
              <Routes>
                <Route path="myinfo" element={<MyInfo />} />
                <Route path="timeline" element={<Timeline />} />
                <Route path="favorites" element={<Favorites />} />
                <Route path="interested-products" element={<InterestedProducts />} />
                <Route path="userselectitem" element={<UserSelectItem />} /> 
              </Routes>
            </PageContainer>
          </Content>
        </Main>
      </Container>
    </>
  );
};



/*const Mypage = () => {
  return (
    <>
      <Title>마이 페이지</Title>
      <Container>
        <Main>
          <Sidebar>
            <SidebarItem to="/mypage/myinfo">내 정보</SidebarItem>
            <SidebarItem to="/mypage/timeline">타임라인</SidebarItem>
            <SidebarItem to="/mypage/favorites">찜 목록</SidebarItem>
            <SidebarItem to="/mypage/interested-products">관심 상품</SidebarItem>
            <SidebarItem to="/mypage/userselectitem">유저 선택</SidebarItem>
          </Sidebar>
          <Content>
            <PageContainer>
              <Routes>
                <Route path="myinfo" element={<MyInfo />} />
                <Route path="timeline" element={<Timeline />} />
                <Route path="favorites" element={<Favorites />} />
                <Route path="interested-products" element={<InterestedProducts />} />
                <Route path="userselectitem" element={<UserSelectItem />} /> 
              </Routes>
            </PageContainer>
          </Content>
        </Main>
      </Container>
    </>
  );
};*/

export default Mypage;



