import { RFValue } from 'react-native-responsive-fontsize';
import { TouchableOpacity } from "react-native";
import styled from "styled-components/native";

export const Container = styled(TouchableOpacity)`
  width: 100%;
  background-color: ${props => props.theme.colors.secondary};

  padding: 18px;
  border-radius: 5px;

  align-items: center;
  justify-content: center;
`;

export const Title = styled.Text`
  font-family: ${props => props.theme.fonts.medium};
  font-size: ${RFValue(14)}px;
  color: ${props => props.theme.colors.shape};
`;