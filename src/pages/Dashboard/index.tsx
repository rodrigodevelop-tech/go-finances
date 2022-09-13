import React from "react";
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
  TransactionList
} from './styles';


export interface DataListProps extends TransactionCardData {
  id: string;
}

export function Dashboard() {

  const data: DataListProps[] = [
    {
      id: '1',
      type: "positive",
      title: "Desenvolvimento de Site",
      amount: "R$ 12.000,00",
      category :  {
        name: 'Vendas',
        icon: 'dollar-sign'
      },
      date: "13/04/2022",
    },
    {
      id: '2',
      type: "negative",
      title: "Grego do Rafa",
      amount: "R$ 12.000,00",
      category :  {
        name: 'Alimentação',
        icon: 'coffee'
      },
      date: "13/04/2022",
    },
    {
      id: '3',
      type: "positive",
      title: "Aluguel do apartamento",
      amount: "R$ 12.000,00",
      category :  {
        name: 'Casa',
        icon: 'shopping-bag'
      },
      date: "10/04/2022",
    },
  ]
  
  return (
    <Container>
      <Header>
        <UserWrapper>
          <UserInfo>
            <Photo
              source={{
                uri: 'https://avatars.githubusercontent.com/u/60670489?v=4'
              }}
            />

            <User>
              <UserGreeting>Olá, </UserGreeting>
              <UserName>Rodrigo</UserName>
            </User>
          </UserInfo>
          <Icon name="power" />
        </UserWrapper>
      </Header>

      <HighlightCards>
        <HighlightCard
          title='Entradas'
          amount="17.000,00"
          lastTransaction='Última entrada dia 13 de abril'
          type="up"
        />
        <HighlightCard
          title='Entradas'
          amount="1.259,00"
          lastTransaction='Última entrada dia 13 de abril'
          type="down"
        />
        <HighlightCard
          title='Entradas'
          amount="16.141,00"
          lastTransaction='Última entrada dia 13 de abril'
          type="total"
        />
      </HighlightCards>

      <Transactions>
        <Title>Listagem</Title>

        <TransactionList
          data={data}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) =>
            <TransactionCard data={item} />
          }
        />
        
      </Transactions>
    </Container>
  )
}
