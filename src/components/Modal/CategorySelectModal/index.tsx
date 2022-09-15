import React from 'react';
import {
  Container,
  Header,
  Title,
} from './styles';

interface Category {
  key: string;
  name: string;
}

interface CategorySelectModalProps {
  category: Category;
  setCategory: (category: Category) => void;
  closeSelectCategory: () => void;
}

export function CategorySelectModal({
  category,
  setCategory,
  closeSelectCategory
}: CategorySelectModalProps) {
  return (
    <Container>
      <Header>
        <Title>Categoria</Title>
      </Header>
    </Container>
  )
}