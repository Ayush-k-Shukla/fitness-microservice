import { Box, Button, Typography } from '@mui/material';
import { useContext, useEffect } from 'react';
import { AuthContext, type IAuthContext } from 'react-oauth2-code-pkce';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { Activities } from './pages/Activities';
import { Activity } from './pages/Activity';
import { Login } from './pages/Login';
import { logout, setCredentials } from './redux/slice/auth.slice';
import type { RootState } from './redux/store';

function App() {
  const { token, tokenData, logIn, logOut } =
    useContext<IAuthContext>(AuthContext);

  const dispatch = useDispatch();

  const userInfo = useSelector((state: RootState) => state.auth.user);

  useEffect(() => {
    if (token) {
      dispatch(setCredentials({ token, tokenData }));
    }
  }, [token, tokenData, dispatch]);

  const performLogout = () => {
    logOut();
    dispatch(logout());
  };

  return (
    <>
      {token ? (
        <>
          <Box sx={{ p: 2, border: '1px dashed grey' }}>
            <Button
              variant='contained'
              color='secondary'
              onClick={() => performLogout()}
            >
              Logout
            </Button>

            <Typography>
              Hii {userInfo?.firstName} {userInfo?.lastName}
            </Typography>

            <BrowserRouter>
              <Routes>
                <Route path='/activities' element={<Activities />} />
                <Route path='/activities/:id' element={<Activity />} />
              </Routes>
            </BrowserRouter>
          </Box>
        </>
      ) : (
        <Login logIn={logIn} />
      )}
    </>
  );
}

export default App;
