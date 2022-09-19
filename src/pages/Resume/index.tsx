import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { HistoryCard } from '../../components/HistoryCard';
import { Container, Header, Title, Content } from './styles';
import { categories } from '../../utils/categories';
import { ScrollView } from 'react-native-gesture-handler';

interface TransactionDataProps {
  type: 'positive' | 'negative';
  name: string;
  amount: string;
  category: string;
  date: string;
}

interface CategoryDataProps {
  key: string;
  name: string;
  total: string;
  color: string;
}

export function Resume() {
  const [transactionsResume, setTransactionsResume] = useState();
  const [totalByCategories, setTotalByCategories] = useState<CategoryDataProps[]>([]);
  
  async function loadData() {
    const collectionKey = '@gofinances:transactions';
    const response = await AsyncStorage.getItem(collectionKey);
    const responseFormatted = response ? JSON.parse(response) : [];

    const expensives: TransactionDataProps[] = responseFormatted.filter((expensive: TransactionDataProps) => expensive.type === 'negative');
    
    const totalByCategory: CategoryDataProps[] = [];

    categories.forEach(category => {
      let categorySum = 0;

      expensives.forEach(expensive => {
        if (expensive.category === category.key) {
          categorySum += Number(expensive.amount);
        }
      });

      if (categorySum > 0) {
        const total = categorySum.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        });

        totalByCategory.push({
          key: category.key,
          name: category.name,
          total,
          color: category.color
        });
      }
    });

    setTotalByCategories(totalByCategory);
  }

  useEffect(() => {
    loadData();
  },[])

  return (
    <Container>
        <Header>
          <Title>Resumo por Categoria</Title>
      </Header>

      <Content>
        {
          totalByCategories.map(item => (
            <HistoryCard
              key={item.key}
              color={item.color}
              title={item.name}
              amount={item.total}
            />
          ))
        }
      </Content>
      
    </Container>
  )
}