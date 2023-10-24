import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';

import LoginPage from './pages/Login'
import HomePage from './pages/Home'

function App() {
  const [loginStatus, setLoginStatus] = useState(false)

  const loginCbHandler = (result) => {
    setLoginStatus(result)
  }
  useEffect(() => {
    if (localStorage.getItem('access_token')) {
      setLoginStatus(true)
    } else {
      setLoginStatus(false)
    }
  }, [loginStatus])

  return (
    <>
      <div className="container-fluid">
        {loginStatus ?
          <HomePage loginStatus={loginStatus} loginCbHandler={loginCbHandler}></HomePage> :
          <LoginPage loginCbHandler={loginCbHandler}></LoginPage>

        }
      </div>
    </>
  );
}

export default App;
