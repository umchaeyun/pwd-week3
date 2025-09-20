/* src/pages/ListPage.jsx */
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import styled from '@emotion/styled';
import restaurantsData from '../data/restaurants.json'; // 사이트에 올라온 맛집 데이터

const Container = styled.div`
  padding: 2rem 1rem;
  max-width: 800px;
  margin: auto;
`;

const Title = styled.h1`
  text-align: center;
  font-size: 2rem;
  margin-bottom: 2rem;
`;

const RestaurantList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const RestaurantCard = styled.div`
  padding: 1rem;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  background: white;
`;

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function ListPage() {
  const query = useQuery();
  const foodQuery = query.get('food');
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    if (foodQuery) {
      const filtered = restaurantsData.filter(r => r.food === foodQuery);
      setRestaurants(filtered);
    } else {
      setRestaurants(restaurantsData);
    }
  }, [foodQuery]);

  return (
    <Container>
      <Title>{foodQuery ? `${foodQuery} 맛집` : '맛집 리스트'}</Title>
      <RestaurantList>
        {restaurants.length > 0 ? restaurants.map((r, idx) => (
          <RestaurantCard key={idx}>
            <h3>{r.name}</h3>
            <p>{r.food} / {r.delivery ? '배달 가능' : '매장 방문'}</p>
          </RestaurantCard>
        )) : <p>조건에 맞는 맛집이 없습니다.</p>}
      </RestaurantList>
    </Container>
  );
}

export default ListPage;
