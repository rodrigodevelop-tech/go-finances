import React from 'react';
import { Container, Footer, FooterWrapper, Header, SignInTitle, Title, TitleWrapper } from './styles';
import { RFValue } from 'react-native-responsive-fontsize';

import { SignInSocialButton } from '../../components/SignInSocialButton';

import AppleSvg from '../../assets/apple.svg';
import GoogleSvg from '../../assets/google.svg';
import LogoSvg from '../../assets/logo.svg';
import { useAuth } from '../../hooks/useAuth';
import { Alert, Keyboard } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

export function SignIn() {
  const { signInWithGoogle } = useAuth();

  async function handleSignInWithGoogle() {
    try {
      signInWithGoogle();
    } catch (error) {
      console.log(error);
      Alert.alert('Não foi possível conectar com a google!')
    }
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} style={{flex: 1}} containerStyle={{flex: 1}}>
      <Container>
        <Header>
          <TitleWrapper>
            <LogoSvg
              width={RFValue(120)}
              height={RFValue(68)}
            />

            <Title>
              Controle suas {'\n'}
              finanças de forma {'\n'}
              muito simples
            </Title>
          </TitleWrapper>

          <SignInTitle>
            Faça seu login com {'\n'}
            uma das opções abaixo
          </SignInTitle>
        </Header>
        <Footer>
          <FooterWrapper>
            <SignInSocialButton
              title="Entre com o google"
              svg={GoogleSvg}
              onPress={handleSignInWithGoogle}
            />
            <SignInSocialButton
              title="Entre com Apple"
              svg={AppleSvg}
            />
          </FooterWrapper>
        </Footer>
      </Container>
    </TouchableWithoutFeedback>
  )
}