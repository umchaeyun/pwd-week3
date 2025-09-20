/* src/pages/RoulettePage.jsx */
import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';

const Container = styled.div`
  text-align: center;
  padding: 2rem 1rem;
`;

const Title = styled.h1`
  font-size: 2rem;
  margin-bottom: 1rem;
`;

const RouletteBoard = styled.div`
  margin: 2rem auto;
  width: 300px;
  height: 300px;
  border-radius: 50%;
  border: 5px solid #667eea;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  font-weight: bold;
  font-size: 1rem;
  transition: transform 4s cubic-bezier(0.33, 1, 0.68, 1);
`;

const OptionForm = styled.div`
  margin-top: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  max-width: 400px;
  margin-left: auto;
  margin-right: auto;
  text-align: left;

  label {
    display: flex;
    justify-content: space-between;
  }
`;

const Button = styled.button`
  margin-top: 1rem;
  padding: 0.8rem 1.5rem;
  background: #667eea;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;

  &:hover {
    background: #556cd6;
  }
`;

const foods = [
  '피자', '치킨', '햄버거', '라면', '샐러드', '파스타', '초밥', '떡볶이',
  '삼겹살', '칼국수', '비빔밥', '김밥'
];

const categories = ['한식', '양식', '중식', '일식', '분식', '치킨/피자'];

function RoulettePage() {
  const navigate = useNavigate();
  const [excludedFoods, setExcludedFoods] = useState([]);
  const [excludedCategories, setExcludedCategories] = useState([]);
  const [deliveryOnly, setDeliveryOnly] = useState(false);
  const [currentFood, setCurrentFood] = useState('룰렛을 돌려보세요!');
  const boardRef = useRef();

  const handleSpin = () => {
    let availableFoods = foods.filter(f => !excludedFoods.includes(f));
    // 예시: 카테고리 제외 로직
    // 실제로 카테고리 매칭 필요
    if (excludedCategories.length > 0) {
      availableFoods = availableFoods.filter(f => {
        const cat = getCategory(f); // 음식별 카테고리
        return !excludedCategories.includes(cat);
      });
    }
    if (deliveryOnly) {
      availableFoods = availableFoods.filter(f => hasDelivery(f)); // 배달 가능 여부 체크
    }
    if (availableFoods.length === 0) {
      alert('조건에 맞는 음식이 없습니다!');
      return;
    }

    const choice = availableFoods[Math.floor(Math.random() * availableFoods.length)];
    const randomDegree = 720 + Math.floor(Math.random() * 360);
    boardRef.current.style.transform = `rotate(${randomDegree}deg)`;
    setTimeout(() => {
      setCurrentFood(choice);
      navigate(`/list?food=${encodeURIComponent(choice)}`);
    }, 4000); // 애니메이션 끝난 후 이동
  };

  const toggleExcludedFood = (food) => {
    setExcludedFoods(prev =>
      prev.includes(food) ? prev.filter(f => f !== food) : [...prev, food]
    );
  };

  const toggleExcludedCategory = (cat) => {
    setExcludedCategories(prev =>
      prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
    );
  };

  // 예시 함수
  const getCategory = (food) => {
    if (['피자','파스타'].includes(food)) return '양식';
    if (['치킨'].includes(food)) return '치킨/피자';
    if (['라면','떡볶이','비빔밥','김밥','삼겹살','칼국수'].includes(food)) return '한식';
    if (['초밥'].includes(food)) return '일식';
    return '기타';
  };

  const hasDelivery = (food) => {
    // 예시: 치킨, 피자, 라면만 배달 가능
    return ['치킨','피자','라면'].includes(food);
  };

  return (
    <Container>
      <Title>랜덤 음식 룰렛</Title>
      <RouletteBoard ref={boardRef}>{currentFood}</RouletteBoard>

      <OptionForm>
        <div>
          <strong>싫어하는 음식 제외:</strong>
          {foods.map(f => (
            <label key={f}>
              {f}
              <input
                type="checkbox"
                checked={excludedFoods.includes(f)}
                onChange={() => toggleExcludedFood(f)}
              />
            </label>
          ))}
        </div>

        <div>
          <strong>음식 종류 제외:</strong>
          {categories.map(cat => (
            <label key={cat}>
              {cat}
              <input
                type="checkbox"
                checked={excludedCategories.includes(cat)}
                onChange={() => toggleExcludedCategory(cat)}
              />
            </label>
          ))}
        </div>

        <label>
          배달 가능 음식만:
          <input
            type="checkbox"
            checked={deliveryOnly}
            onChange={() => setDeliveryOnly(!deliveryOnly)}
          />
        </label>
      </OptionForm>

      <Button onClick={handleSpin}>룰렛 돌리기!</Button>
    </Container>
  );
}

export default RoulettePage;
