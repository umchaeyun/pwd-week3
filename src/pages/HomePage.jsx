/* src/pages/HomePage.jsx */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';
import { FaMapMarkedAlt, FaUtensils, FaStar, FaDice } from 'react-icons/fa';

const HomeContainer = styled.div`
  text-align: center;
  padding: 3rem 1rem;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 1rem;
  color: #333;
`;

const Subtitle = styled.p`
  font-size: 1.2rem;
  color: #666;
  margin-bottom: 3rem;
`;

const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
`;

const Card = styled(Link)`
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s;

  &:hover {
    transform: translateY(-5px);
  }

  svg {
    font-size: 3rem;
    margin-bottom: 1rem;
    color: #667eea;
  }

  h3 {
    margin-bottom: 0.5rem;
  }

  p {
    color: #666;
  }
`;

const RouletteContainer = styled.div`
  margin-top: 3rem;
  padding: 2rem;
  background: #f9f9f9;
  border-radius: 12px;
`;

const RouletteButton = styled.button`
  padding: 0.7rem 1.5rem;
  background: #667eea;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
  margin-top: 1rem;
  transition: background 0.3s;

  &:hover {
    background: #5563c1;
  }
`;

const Result = styled.div`
  margin-top: 1.5rem;
  font-size: 1.2rem;
  font-weight: bold;
`;

function HomePage() {
  const allFoods = [
    { name: '피자', type: '양식', delivery: true },
    { name: '치킨', type: '한식', delivery: true },
    { name: '햄버거', type: '양식', delivery: true },
    { name: '칼국수', type: '한식', delivery: true },
    { name: '라면', type: '한식', delivery: true },
    { name: '파스타', type: '양식', delivery: false },
    { name: '떡볶이', type: '매운 음식', delivery: true },
    { name: '마라탕', type: '매운 음식', delivery: true },
  ];

  const [excludeFood, setExcludeFood] = useState('');
  const [excludeType, setExcludeType] = useState('');
  const [deliveryOnly, setDeliveryOnly] = useState(false);
  const [result, setResult] = useState('');

  const handleRoulette = () => {
    let filtered = allFoods.filter(food => {
      if (excludeFood && food.name === excludeFood) return false;
      if (excludeType && food.type === excludeType) return false;
      if (deliveryOnly && !food.delivery) return false;
      return true;
    });
    if (filtered.length === 0) {
      setResult('조건에 맞는 음식이 없습니다 😢');
      return;
    }
    const randomIndex = Math.floor(Math.random() * filtered.length);
    setResult(`오늘의 추천 음식: ${filtered[randomIndex].name} 🍽`);
  };

  return (
    <HomeContainer>
      <Title>우리 학교 맛집을 찾아보세요!</Title>
      <Subtitle>캠퍼스 주변 숨은 맛집들을 한눈에</Subtitle>

      <CardGrid>
        <Card to="/list">
          <FaMapMarkedAlt />
          <h3>맛집 둘러보기</h3>
          <p>카테고리별로 맛집을 찾아보세요</p>
        </Card>

        <Card to="/popular">
          <FaStar />
          <h3>인기 맛집 TOP</h3>
          <p>이번 주 가장 인기있는 맛집</p>
        </Card>

        <Card to="/submit">
          <FaUtensils />
          <h3>맛집 제보하기</h3>
          <p>새로운 맛집을 알려주세요</p>
        </Card>

        <Card as="div">
          <FaDice />
          <h3>랜덤 음식 룰렛</h3>
          <p>오늘 뭐 먹을지 고민될 때!</p>
        </Card>
      </CardGrid>

      <RouletteContainer>
        <div>
          <input
            placeholder="제외할 음식 (예: 칼국수)"
            value={excludeFood}
            onChange={e => setExcludeFood(e.target.value)}
          />
        </div>
        <div style={{ marginTop: '0.5rem' }}>
          <input
            placeholder="제외할 음식 종류 (예: 양식, 매운 음식)"
            value={excludeType}
            onChange={e => setExcludeType(e.target.value)}
          />
        </div>
        <div style={{ marginTop: '0.5rem' }}>
          <label>
            <input
              type="checkbox"
              checked={deliveryOnly}
              onChange={e => setDeliveryOnly(e.target.checked)}
            />{' '}
            배달 가능 음식만
          </label>
        </div>
        <RouletteButton onClick={handleRoulette}>룰렛 돌리기 🎲</RouletteButton>
        {result && <Result>{result}</Result>}
      </RouletteContainer>
    </HomeContainer>
  );
}

export default HomePage;
