import { RFValue } from 'react-native-responsive-fontsize';
import styled from "styled-components/native";

interface HistoryCardContainerProps {
  color: string;
}

export const Container = styled.View<HistoryCardContainerProps>`
  width: 100%;

  background-color: ${props => props.theme.colors.shape};

  flex-direction: row;
  justify-content: space-between;

  padding: 13px 24px;
  border-radius: 5px;
  border-left-color: ${props => props.color};
  border-left-width: 5px;

  margin-bottom: 8px;
`;
export const Title = styled.Text`
  font-family: ${props => props.theme.fonts.regular};
  font-size: ${RFValue(15)}px;
`;

export const Amount = styled.Text`
  font-family: ${props => props.theme.fonts.bold};
  font-size: ${RFValue(15)}px;
`;