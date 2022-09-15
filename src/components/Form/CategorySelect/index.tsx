import React from 'react';
import { TouchableOpacityProps } from 'react-native';
import {
  Container,
  Category,
  Icon
} from './styles';

interface CategorySelectProps extends TouchableOpacityProps {
  title: string;
}

export function CategorySelect({ title, ...rest}: CategorySelectProps) {
  return (
    <Container>
      <Category>
        {title}
      </Category>
      <Icon name="chevron-down"/>
    </Container>
  )
}