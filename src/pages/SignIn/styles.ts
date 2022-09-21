import { RFValue, RFPercentage } from 'react-native-responsive-fontsize';
import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
`;

export const Header = styled.View`
  width: 100%;
  height: 70%;

  background-color: ${props => props.theme.colors.primary};

  justify-content: flex-end;
  align-items: center;
`;

export const TitleWrapper = styled.View`
  align-items: center;
`;

export const Title = styled.Text`
  font-family: ${props => props.theme.fonts.medium};
  font-size: ${RFValue(30)}px;
  color: ${props => props.theme.colors.shape};
  text-align: center;

  margin-top: 45px;
`;

export const SignInTitle = styled.Text`
  font-family: ${props => props.theme.fonts.regular};
  font-size: ${RFValue(16)}px;
  color: ${props => props.theme.colors.shape};
  text-align: center;

  margin-top: 80px;
  margin-bottom: 57px;
`;

export const Footer = styled.View`
  width: 100%;
  height: 30%;

  background-color: ${props => props.theme.colors.secondary};
`;

export const FooterWrapper = styled.View`
  margin-top: ${RFPercentage(-4)}px;

  padding: 0 32px;

  justify-content: space-between;
`;
