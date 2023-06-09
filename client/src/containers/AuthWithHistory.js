import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Auth0Provider } from '@auth0/auth0-react';

import { authConfig } from '../config';
const Auth0ProviderWithHistory = ({ children }) => {
  const domain = authConfig.domain;
  console.log('🚀 ~ file: AuthWithHistory.js:8 ~ Auth0ProviderWithHistory ~ domain:', domain);
  const clientId = authConfig.clientId;
  console.log('🚀 ~ file: AuthWithHistory.js:10 ~ Auth0ProviderWithHistory ~ clientId:', clientId);

  const history = useNavigate();

  const onRedirectCallback = (appState) => {
    console.log('🚀 ~ file: AuthWithHistory.js:13 ~ onRedirectCallback ~ appState:', appState);
    history.push(appState?.returnTo || window.location.pathname);
  };

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      redirectUri={`${window.location.origin}/callback`}
      onRedirectCallback={onRedirectCallback}
    >
      {children}
    </Auth0Provider>
  );
};

export default Auth0ProviderWithHistory;
