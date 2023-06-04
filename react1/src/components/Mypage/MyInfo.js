import React from 'react';
import { Card, ListGroup } from 'react-bootstrap';
import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

const StyledCard = styled(Card)`
  width: 50%;
  margin: 0 auto;
  border-radius: 10px;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
  animation: ${fadeIn} 0.5s ease-out;
`;

const StyledListGroup = styled(ListGroup)`
  .list-group-item {
    border: none;
    padding: 20px;
    font-size: 16px;

    &:nth-child(even) {
      background-color: rgba(0, 0, 0, 0.02);
    }
  }
`;

const MyInfo = () => {
  const user = {
    a1: '',
    a2: '',
    a3: '',
    a4: '',
    a5: '',
    a6: '',
    a7: '',
    a8: '',
    a9: '',
  };

  const user1 = {
    gender: '',
    name: '홍길동',
    email: 'hong@example.com',
    phoneNumber: '010-1234-5678',
    address: '서울특별시 강남구',
  };

  return (
    <StyledCard>
      <Card.Header>
        <h3>내 정보 페이지</h3>
      </Card.Header>
      <StyledListGroup variant="flush">
        <ListGroup.Item>
          <strong>성별:</strong> {user.a1}
        </ListGroup.Item>
        <ListGroup.Item>
          <strong>키:</strong> {user.a2}
        </ListGroup.Item>
        <ListGroup.Item>
          <strong>몸무게:</strong> {user.a3}
        </ListGroup.Item>
        <ListGroup.Item>
          <strong>체형:</strong> {user.a4}
        </ListGroup.Item>
        <ListGroup.Item>
          <strong>피부톤:</strong> {user.a5}
        </ListGroup.Item>
        <ListGroup.Item>
          <strong>직업:</strong> {user.a6}
        </ListGroup.Item>
        <ListGroup.Item>
          <strong>선호 색상:</strong> {user.a7}
        </ListGroup.Item>
        <ListGroup.Item>
          <strong>선호 취향:</strong> {user.a8}
        </ListGroup.Item>
        <ListGroup.Item>
          <strong>선호 핏:</strong> {user.a9}
        </ListGroup.Item>
      </StyledListGroup>
    </StyledCard>
  );
};

export default MyInfo;


