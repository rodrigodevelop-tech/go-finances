import React, { useState } from 'react';
import { Container, Footer, FooterWrapper, Header, SignInTitle, Title, TitleWrapper } from './styles';
import { RFValue } from 'react-native-responsive-fontsize';

import { SignInSocialButton } from '../../components/SignInSocialButton';

import AppleSvg from '../../assets/apple.svg';
import GoogleSvg from '../../assets/google.svg';
import LogoSvg from '../../assets/logo.svg';
import { useAuth } from '../../hooks/useAuth';
import { ActivityIndicator, Alert, Keyboard, Platform } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { useTheme } from 'styled-components';

export function SignIn() {
  const [ isLoadingAuthenticate, setIsLoadingAuthenticate ] = useState(false);
  const { signInWithGoogle, signInWithApple } = useAuth();

  const theme = useTheme();

  async function handleSignInWithGoogle() {
    try {
      setIsLoadingAuthenticate(true);
      return await signInWithGoogle();
    } catch (error) {
      console.log(`Error: ${error}`);
      Alert.alert('Não foi possível conectar com a google!');
      setIsLoadingAuthenticate(false);
    }
  }
  async function handleSignInWithApple() {
    try {
      setIsLoadingAuthenticate(true);
      return await signInWithApple();
    } catch (error) {
      console.log(`Error: ${error}`);
      Alert.alert('Não foi possível conectar com a Apple!');
      setIsLoadingAuthenticate(false);
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
            {
              Platform.OS === 'ios' && (
                <SignInSocialButton
                  title="Entre com Apple"
                  svg={AppleSvg}
                  onPress={handleSignInWithApple}
                />
              )
            }
          </FooterWrapper>

          {isLoadingAuthenticate &&
            <ActivityIndicator
              color={theme.colors.shape}
            size="large"
            style={{
              marginTop: 18
            }}
            />}
        </Footer>
      </Container>
    </TouchableWithoutFeedback>
  )
}