import React, { createContext, ReactNode, useState } from 'react';
import * as AuthSession from 'expo-auth-session';
import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';

WebBrowser.maybeCompleteAuthSession();

const { GOOGLE_CLIENT_ID } = process.env;
const { GOOGLE_REDIRECT_URI } = process.env;
const { GOOGLE_USER_INFO_END_POINT } = process.env;

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
  signInWithGoogle: () => void;
}

interface AuthorizationResponse {
  params: {
    access_token: string;
  },
  type: string;
}

const AuthContext = createContext({} as AuthContextData);


function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User>({} as User);

  async function signInWithGoogle() {
    try {
      const CLIENT_ID = GOOGLE_CLIENT_ID;
      const REDIRECT_URI = GOOGLE_REDIRECT_URI;
      const USER_INFO_END_POINT = GOOGLE_USER_INFO_END_POINT;
      const REDIRECT_TYPE = 'token';
      const SCOPE = encodeURI('profile email');

      const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?scope=${SCOPE}&include_granted_scopes=true&response_type=${REDIRECT_TYPE}&redirect_uri=${REDIRECT_URI}&client_id=${CLIENT_ID}`;

      const { type, params } = await AuthSession.startAsync({ authUrl: authUrl }) as AuthorizationResponse;

      if ( type === 'success') {
              const response = await fetch(`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${params.access_token}`);

              const userInfo = await response.json();

            setUser({
                id: userInfo.id,
                email: userInfo.email,
                name: userInfo.given_name,
                photo: userInfo.picture
            })

            console.log(userInfo);

            }
        // const response = await AuthSession.fetchUserInfoAsync({ accessToken: params.access_token }, { userInfoEndpoint: USER_INFO_END_POINT });

    } catch (error: any) {
      throw new Error(error);
    }
  }

  return (
    <AuthContext.Provider value={{ user, signInWithGoogle}}>
      {children}
    </AuthContext.Provider>
  )
}



export { AuthProvider, AuthContext };