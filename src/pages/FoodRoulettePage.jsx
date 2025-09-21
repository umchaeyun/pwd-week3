/* src/pages/FoodRoulettePage.jsx */
import React, { useState } from 'react';
import styled from '@emotion/styled';

// 임시 음식 데이터
const foods = [
  { name: "김치찌개", category: "한식", rating: 4.5, delivery: true, distance: "500m" },
  { name: "피자", category: "양식", rating: 4.7, delivery: true, distance: "1km" },
  { name: "초밥", category: "일식", rating: 4.8, delivery: false, distance: "800m" },
  { name: "칼국수", category: "한식", rating: 4.2, delivery: true, distance: "600m" },
  { name: "햄버거", category: "양식", rating: 4.0, delivery: true, distance: "300m" },
];

const Container = styled.div`
  text-align: center;
  padding: 3rem 1rem;
`;

const Title = styled.h1`
  font-size: 2rem;
  margin-bottom: 2rem;
`;

const RouletteButton = styled.button`
  background: #667eea;
  color: white;
  padding: 1rem 2rem;
  border: none;
  border-radius: 12px;
  font-size: 1.2rem;
  cursor: pointer;
  transition: background 0.3s;

  &:hover {
    background: #5a67d8;
  }
`;

const ResultBox = styled.div`
  margin-top: 2rem;
  padding: 2rem;
  border-radius: 12px;
  background: #f7f7f7;
  display: inline-block;
  min-width: 250px;
`;

function FoodRoulettePage() {
  const [result, setResult] = useState(null);

  const spinRoulette = () => {
    const randomFood = foods[Math.floor(Math.random() * foods.length)];
    setResult(randomFood);
  };

  return (
    <Container>
      <Title>랜덤 음식 룰렛 🎲</Title>
      <RouletteButton onClick={spinRoulette}>룰렛 돌리기</RouletteButton>
      
      {result && (
        <ResultBox>
          <h2>{result.name}</h2>
          <p>카테고리: {result.category}</p>
          <p>평점: ⭐ {result.rating}</p>
          <p>배달 가능: {result.delivery ? "가능" : "불가"}</p>
          <p>거리: {result.distance}</p>
        </ResultBox>
      )}
    </Container>
  );
}

export default FoodRoulettePage;
