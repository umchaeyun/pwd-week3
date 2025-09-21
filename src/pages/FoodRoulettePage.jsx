/* src/pages/FoodRoulettePage.jsx */
import React, { useState } from 'react';
import styled from '@emotion/styled';
import { Wheel } from 'react-custom-roulette';

const Container = styled.div`
  text-align: center;
  padding: 3rem 1rem;
`;

const Title = styled.h1`
  font-size: 2rem;
  margin-bottom: 2rem;
`;

const SpinButton = styled.button`
  margin-top: 2rem;
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
  padding: 1.5rem;
  border-radius: 12px;
  background: #f7f7f7;
  display: inline-block;
  min-width: 250px;
`;

function FoodRoulettePage() {
  // 메뉴 데이터 (식당 X, 메뉴만!)
  const menuData = [
    { option: '김치찌개' },
    { option: '불고기' },
    { option: '비빔밥' },
    { option: '초밥' },
    { option: '라면' },
    { option: '햄버거' },
    { option: '피자' },
    { option: '치킨' },
    { option: '칼국수' },
    { option: '떡볶이' },
  ];

  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);
  const [result, setResult] = useState(null);

  const handleSpinClick = () => {
    const newPrizeNumber = Math.floor(Math.random() * menuData.length);
    setPrizeNumber(newPrizeNumber);
    setMustSpin(true);
  };

  return (
    <Container>
      <Title>랜덤 음식 룰렛 🎡</Title>

      {/* 룰렛 */}
      <Wheel
        mustStartSpinning={mustSpin}
        prizeNumber={prizeNumber}
        data={menuData}
        backgroundColors={['#667eea', '#ff6b6b', '#48bb78', '#f6ad55']}
        textColors={['#ffffff']}
        onStopSpinning={() => {
          setMustSpin(false);
          setResult(menuData[prizeNumber].option);
        }}
      />

      {/* 돌리기 버튼 */}
      <SpinButton onClick={handleSpinClick}>룰렛 돌리기</SpinButton>

      {/* 결과 */}
      {result && (
        <ResultBox>
          <h2>오늘의 추천 메뉴 🍽️</h2>
          <p style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{result}</p>
        </ResultBox>
      )}
    </Container>
  );
}

export default FoodRoulettePage;
