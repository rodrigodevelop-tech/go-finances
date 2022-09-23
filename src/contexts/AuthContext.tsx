import React, { createContext, ReactNode, useEffect, useState } from 'react';
import * as AuthSession from 'expo-auth-session';
import * as AppleAuthentication from 'expo-apple-authentication';
import * as WebBrowser from 'expo-web-browser';
import AsyncStorage from '@react-native-async-storage/async-storage';

WebBrowser.maybeCompleteAuthSession();

const { GOOGLE_CLIENT_ID } = process.env;

interface AuthProviderProps {
  children: ReactNode
}

interface User {
  id: string;
  name: string;
  email: string;
  photo?: string;
}

interface AuthContextData {
  user: User;
  signInWithGoogle: () => Promise<void>;
  signInWithApple: () => Promise<void>;
  signOut: () => Promise<void>;
  isUserStorageLoading: boolean;
}

interface AuthorizationResponse {
  params: {
    access_token: string;
  },
  type: string;
}

const AuthContext = createContext({} as AuthContextData);


function AuthProvider({ children }: AuthProviderProps) {
  const [isUserStorageLoading, setIsUserStorageLoading] = useState(true);
  const [user, setUser] = useState<User>({} as User);

  const userStorageKey = '@gofinances:user_info';

  async function loadUserStorageDate() {
    const userStorage = await AsyncStorage.getItem(userStorageKey);

    if (userStorage) {
      const userLogged = JSON.parse(userStorage) as User;
      setUser(userLogged);
      setIsUserStorageLoading(false);
    }

  }

  useEffect(() => {
    loadUserStorageDate();
  }, []);

  async function signInWithGoogle() {
    try {
      const CLIENT_ID = GOOGLE_CLIENT_ID;
      const REDIRECT_URI = AuthSession.makeRedirectUri({ useProxy: true });
      const REDIRECT_TYPE = 'token';
      const SCOPE = encodeURI('profile email');

      const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?scope=${SCOPE}&include_granted_scopes=true&response_type=${REDIRECT_TYPE}&redirect_uri=${REDIRECT_URI}&client_id=${CLIENT_ID}`;

      const { type, params } = await AuthSession.startAsync({ authUrl: authUrl }) as AuthorizationResponse;
      
      if (type === 'success') {

        const response = await fetch(`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${params.access_token}`);

        const userInfo = await response.json();
        
        const userLogged = {
          id: userInfo.id,
          email: userInfo.email,
          name: userInfo.given_name,
          photo: userInfo.picture
        }

        if (userLogged) {
          setUser(userLogged);
  
          await AsyncStorage.setItem(userStorageKey, JSON.stringify(userLogged));
        } else {
          throw new Error('Nenhum dado obtido do login');
        }


      }

    } catch (error: any) {
      throw new Error(error);
    }
  }

  async function signInWithApple() {
    try {
      const credential = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
        ]
      });

      if (credential) {
        const name = credential.fullName?.givenName!;
        const photo = `https://ui-avatars.com/api/?background=random&color=fff&name=${name}&size=48`;
        const userLogged = {
          id: String(credential.user),
          email: credential.email!,
          name,
          photo
        };

        setUser(userLogged);

        await AsyncStorage.setItem(userStorageKey, JSON.stringify(userLogged));
      }

    } catch (err: any) {
      throw new Error(err);
    }
  }

  async function signOut() {
    setUser({} as User);
    await AsyncStorage.removeItem(userStorageKey);
  }

  return (
    <AuthContext.Provider value={{ user, signInWithGoogle, signInWithApple, signOut, isUserStorageLoading}}>
      {children}
    </AuthContext.Provider>
  )
}



export { AuthProvider, AuthContext };