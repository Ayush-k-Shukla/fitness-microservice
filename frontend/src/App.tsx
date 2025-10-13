import { useContext } from 'react';
import { AuthContext, type IAuthContext } from 'react-oauth2-code-pkce';
import './App.css';

function App() {
  const { token, tokenData, logIn, logOut } =
    useContext<IAuthContext>(AuthContext);

  return (
    <>
      {token ? (
        <>
          <h4>Access Token</h4>
          <pre>{token}</pre>
          <h4>User Information from JWT</h4>
          <pre>{JSON.stringify(tokenData, null, 2)}</pre>
          <button onClick={() => logOut()}>Logouts</button>
        </>
      ) : (
        <button onClick={() => logIn()}>Login</button>
      )}
    </>
  );
}

export default App;
