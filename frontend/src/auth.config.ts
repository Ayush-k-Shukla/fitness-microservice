import type {
  TAuthConfig,
  TRefreshTokenExpiredEvent,
} from 'react-oauth2-code-pkce';

export const authConfig: TAuthConfig = {
  clientId: 'pkce-oauth2-client',
  authorizationEndpoint:
    'http://localhost:8181/realms/fitness-oauth2-realm/protocol/openid-connect/auth',
  tokenEndpoint:
    'http://localhost:8181/realms/fitness-oauth2-realm/protocol/openid-connect/token',
  redirectUri: 'http://localhost:3000',
  scope: 'profile email offline_access openid',
  onRefreshTokenExpire: (event: TRefreshTokenExpiredEvent) =>
    event.logIn(undefined, undefined, 'popup'),
};
