import { RFValue } from 'react-native-responsive-fontsize';
import styled, {css} from "styled-components/native";
import { Feather } from '@expo/vector-icons';

interface TypeCard {
   type: 'up' | 'down' | 'total'
}

export const Container = styled.View<TypeCard>`
  background-color: ${({ theme, type }) => 
    type === 'total' ? theme.colors.secondary : theme.colors.shape
  };

  width: ${RFValue(300)}px;
  border-radius: 5px;

  padding: 19px 23px;
  padding-bottom: ${RFValue(42)}px;
  margin-right: 16px;
`;

export const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

export const Title = styled.Text<TypeCard>`
  font-family: ${props => props.theme.fonts.regular};
  font-size: ${RFValue(14)}px;

  color: ${({ theme, type }) => 
    type === 'total' ? theme.colors.shape : theme.colors.text_dark
  };

`;

export const Icon = styled(Feather) <TypeCard>`
  font-size: ${RFValue(40)}px;

  ${props => props.type === 'up' && css`
    color: ${props => props.theme.colors.success};
  `};

  ${props => props.type === 'down' && css`
    color: ${props => props.theme.colors.attention};
  `};

  ${props => props.type === 'total' && css`
    color: ${props => props.theme.colors.shape};
  `};
`;

export const Footer = styled.View``;

export const Amount = styled.Text<TypeCard>`
  font-family: ${props => props.theme.fonts.medium};
  font-size: ${RFValue(32)}px;
  color: ${({ theme, type }) => 
    type === 'total' ? theme.colors.shape : theme.colors.text_dark
  };

  margin-top: 38px;
`;

export const LastTransaction = styled.Text<TypeCard>`
  font-family: ${props => props.theme.fonts.regular};
  font-size: ${RFValue(12)}px;

  color: ${({ theme, type }) => 
    type === 'total' ? theme.colors.shape : theme.colors.text
  };
`;
