import { RFValue } from 'react-native-responsive-fontsize';
import styled from "styled-components/native";

export const Container = styled.View`
  width: 100%;
`;

export const Error = styled.Text`
  color: ${props => props.theme.colors.attention};
  font-size: ${RFValue(12)}px;
  font-family: ${props => props.theme.fonts.regular};

  margin: 1px 0;
`;