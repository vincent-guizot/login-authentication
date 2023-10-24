import React from 'react'
import Navbar from '../components/Navbar';

const Home = (props) => {
    const {loginStatus, loginCbHandler} = props

    return (
        <>
            <Navbar loginStatus={loginStatus} loginCbHandler={loginCbHandler}></Navbar>
            <h1>Home Page</h1>

            <p>Login Status: </p>
            <p>{JSON.stringify(loginStatus)}</p>
        </>
    )
}

export default Home