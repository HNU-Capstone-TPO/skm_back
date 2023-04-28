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
          <strong>이름:</strong> {user.name}
        </ListGroup.Item>
        <ListGroup.Item>
          <strong>이메일:</strong> {user.email}
        </ListGroup.Item>
        <ListGroup.Item>
          <strong>전화번호:</strong> {user.phoneNumber}
        </ListGroup.Item>
        <ListGroup.Item>
          <strong>주소:</strong> {user.address}
        </ListGroup.Item>
      </StyledListGroup>
    </StyledCard>
  );
};

export default MyInfo;


