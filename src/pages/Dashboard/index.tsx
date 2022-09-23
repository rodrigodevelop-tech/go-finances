import React, { useCallback, useEffect, useState } from "react";
import { ActivityIndicator, Text } from 'react-native';
import { useTheme } from 'styled-components';

import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";

import { HighlightCard } from '../../components/HighlightCard';
import { TransactionCard, TransactionCardData } from '../../components/TransactionCard';

import {
  Container,
  Header,
  UserWrapper,
  UserInfo,
  Photo,
  User,
  UserGreeting,
  UserName,
  Icon,
  HighlightCards,
  Transactions,
  Title,
  TransactionList,
  LogoutButton,
  LoadContainer,
  NoTransaction,
  NoTransactionDescription
} from './styles';
import { useAuth } from "../../hooks/useAuth";


export interface DataListProps extends TransactionCardData {
  id: string;
}

interface HighlightProps {
  amount: string;
  lastTransaction: string;
}

interface HighlightDataProps {
  entries: HighlightProps;
  expensive: HighlightProps;
  total: HighlightProps;
}

export function Dashboard() {
  const [isLoading, setIsLoading] = useState(true);
  const [transactions, setTransactions] = useState<DataListProps[]>([]);
  const [highlightData, setHighlightData] = useState<HighlightDataProps>({} as HighlightDataProps);

  const theme = useTheme();

  const { user, signOut } = useAuth();

  function getLastTransactionDate(collection: DataListProps[], type: 'positive' | 'negative') {

    const collectionFiltered = collection.filter(transaction => transaction.type === type);

    if (collectionFiltered.length === 0) {
      return 0;
    }

    const lastTransaction = new Date(Math.max.apply(Math,
      collectionFiltered
      .map((transaction) => new Date(transaction.date).getTime())
    ));


    return `${lastTransaction.getDate()} de ${lastTransaction.toLocaleString('pt-BR', {
      month: 'long'
    })}`;

  }

  
  async function loadTransactions() {
    const collectionKey = `@gofinances:transactions_user:${user.id}`;
    const response = await AsyncStorage.getItem(collectionKey);
    const data = response ? JSON.parse(response) : [];

    let entriesTotal = 0;
    let expensiveTotal = 0;

    const transactionsFormatted: DataListProps[] = data.map((item: DataListProps) => {

      if (item.type === 'positive') {
        entriesTotal += Number(item.amount);
      } else {
        expensiveTotal += Number(item.amount);
      }

      const amount = Number(item.amount).toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
      });

      const dateFormatted = Intl.DateTimeFormat('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: '2-digit'
      }).format(new Date(item.date));

      return {
        id: item.id,
        name: item.name,
        amount,
        type: item.type,
        category: item.category,
        date: dateFormatted,
      }
    });

    setTransactions(transactionsFormatted);

    const lastTransactionEntries = getLastTransactionDate(data, 'positive');
    const lastTransactionExpensive = getLastTransactionDate(data, 'negative');
    const totalInterval = `01 a ${lastTransactionExpensive}`;

    const total = entriesTotal - expensiveTotal;

    setHighlightData({
      entries: {
        amount: entriesTotal.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        }),
        lastTransaction: lastTransactionEntries === 0 ? 'Nenhuma entrada realizada' : `Última entrada dia ${lastTransactionEntries}`
      },
      expensive: {
        amount: expensiveTotal.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        }),
        lastTransaction: lastTransactionExpensive === 0 ? 'Nenhuma saída realizada' : `Última saída dia ${lastTransactionExpensive}`
      },
      total: {
        amount: total.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        }),
        lastTransaction: !!totalInterval  ? 'Sem transações cadastradas' : totalInterval
      }
    });

    setIsLoading(false);
  }

  useEffect(() => {
    loadTransactions();
  }, []);

  useFocusEffect(useCallback(() => {
    loadTransactions();
  }, []));

  return (
    <Container>
      {
        isLoading ? (
          <LoadContainer>
            <ActivityIndicator color={theme.colors.primary} size="large"/>
          </LoadContainer> 
        ) :
        <>
          <Header>
            <UserWrapper>
              <UserInfo>
                <Photo
                  source={{
                    uri: user.photo
                  }}
                />

                <User>
                  <UserGreeting>Olá, </UserGreeting>
                    <UserName>{user.name}</UserName>
                </User>
              </UserInfo>
              <LogoutButton onPress={signOut}>
                <Icon name="power" />
              </LogoutButton>
            </UserWrapper>
          </Header>

          <HighlightCards>
            <HighlightCard
              title='Entradas'
              amount={highlightData?.entries?.amount}
              lastTransaction={highlightData?.entries?.lastTransaction}
              type="up"
            />
            <HighlightCard
              title='Saídas'
              amount={highlightData?.expensive?.amount}
              lastTransaction={highlightData?.expensive?.lastTransaction}
              type="down"
            />
            <HighlightCard
              title='Total'
              amount={highlightData?.total?.amount}
              lastTransaction={highlightData?.total.lastTransaction}
              type="total"
            />
          </HighlightCards>

          <Transactions>
              <Title>Listagem</Title>
              
              {
                transactions.length > 0 ? (
                  <TransactionList
                    data={transactions}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) =>
                      <TransactionCard data={item} />
                    }
                  />
                ) : (  
                  <NoTransaction>
                    <NoTransactionDescription>Nenhuma transação cadastrada</NoTransactionDescription>
                  </NoTransaction>
                )
              
              }

            
          </Transactions>
        </>
      }
    </Container>
  )
}
