import { Feather } from '@expo/vector-icons';
import { TouchableOpacity } from "react-native";
import { RFValue } from 'react-native-responsive-fontsize';
import styled, { css } from "styled-components/native";

interface IconProps {
  type: 'up' | 'down';
}

interface ButtonProps {
  isActive: boolean;
  type: 'up' | 'down';
}

export const Container = styled(TouchableOpacity)<ButtonProps>`
  width: 48%;

  flex-direction: row;
  align-items: center;
  justify-content: center;

  border-width: ${({isActive}) => isActive ? 0 : 1.5}px;
  border-style: solid;
  border-color: ${props => props.theme.colors.text};
  border-radius: 5px;

  padding: 16px 35px;

  ${({ isActive, type, theme }) => isActive && type === 'up' && css`
    background-color: ${theme.colors.success_light};
  `};

  ${({ isActive, type, theme }) => isActive && type === 'down' && css`
    background-color: ${theme.colors.attention_light};
  `};
`;

export const Icon = styled(Feather)<IconProps>`
  font-size: ${RFValue(24)}px;
  margin-right: 12px;
  color: ${props  => props.type === 'up' ? props.theme.colors.success : props.theme.colors.attention};
`;

export const Title = styled.Text`
  font-family: ${(props) => props.theme.fonts.regular};
  font-size: ${RFValue(14)}px;
`;